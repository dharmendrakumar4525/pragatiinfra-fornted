import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { PURCHASE_REQUEST_API, GET_SITE_API, ITEM_API, UOM_API,GET_VENDOR_API,GET_BRAND_API } from '@env/api_path';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import { isEmpty } from 'lodash';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-purchase-request',
  templateUrl: './purchase-request.component.html',
  styleUrls: ['./purchase-request.component.scss']
})
export class PurchaseRequestComponent implements OnInit {
  statusOption = new FormControl('pending');
  statusList = [
    {
      value: 'pending',
      label: 'Pending'
    },
    {
      value: 'approved',
      label: 'Approved'
    },
    {
      value: 'rejected',
      label: 'Rejected'
    },
    {
      value: 'revise',
      label: 'Revise'
    },
  ]
  requredByMinDate = new Date();
  id: any;
  siteList: any;
  vendorList:any;
  vendorSearch: string = '';
  filteredVendorList: any[] = [];
  load = false;
  items: FormArray | any = [];
  uomList: any;
  itemList: any;
  filteredItemList: any;
  option = 1;
  purchaseList: any = [];
  filter_by = "status";
  brandList:any;
  originalPurchaseList: any = [];
  permissions: any;
  constructor(
    private router: Router,
    private httpService: RequestService,
    private snack: SnackbarService,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) { }

  purchaseRequestForm = new FormGroup({
    title: new FormControl('', Validators.required),
    date: new FormControl(moment().format('DD-MM-YYYY'), Validators.required),
    expected_delivery_date: new FormControl(moment().add(1, 'days').format('DD-MM-YYYY'), Validators.required),
    purchase_request_number: new FormControl(''),
    site: new FormControl('', Validators.required),
    local_purchase: new FormControl('yes', Validators.required),
    remarks: new FormControl(''),
    items: this.formBuilder.array([]),
    vendor: new FormControl(),
  });


  onSubmit() {
    if (this.load) {
      return
    }

    if (!this.purchaseRequestForm.valid) {
      return;
    }

    let requestData: any = this.purchaseRequestForm.value;
    requestData['date'] = moment(requestData.date, 'DD-MM-YYYY').toDate()
    requestData['expected_delivery_date'] = new Date(requestData.expected_delivery_date)
   
    if(this.purchaseRequestForm.get('local_purchase').value=="yes")
    {
      let vendorItems=[];
      let obj={
          Vendor:requestData.vendor,
          items:[],
      }
      for(let item of requestData.items)
      {
          let tempobj={
              item: this.itemList.filter(o=> o._id==item.item_id),
              RequiredQuantity:item.qty,
              Rate:item.rate,
              SubTotalAmount:item.qty*item.rate,
              Total:0,
          }
          tempobj.item=tempobj.item[0];
          delete tempobj.item.category;
          delete tempobj.item.created_at;
          delete tempobj.item.gst;
          let tax={
            amount:tempobj.item.gstDetail.gst_percentage,
            name:tempobj.item.gstDetail.gst_name,
          }
          tempobj.item.tax=tax;
          delete tempobj.item.gstDetail;
          delete tempobj.item.item_number;
          delete tempobj.item.specification;
          delete tempobj.item.sub_category;
          delete tempobj.item.uom;
          delete tempobj.item.updated_at;
          tempobj.item.qty=tempobj.RequiredQuantity;
          tempobj.item.item_id=item.item_id;
          tempobj.item.remark=item.remark
          // console.log(tempobj.item)
          // console.log(tempobj.item.gstDetail)
          tempobj.Total=(item.qty*item.rate)+((item.qty*item.rate)*tempobj.item.tax.amount)/100;
          obj.items.push(tempobj);
      }
      vendorItems.push(obj);
      requestData.vendorItems=vendorItems;
    }
    console.log(requestData)
    this.load = true;
    this.httpService.POST(PURCHASE_REQUEST_API, requestData).subscribe({
      next: (resp: any) => {
        this.load = false;
        this.snack.notify("Purchase requrest has been created.", 1);
        this.purchaseRequestForm.reset();
        this.purchaseRequestForm.markAsUntouched();
        this.option = 2;
        this.getPurchaseList({ filter_by: this.filter_by, filter_value: this.statusOption.value })

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


  getList() {
    const UOM = this.http.get<any>(`${environment.api_path}${UOM_API}`);
    const item = this.http.get<any>(`${environment.api_path}${ITEM_API}`);
    const site = this.http.get<any>(`${environment.api_path}${GET_SITE_API}`);
    const vendor = this.http.get<any>(`${environment.api_path}${GET_VENDOR_API}`);
    const brand = this.http.get<any>(`${environment.api_path}${GET_BRAND_API}`);
    this.httpService.multipleRequests([UOM, item, site, vendor,brand], {}).subscribe(res => {
      if (res) {
        this.uomList = res[0].data;
        this.itemList = res[1].data;
        this.siteList = res[2].data;
        this.vendorList=res[3].data;
        this.brandList=res[4].data;
        console.log(this.vendorList);
        console.log(this.itemList);
        console.log("brand",this.brandList)
      }

    })
    
  }

  addItem(): void {
    this.items = this.purchaseRequestForm.get('items') as FormArray;
    if(this.purchaseRequestForm.get('local_purchase').value==="yes")
    {
      //console.log("hi from local yes")
      this.items.push(this.createLocalItem());
    }  
    else
    {
      //console.log("hi from local no")
      this.items.push(this.createItem());
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

  createItem(): FormGroup {
    return this.formBuilder.group({
      item_id: new FormControl('', Validators.required),
      qty: new FormControl('', Validators.required),
      category: new FormControl(null),
      subCategory: new FormControl(null),
      attachment: new FormControl(''),
      remark: new FormControl(''),
      uom: new FormControl(''),
      brandName:new FormControl(''),
    });
  }
  createLocalItem(): FormGroup {
    return this.formBuilder.group({
      item_id: new FormControl('', Validators.required),
      qty: new FormControl('', Validators.required),
      category: new FormControl(null),
      subCategory: new FormControl(null),
      attachment: new FormControl(''),
      remark: new FormControl(''),
      uom: new FormControl(''),
      brandName:new FormControl(''),
      rate:new FormControl(''),
      gst:new FormControl(''),
      freight:new FormControl(''),
    });
  }

  // Clearing the 'items' FormArray to ensure it is empty.
  // Adding items based on the value of 'local_purchase' (yes or no).
  handleLocalPurchaseChange(){
    const itemsFormArray = this.purchaseRequestForm.get('items') as FormArray;
    itemsFormArray.clear(); 
    this.addItem();
  }
  onVendorSelection(event: any) {
    // Retrieve the selected vendor from the vendorList based on the _id
    const selectedVendor = this.vendorList.find(item => item._id === event.value);
    console.log('Selected Vendor Object:', selectedVendor);
  
    // Check if a vendor was found
    if (selectedVendor) {
      //Filter the itemList based on the category and subcategory of the selected vendor
      console.log(this.itemList)
      this.filteredItemList = this.itemList.filter(item => {
        console.log(item.category + "----------" + item.sub_category);
      
        const categoryMatch = selectedVendor.category.some(categoryItem => categoryItem === item.category);
        const subCategoryMatch = selectedVendor.SubCategory.some(subCategoryItem => subCategoryItem === item.sub_category);
      
        return categoryMatch && subCategoryMatch;
      });
      console.log(this.filteredItemList);
    } else {
      // Handle the case where no vendor is found (optional)
      console.warn('No matching vendor found for the selected ID.');
      this.filteredItemList = [];
    }
  }
  
  
  

  delete(i) {
    const remove = this.purchaseRequestForm.get('items') as FormArray;;
    remove.removeAt(i);
  }

  onStatusChange(item) {
    this.getPurchaseList({ filter_by: this.filter_by, filter_value: item.value })

  }

  getPurchaseList(filterObj: any) {
    this.httpService.GET(PURCHASE_REQUEST_API, filterObj).subscribe({
      next: (resp: any) => {
        this.originalPurchaseList = resp.data;
        this.purchaseList = resp.data;
      }, error: (err) => {
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

  dateFilter(event: MatDatepickerInputEvent<Date>) {
    if (this.originalPurchaseList && this.originalPurchaseList.length > 0) {
      if (event.value) {
        this.purchaseList = this.originalPurchaseList.filter(obj => new Date(obj.date) == new Date(event.value))
      }
      else {
        this.purchaseList = this.originalPurchaseList;
      }
    }
  }

  search(event: any, type?: any) {
    if (this.originalPurchaseList && this.originalPurchaseList.length > 0) {
      if (type == 'site') {
        if (event.target.value) {
          this.purchaseList = this.originalPurchaseList.filter(obj => obj.siteData.site_name.toLowerCase().includes(event.target.value.toLowerCase()))
        }
        else {
          this.purchaseList = this.originalPurchaseList;
        }
      }
      else {
        if (event.target.value) {
          this.purchaseList = this.originalPurchaseList.filter(obj => obj.title.toLowerCase().includes(event.target.value.toLowerCase()))
        }
        else {
          this.purchaseList = this.originalPurchaseList;
        }
      }
    }

  }



  ngOnInit(): void {
    this.permissions = JSON.parse(localStorage.getItem('loginData'))
    this.permissions=this.permissions.permissions[0].ParentChildchecklist[9];
    this.getList();
    this.addItem();
  }
}
