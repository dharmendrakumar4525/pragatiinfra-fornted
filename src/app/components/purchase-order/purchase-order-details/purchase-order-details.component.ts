import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { GET_BRAND_API, PURCHASE_ORDER_API, ITEM_API,ESIGN_UPLOAD_API, DMRPURCHASE_ORDER_API } from '@env/api_path';
import { RequestService } from '@services/https/request.service';
import { saveAs } from 'file-saver';
import { isEmpty } from 'lodash';
import { forkJoin, of, switchMap } from 'rxjs';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import { MailPopupComponent } from '../mail-popup/mail-popup.component';

@Component({
  selector: 'app-purchase-order-details',
  templateUrl: './purchase-order-details.component.html',
  styleUrls: ['./purchase-order-details.component.scss']
})
export class PurchaseOrderDetailsComponent implements OnInit {
  term_condition = new FormControl();
  mail_section = new FormControl();
  validityDate = new FormControl();
  minDate = new Date();
  maxDate = new Date(new Date().setMonth(new Date().getMonth() + 12));
  poDetails: any;
  load: boolean = false;  // Page load flag
  downloadLoading = false;
  pageId: any;
  files:any[]=[];
  esignImage: any;
  brandList: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snack: SnackbarService,
    private httpService: RequestService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.pageId = params['id'];
      if (this.pageId) {
        // Fetch all necessary data in sequence
        this.fetchPurchaseOrderDetails(this.pageId);
      }
    });
  }

  fetchPurchaseOrderDetails(pageId: any) {
    this.httpService.GET(`${PURCHASE_ORDER_API}/detail`, { _id: pageId }).subscribe(res => {
      this.poDetails = res.data;
      this.esignImage = this.poDetails.sign;
      this.validityDate.patchValue(this.poDetails.due_date);
      this.term_condition.patchValue(this.poDetails.terms_condition);
      this.mail_section.patchValue(this.poDetails.vendor_message);
      this.mail_section.disable();
      this.term_condition.disable();
      this.validityDate.disable();

      // After fetching PO details, call getBrandList and getItemList
      this.loadData();
    });
  }

  async loadData() {
    try {
      // Call getItemList and getBrandList concurrently
      const [itemList, brandList] = await Promise.all([
        this.getItemList(),
        this.getBrandList()
      ]);

      // Update the poDetails items with the fetched item list
      this.updateItemsWithDetails(itemList);
      this.brandList = brandList;

      // After all data is loaded and processed, set load to true
      this.load = true;
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }

  getItemList() {
    return this.httpService.GET(ITEM_API, {}).toPromise().then(res => res.data);
  }

  getBrandList() {
    return this.httpService.GET(GET_BRAND_API, {}).toPromise().then(res => res.data);
  }

  updateItemsWithDetails(itemList) {
    console.log(itemList);
    const itemIds = this.poDetails.items.map(item => item.item.item_id);
    const itemDetailsMap = itemList.reduce((map, item) => {
      map[item._id] = item;
      return map;
    }, {});

    this.poDetails.items = this.poDetails.items.map(item => {
      const itemId = item.item.item_id;
      const details = itemDetailsMap[itemId] || {};

      return {
        ...item,
        item: {
          ...item.item,
          categoryDetail: details.categoryDetail || {},
          subCategoryDetail: details.subCategoryDetail || {},
          uomDetail: details.uomDetail || {},
          item_name: details.item_name || item.item.item_name,
          brandName: details.brandName || item.item.brandName,
          attachment: details.attachment || item.item.attachment
        }
      };
    });
    console.log("Updated Items", this.poDetails);
  }

  // Other methods remain the same...
  downloadPdf() {
    this.downloadLoading = true;
    this.httpService.GETPDF('generate/pdf', {
      template: "po",
      id: this.pageId,
    }).subscribe((res: any) => {
      this.downloadLoading = false;
      var blob = new Blob([res], { type: 'application/pdf' });
      let id = new Date().getTime();
      saveAs(blob, `po-${id}.pdf`);
    });
  }

  isBrandArray(brandName: any): string {
    // Check if brandName is an array
    if (Array.isArray(brandName)) {
      return this.getBrandNamesByIds(brandName);
    }
    // Otherwise, return the brandName as a string
    return brandName;
  }
  

  onFilesSelected(event: any): void {
    const fileList: FileList = event.target.files;
    console.log('file', fileList);
    
    if (fileList.length === 1) {
      const files = Array.from(fileList);

      this.files = files;

      console.log(this.files);
    }

  }

  removeFile(file: File): void {
    const updatedFiles = this.files.filter((f: File) => f.name !== file.name);
    console.log('there', updatedFiles);
    this.files = updatedFiles;
  }

 getUomName(item: any): string {
    // Check if the item and uomDetail exist
    if (item && item.uomDetail && item.uomDetail.uom_name) {
      return item.uomDetail.uom_name;
    }
    // Return a default value if uom_name is not present
    return 'Unknown UOM';
  }

  sendEmail(data) {
    this.downloadLoading = true;
    this.httpService.POST('/mail/template', {
      template: "po",
      id: this.pageId,
      mails: data
    }).subscribe(() => {
      this.downloadLoading = false;
    });
  }

  enterMail() {
    const esignPopup = this.dialog.open(MailPopupComponent, {
      maxWidth: '80vw',
      maxHeight: '80vh',
      autoFocus: false,
      data: this.poDetails
    });
    esignPopup.afterClosed().subscribe((result: any) => {
      if (result && result.option === 1) {
        this.sendEmail(result.data);
      }
    });
  }

  getBrandNamesByIds(brandIds): string {
    const brandMap = this.brandList.reduce((map, brand) => {
      map[brand._id] = brand.brand_name;
      return map;
    }, {} as Record<string, string>);

    return brandIds
      .map(id => brandMap[id])
      .filter(name => name)
      .join(' / ');
  }


  uploadFiles(){
console.log("No files Selected");
    if(this.files.length===0)
    {
      this.snack.notify("No File Selected, Choose File First",2)
      return;
    }

    const formData = this.convertToFormData(this.files);
    this.load = true;
    this.httpService.POST(ESIGN_UPLOAD_API, formData).subscribe({
      next: (res) => {
        console.log("check response", res);
        this.UpdateOrder(res.data.filename);
       
      },
      error: (err: any) => {
        this.load = false; // Stop loading on error
        this.handleError(err);
      },
    });
  }

  private handleError(err: any) {
    let errMessage = '<ul>';
    if (err.errors && !isEmpty(err.errors)) {
      for (let e in err.errors) {
        let objData = err.errors[e];
        errMessage += `<li>${objData[0]}</li>`;
      }
    } else {
      errMessage += `<li>${err.message}</li>`;
    }
    errMessage += '</ul>';
    this.snack.notifyHtml(errMessage, 2);
  }

  convertToFormData( files: File[]): FormData {
    const formData = new FormData();

    const appendFormData = (formData: FormData, key: string, value: any) => {
      if (Array.isArray(value)) {
        value.forEach((element, index) => {
          if (typeof element === 'object' && element !== null) {
            appendFormData(formData, `${key}[${index}]`, element);
          } else {
            formData.append(`${key}[${index}]`, element);
          }
        });
      } else if (typeof value === 'object' && value !== null) {
        Object.keys(value).forEach((subKey) => {
          appendFormData(formData, `${key}.${subKey}`, value[subKey]);
        });
      } else {
        formData.append(key, value);
      }
    };

    files.forEach((file, index) => {
      formData.append(`files[${index}]`, file, file.name);
    });

    return formData;
  }




  UpdateOrder(files): any {


   
    let requestData: any = this.poDetails;
    //console.log("--requestDAta--",requestData)
    

   
    console.log('-------------');
    console.log('this.poDetails.po_number', this.poDetails.po_number);
    console.log('-------------');

    requestData['po_number'] = this.poDetails.po_number;
    requestData['po_files']=files;
    requestData['approved_by']= this.poDetails.approved_by;
    requestData['status'] = 'approved';
    requestData['due_date'] = this.poDetails.due_date;
    requestData['vendor_message'] = this.poDetails.vendor_message;
    requestData.vendor_detail.terms_condition = this.term_condition.value;
    this.load = true;
    console.log("checking payload________________________",requestData);
    
    this.httpService
      .PUT(PURCHASE_ORDER_API, requestData)
      .subscribe({
        next: () => {
          // Both requests were successful
          this.load = false;
          //console.log(putResp, postResp);

          this.snack.notify('Vendor Acceptance Form Uploaded Successfully.', 1);
          this.router.navigate(['/purchase-order']);
        },
        error: (err: any) => {
          // Handle errors from either PUT or POST request
          this.load = false;
          if (err.errors && !isEmpty(err.errors)) {
            let errMessage = '<ul>';
            for (let e in err.errors) {
              let objData = err.errors[e];
              errMessage += `<li>${objData[0]}</li>`;
            }
            errMessage += '</ul>';
            this.snack.notifyHtml(errMessage, 2);
            this.router.navigate(['/purchase-order']);
            
          } else {
            this.snack.notify(err.message, 2);
            this.router.navigate(['/purchase-order']);
          }
        },
      });
  }


}
