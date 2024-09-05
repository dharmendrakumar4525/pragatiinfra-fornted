import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { PURCHASE_REQUEST_API, GET_SITE_API, ITEM_API, UOM_API, GET_VENDOR_API, GET_BRAND_API } from '@env/api_path';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import { isEmpty } from 'lodash';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-revise-purchase-request',
  templateUrl: './revise-purchase-request.component.html',
  styleUrls: ['./revise-purchase-request.component.scss']
})
export class RevisePurchaseRequestComponent implements OnInit {


  requredByMinDate = new Date();
  id: any;
  siteList: any;
  vendorList:any;
  load = false;
  items: FormArray;
  uomList: any;
  itemList: any;
  filteredItemList: any;
  initialVendor:any
  brandList: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpService: RequestService,
    private snack: SnackbarService,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    //this.getList();
  }

  brandSelections: FormArray = this.formBuilder.array([]);

  purchaseRequestForm = new FormGroup({
    title: new FormControl('', Validators.required),
    date: new FormControl(moment().format('DD-MM-YYYY'), Validators.required),
    expected_delivery_date: new FormControl(moment().add(1, 'days').format('DD-MM-YYYY'), Validators.required),
    purchase_request_number: new FormControl(''),
    site: new FormControl('', Validators.required),
    local_purchase: new FormControl('yes', Validators.required),
    remarks: new FormControl(''),
    items: this.formBuilder.array([]),
    _id: new FormControl(''),
    vendor: new FormControl(''),
  });

  handleLocalPurchaseChange(){
    const itemsFormArray = this.purchaseRequestForm.get('items') as FormArray;
    itemsFormArray.clear(); 
    this.addItem()
    
  }
  onVendorSelection(event: any) {
    console.log(event)
    if(event.value==null)
      return;
    // Retrieve the selected vendor from the vendorList based on the _id
    const selectedVendor = this.vendorList.find(item => item._id === event.value);
   // console.log('Selected Vendor Object:', selectedVendor);
  
    // Check if a vendor was found
    if (selectedVendor) {
      //Filter the itemList based on the category and subcategory of the selected vendor
      //console.log(this.itemList,"lIST")
      this.filteredItemList = this.itemList.filter(item => {
       // console.log(item.category + "----------" + item.sub_category);
      
        const categoryMatch = selectedVendor.category.some(categoryItem => categoryItem === item.category);
        const subCategoryMatch = selectedVendor.SubCategory.some(subCategoryItem => subCategoryItem === item.sub_category);
      
        return categoryMatch && subCategoryMatch;
      });
      //console.log(this.filteredItemList,"filterItemList");
        //this.addItems()
    } else {
      // Handle the case where no vendor is found (optional)
      console.warn('No matching vendor found for the selected ID.');
      this.filteredItemList = [];
    }
    
    if(event.value!==this.initialVendor.vendor){
      const itemsFormArray = this.purchaseRequestForm.get('items') as FormArray;
    itemsFormArray.clear();
      this.addItem()
    }
    
  }
  



  createItemArrayForm() {
    return new FormGroup({
      item_id: new FormControl('', Validators.required),
      rate :new FormControl('', Validators.required),
      qty: new FormControl('', Validators.required),
      category: new FormControl(null),
      subCategory: new FormControl(null),
      attachment: new FormControl([]),
      files: new FormControl([]),
      remark: new FormControl(null),
      uom: new FormControl(null),
      itemName: new FormControl(null),
      brandSelections:new FormControl(null),

    })

  }

  onSubmit() {
    if (this.load) {
      return
    }
    console.log(this.purchaseRequestForm)
    console.log(this.purchaseRequestForm.valid)

if (!this.purchaseRequestForm.valid) {
  console.log("Form is invalid", this.purchaseRequestForm);

  // Iterate over form controls to identify validation errors
  Object.keys(this.purchaseRequestForm.controls).forEach(key => {
    const control = this.purchaseRequestForm.get(key);
    if (control && control.invalid) {
      console.log(`Validation error in ${key}:`, control.errors);

    }
  });

  return;
}

    let requestData: any = this.purchaseRequestForm.value;
    requestData['date'] = moment(requestData.date, 'DD-MM-YYYY').toDate()
    requestData['expected_delivery_date'] = new Date(requestData.expected_delivery_date);
    requestData['status'] = 'revised';
    this.load = true;

console.log("there", requestData);
const formData = new FormData();
if(requestData.local_purchase==="no")
{
  formData.append('_id', requestData._id);
  formData.append('title', requestData.title);
  formData.append('handle_by', "");
  formData.append('date', requestData.date);
  formData.append('expected_delivery_date', requestData.expected_delivery_date);
  formData.append('purchase_request_number', requestData.purchase_request_number);
  formData.append('site', requestData.site);
  formData.append('local_purchase', requestData.local_purchase);
  formData.append('status', requestData.status);
  
    
    // Append items and their files
    requestData.items.forEach((item, index) => {
      formData.append(`items[${index}][item_id]`, item.item_id);
      formData.append(`items[${index}][qty]`, item.qty);
      formData.append(`items[${index}][category]`, item.category);
      formData.append(`items[${index}][subCategory]`, item.subCategory);
      
      formData.append(`items[${index}][uom]`, item.uom);
      

      item.brandSelections.forEach((brand) => {
        formData.append(`items[${index}][brandName]`, brand);
      });
  
      // Append each file in the 'files' array
      item.files.forEach((file, fileIndex) => {
        formData.append(`items[${index}][attachment][${fileIndex}]`, file, file.name);
      });
    });
  
}

else
{
  formData.append('title', requestData.title);
formData.append('date', requestData.date);
formData.append('expected_delivery_date', requestData.expected_delivery_date);
formData.append('purchase_request_number', requestData.purchase_request_number);
formData.append('site', requestData.site);
formData.append('local_purchase', requestData.local_purchase);
formData.append('_id', requestData._id);
formData.append('vendor', requestData.vendor);
formData.append('status', requestData.status);

// Append items and their attachments
requestData.items.forEach((item, index) => {
    formData.append(`items[${index}][item_id]`, item.item_id);
    formData.append(`items[${index}][qty]`, item.qty.toString());
    formData.append(`items[${index}][rate]`, item.rate.toString());
    formData.append(`items[${index}][category]`, item.category);
    formData.append(`items[${index}][subCategory]`, item.subCategory);
    formData.append(`items[${index}][remark]`, item.remark);
    formData.append(`items[${index}][uom]`, item.uom);
    
    item.brandSelections.forEach((brand) => {
      formData.append(`items[${index}][brandName]`, brand);
    });

    // Append files
     // Append each file in the 'files' array
     item.files.forEach((file, fileIndex) => {
      formData.append(`items[${index}][attachment][${fileIndex}]`, file, file.name);
    });
});
}


console.log(formData);

  this.httpService.PUT(PURCHASE_REQUEST_API, formData).subscribe({
      next: (resp: any) => {
        this.load = false;
        this.snack.notify("Record has been updated.", 1);
        this.router.navigate(['/procurement/prlist'])

      }, error: (err) => {
        this.load = false;
        if (err.errors && !isEmpty(err.errors)) {
          let errMessage = '<ul>';
          for (let e in err.errors) {
            let objData = err.errors[e];
            errMessage += `<li>${objData[0]}</li>`;
          }
          errMessage += '</ul>';
          this.snack.notifyHtml(errMessage, 2);
        } else {
          this.snack.notify(err.message, 2);
        }
      }
    });
  }


  async getList() {
    const UOM = this.http.get<any>(`${environment.api_path}${UOM_API}`);
    const item = this.http.get<any>(`${environment.api_path}${ITEM_API}`);
    const site = this.http.get<any>(`${environment.api_path}${GET_SITE_API}`);
    const vendor = this.http.get<any>(`${environment.api_path}${GET_VENDOR_API}`);
    const brand = this.http.get<any>(`${environment.api_path}${GET_BRAND_API}`);
    
    try {
      const res = await this.httpService.multipleRequests([UOM, item, site, vendor,brand], {}).toPromise();

      if (res) {
        this.uomList = res[0].data;
        this.itemList = res[1].data;
        this.siteList = res[2].data;
        this.vendorList = res[3].data;
        this.brandList=res[4].data
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error as needed
    }
  }


  toggleBrandSelection(brandId: string, index: number): void {
    const brandSelections = (this.purchaseRequestForm.get('items') as FormArray).at(index).get('brandSelections') as FormArray;
    const existingIndex = brandSelections.value.findIndex(id => id === brandId);

    if (existingIndex !== -1) {
      brandSelections.removeAt(existingIndex);
    } else {
      brandSelections.push(new FormControl(brandId));
    }
  }

  isBrandSelected(brandId: string, index: number): boolean {
    const brandSelections = (this.purchaseRequestForm.get('items') as FormArray).at(index).get('brandSelections') as FormArray;
    return brandSelections.value.includes(brandId);
  }


  selectedItem(event: any, i: any) {
    let category = this.itemList.filter(obj => obj._id == event.value)[0]?.categoryDetail.name;
    let subCategory = this.itemList.filter(obj => obj._id == event.value)[0]?.subCategoryDetail.subcategory_name;
    let uom = this.itemList.filter(obj => obj._id == event.value)[0]?.uomDetail.uom_name;

    this.items.at(i).patchValue({
      category: category,
      subCategory: subCategory,
      uom: uom
    });
  }

  


  createItem(item?: any): any {
    if (item) {
      console.log("item Here", item.attachment);
      
      let brandSelections: string[];
      
      if (Array.isArray(item.brandName)) {
        brandSelections = item.brandName;
      } else if (typeof item.brandName === 'string') {
        brandSelections = [item.brandName];
      } else {
        brandSelections = [];
      }


      return new FormGroup({
        item_id: new FormControl(item.item_id, Validators.required),
        qty: new FormControl(item.qty, Validators.required),
        rate:new FormControl(item.rate),
        category: new FormControl(item.categoryDetail.name),
        subCategory: new FormControl(item.subCategoryDetail.subcategory_name),
        attachment: new FormControl(item.attachment),
        files: new FormControl([]),
        remark: new FormControl(item.remark),
        uom: new FormControl(item.uomDetail.uom_name),
        brandSelections: new FormControl(brandSelections|| []),
      })

    }
    else {
      return new FormGroup({
        item_id: new FormControl('', Validators.required),
        qty: new FormControl('', Validators.required),
        rate:new FormControl(''),
        category: new FormControl(''),
        subCategory: new FormControl(''),
        attachment: new FormControl([]),
        files: new FormControl([]),
        remark: new FormControl(''),
        uom: new FormControl(''),
        brandSelections: new FormControl( []),

      })
    }
  }


  delete(i) {
    const remove = this.purchaseRequestForm.get('items') as FormArray;;
    remove.removeAt(i);
  }

  patchData(data) {
    this.purchaseRequestForm.patchValue({
      title: data.title,
      date: data.date,
      expected_delivery_date: data.expected_delivery_date,
      purchase_request_number: data.purchase_request_number,
      site: data.site,
      local_purchase: data.local_purchase,
      remarks: data.remarks,
      _id: data._id,
      vendor:data.vendor
    });

    if (data.items && data.items.length > 0) {
      data.items.map((item: any) => {
        this.addItems(item);
      })
    }
console.log(this.purchaseRequestForm);
    this.purchaseRequestForm.controls.remarks.disable();

  }

  addItem(): void {
    this.items = this.purchaseRequestForm.get('items') as FormArray;
    this.items.push(this.createItem());
  }

  addItems(item: any): void {
    //console.log("object",item)
    this.items = this.purchaseRequestForm.get('items') as FormArray;
    if (item) {
      this.items.push(this.createItem(item));
    }
  }

  onFilesSelected(event: any, index: number): void {
    const fileList: FileList = event.target.files;
     console.log("file", fileList);
      if (fileList.length > 5)
      {
        this.snack.notify('Can upload Maximum 5 Files', 2);
        return;
      }

    if (fileList.length > 0) {
      const files = Array.from(fileList);
      
      this.items.at(index).patchValue({
        files :files,
      });
     

      console.log(this.items);
    }
  }

  removeFile(index: number, file: File): void {
    // Get the FormArray of files for the specified item
    const filesArray = this.items.at(index).get('files') as FormArray;
  console.log("here", filesArray);
    // Filter out the file with the matching name
    const updatedFiles = filesArray.value.filter((f: File) => f.name !== file.name);
    console.log("there", updatedFiles);
    // Clear the current files array
   /* while (filesArray.length !== 0) {
      filesArray.value.removeAt(0);
    }
  
    // Add the updated files back to the FormArray
    updatedFiles.forEach((f: File) => filesArray.push(new FormControl(f)));
  
    console.log(updatedFiles); */
    this.items.at(index).patchValue({
      files :updatedFiles,
    });

    console.log(this.items);

  }
  
  files(index: number): File[] {
    return (this.items.at(index).get('files') as FormArray).controls.map(c => c.value);
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.httpService.GET(`${PURCHASE_REQUEST_API}/detail`, { _id: params['id'] }).subscribe(async res => {
          //console.log(res.data[0],"data")
          await this.getList()
          this.initialVendor=(res.data[0])
          this.onVendorSelection({value:this.initialVendor.vendor})
          this.patchData(res.data[0]);
        })
      }
    });
  }

}
