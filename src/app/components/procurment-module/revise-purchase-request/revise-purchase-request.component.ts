import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { PURCHASE_REQUEST_API, GET_SITE_API, ITEM_API, UOM_API, GET_VENDOR_API } from '@env/api_path';
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
    vendor: new FormControl(),
  });

  handleLocalPurchaseChange(){
    const itemsFormArray = this.purchaseRequestForm.get('items') as FormArray;
    itemsFormArray.clear(); 
    this.addItem()
    
  }
  onVendorSelection(event: any) {
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
      attachment: new FormControl(null),
      remark: new FormControl(null),
      uom: new FormControl(null),
      itemName: new FormControl(null),

    })

  }

  onSubmit() {
    if (this.load) {
      return
    }

    if (!this.purchaseRequestForm.valid) {
      return;
    }

    let requestData: any = this.purchaseRequestForm.value;
    requestData['date'] = moment(requestData.date, 'DD-MM-YYYY').toDate()
    requestData['expected_delivery_date'] = new Date(requestData.expected_delivery_date);
    requestData['status'] = 'revised';
    this.load = true;
    this.httpService.PUT(PURCHASE_REQUEST_API, requestData).subscribe({
      next: (resp: any) => {
        this.load = false;
        this.snack.notify("Record has been updated.", 1);
        this.router.navigate(['/procurement'])

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
    
    try {
      const res = await this.httpService.multipleRequests([UOM, item, site, vendor], {}).toPromise();

      if (res) {
        this.uomList = res[0].data;
        this.itemList = res[1].data;
        this.siteList = res[2].data;
        this.vendorList = res[3].data;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error as needed
    }
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
      const foundItem = this.itemList.find(items => item.item_id == items._id);
      const additionalKeyValue = foundItem ? foundItem.item_name : 'defaultValue';
      return new FormGroup({
        item_id: new FormControl(item.item_id, Validators.required),
        qty: new FormControl(item.qty, Validators.required),
        rate:new FormControl(item.rate, Validators.required),
        category: new FormControl(item.categoryDetail.name),
        subCategory: new FormControl(item.subCategoryDetail.subcategory_name),
        attachment: new FormControl(item.attachment),
        remark: new FormControl(item.remark),
        uom: new FormControl(item.uomDetail.uom_name),
        itemName: new FormControl(additionalKeyValue),
      })
    }
    else {
      return new FormGroup({
        item_id: new FormControl('', Validators.required),
        qty: new FormControl('', Validators.required),
        rate:new FormControl('', Validators.required),
        category: new FormControl(''),
        subCategory: new FormControl(''),
        attachment: new FormControl(),
        remark: new FormControl(''),
        uom: new FormControl(''),
        itemName: new FormControl('')

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
