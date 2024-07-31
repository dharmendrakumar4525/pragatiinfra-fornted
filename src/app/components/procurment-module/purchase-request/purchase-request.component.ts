import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { PURCHASE_REQUEST_API, CATEGORY_API, GET_SITE_API, ITEM_API, UOM_API,GET_VENDOR_API,GET_BRAND_API,GET_ROLE_API } from '@env/api_path';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import { isEmpty } from 'lodash';
import * as moment from 'moment';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import {Observable} from 'rxjs';
@Component({
  selector: 'app-purchase-request',
  templateUrl: './purchase-request.component.html',
  styleUrls: ['./purchase-request.component.scss']
})

export class PurchaseRequestComponent implements OnInit {

  viewPermission: any;
  editPermission: any;
  addPermission: any;
  // deletePermission: any;

  siteName: any;
  apiResponse: any;
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
  categoryList:any;
  siteList: any;
  vendorList:any;
  vendorSearch: string = '';
  filteredVendorList: any[] = [];
  load = false;
  items: FormArray | any = [];
  uomList: any;
  itemList: any;
  filteredItemList: any;
  filteredBrandList: any;
  option = 1;
  purchaseList: any[] = [];
  filter_by = "status";
  brandList:any;
  originalPurchaseList: any = [];
  permissions: any;
  filter_value = "pending";
  curr_site:any;
  requestNo: number = 0;
  
  // updateRequestNo(newNumber: number): void {
  //   this.requestNo = newNumber;
  // }
  details: any = {};
  constructor(
    private router: Router,
    private httpService: RequestService,
    private snack: SnackbarService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}
  // {this.getPRN({ filter_by: this.filter_by, filter_value: this.filter_value });}
  
  /**
 * Represents the purchase request form, including form controls for various fields.
 * Default values are set for date and expected delivery date fields using moment.js library.
 * @returns void
 */
  purchaseRequestForm = new FormGroup({
    title: new FormControl('', Validators.required),
    date: new FormControl(moment().format('DD-MM-YYYY'), Validators.required),
    expected_delivery_date: new FormControl(moment().add(1, 'days').format('DD-MM-YYYY'), Validators.required),
    purchase_request_number: new FormControl(null, Validators.required), // assuming null is the initial value

    
    site: new FormControl('', Validators.required),
    local_purchase: new FormControl('no', Validators.required),
    remarks: new FormControl(''),
    items: this.formBuilder.array([]),
    vendor: new FormControl(),
  });


  onSubmit() {
    if (this.load) {
      return;
    }

    if (!this.purchaseRequestForm.valid) {
      return;
    }

    let requestData: any = this.purchaseRequestForm.value;
    const selectedCategory = this.categoryList.find((obj: { _id: any; }) => obj._id == requestData.title);
    console.log(selectedCategory);
    requestData['title'] = selectedCategory.name;

    requestData['requestNo'] = this.requestNo;
    requestData['date'] = moment(requestData.date, 'DD-MM-YYYY').toDate()
    requestData['expected_delivery_date'] = new Date(requestData.expected_delivery_date)
    console.log(requestData);
   
    //for local purchase
    if (this.purchaseRequestForm.get('local_purchase').value === "yes") {
      let vendorItems = [];
      let obj = {
        Vendor: requestData.vendor || null,
        items: [],
      };
    
      if (requestData.items && this.itemList) {
        for (let item of requestData.items) {
          let tempobj = {
            item: this.itemList.find(o => o._id === item.item_id) || null,
            RequiredQuantity: item.qty,
            Rate: item.rate,
            SubTotalAmount: item.qty * item.rate,
            Total: 0,
          };
    
          if (tempobj.item) {
            delete tempobj.item.category;
            delete tempobj.item.created_at;
            delete tempobj.item.gst;
    
            if (tempobj.item.gstDetail) {
              let tax = {
                amount: tempobj.item.gstDetail.gst_percentage || 0,
                name: tempobj.item.gstDetail.gst_name || '',
              };
              tempobj.item.tax = tax;
              delete tempobj.item.gstDetail;
            }
    
            delete tempobj.item.item_number;
            delete tempobj.item.specification;
            delete tempobj.item.sub_category;
            delete tempobj.item.uom;
            delete tempobj.item.updated_at;
    
            tempobj.item.qty = tempobj.RequiredQuantity;
            tempobj.item.item_id = item.item_id;
            tempobj.item.remark = item.remark;
            tempobj.Total = (item.qty * item.rate) + ((item.qty * item.rate) * (tempobj.item.tax ? tempobj.item.tax.amount : 0)) / 100;
    
            obj.items.push(tempobj);
          }
        }
      }
    
      vendorItems.push(obj);
      requestData.vendorItems = vendorItems;
    }
    
    this.load = true;
    
    // Make a POST request to the PURCHASE_REQUEST_API with requestData
    this.httpService.POST(PURCHASE_REQUEST_API, requestData).subscribe({
      next: (resp: any) => {
        this.load = false;
        this.snack.notify("Purchase request has been created.", 1);
        this.purchaseRequestForm.reset();
        this.purchaseRequestForm.markAsUntouched();
        this.option = 2;
        this.getPurchaseList({ filter_by: this.filter_by, filter_value: this.statusOption.value });
      },
      error: (err) => {
        this.load = false;
        if (err.errors && Object.keys(err.errors).length > 0) {
          let errMessage = '<ul>';
          for (let e in err.errors) {
            let objData = err.errors[e];
            errMessage += `<li>${objData[0]}</li>`;
          }
          errMessage += '</ul>';
          this.snack.notifyHtml(errMessage, 2);
        } else {
          this.snack.notify(err.message || 'An error occurred', 2);
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
    const category=this.http.get<any>(`${environment.api_path}${CATEGORY_API}`);
    this.httpService.multipleRequests([UOM, item, site, vendor,brand,category], {}).subscribe(res => {
      if (res) {
        this.uomList = res[0].data;
        this.itemList = res[1].data;
       
        this.vendorList=res[3].data;
        this.brandList=res[4].data;
        this.categoryList=res[5].data;


        this.filteredItemList = this.itemList;
        this.filteredBrandList = this.brandList;
        
      }
    })
    
  }

  /**
   * Adds a new item to the list of items in the purchase request form.
   * If the purchase request is for a local purchase, creates a local item; otherwise, creates a regular item.
   * @returns void
   */
  addItem(): void {
    // Retrieve the 'items' FormArray from the purchase request form
    this.items = this.purchaseRequestForm.get('items') as FormArray;

    // Check if the purchase request is for a local purchase
    if(this.purchaseRequestForm.get('local_purchase').value==="yes")
      this.items.push(this.createLocalItem());
    else
      this.items.push(this.createItem());
  }

  /**Updates the category, subcategory, and unit of measurement (UOM) fields 
  of the selected item in the items array.
  */
  
  
 


  createItem(): FormGroup {
    return this.formBuilder.group({
      item_id: new FormControl('', Validators.required),
      qty: new FormControl('', Validators.required),
      category: new FormControl(null),
      subCategory: new FormControl(null),
      attachment: new FormControl(''),
      
      remark: new FormControl(''),
      uom: new FormControl(''),
      brandName:new FormControl('',Validators.required),
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
      brandName:new FormControl('',Validators.required),
      rate:new FormControl(''),
      gst:new FormControl(''),
      freight:new FormControl(''),
    });
  }

  // Clearing the 'items' FormArray to ensure it is empty.
  // Adding items based on the value of 'local_purchase' (yes or no).
  handleLocalPurchaseChange() {
    if (this.purchaseRequestForm.get('local_purchase').value === "yes") {
      this.purchaseRequestForm.get('local_purchase').setValue('no');
    } else {
      this.purchaseRequestForm.get('local_purchase').setValue('yes');
    }

    const itemsFormArray = this.purchaseRequestForm.get('items') as FormArray;
    itemsFormArray.clear();
    this.addItem();
  }
  onVendorSelection(event: any) {
    // Retrieve the selected vendor from the vendorList based on the _id
    const selectedVendor = this.vendorList.find(item => item._id === event.value);
    
  
    // Check if a vendor was found
    if (selectedVendor) {
      //Filter the itemList based on the category and subcategory of the selected vendor
      
      this.filteredItemList = this.itemList.filter(item => {
      
        const categoryMatch = selectedVendor.category.some(categoryItem => categoryItem === item.category);
        const subCategoryMatch = selectedVendor.SubCategory.some(subCategoryItem => subCategoryItem === item.sub_category);
      
        return categoryMatch && subCategoryMatch;
      });
      
    } else {
      // Handle the case where no vendor is found (optional)
      console.warn('No matching vendor found for the selected ID.');
      this.filteredItemList = [];
    }
  }

  


 
  
  
  
  /**
   * Removes an item from the list of items in the purchase request form at the specified index.
   * @param i The index of the item to be removed.
   * @returns void
   */
  delete(i) {
    const remove = this.purchaseRequestForm.get('items') as FormArray;;
    remove.removeAt(i);
  }

  onStatusChange(item) {
    this.getPurchaseList({ filter_by: this.filter_by, filter_value: item.value })
  }

  selectedTitle(event: any) {
    const title = this.categoryList.find((obj: { _id: any; }) => obj._id == event.value);
    
    const dynamicDataFormatted = title.name.replace(/[ ,]/g, '_');

   

    console.log("titleSelected", this.purchaseRequestForm);
  }

  selectedSite(event: any) {
    const siteName = this.siteList.find((obj: { _id: any; }) => obj._id == event.value);
    const dynamicDataFormatted = siteName.site_name.replace(/[ ,]/g, '_');
    console.log("title", this.purchaseRequestForm);
    const searchTerm = `${dynamicDataFormatted}/`;
    const purchase = this.http.get<any>(`${environment.api_path}${PURCHASE_REQUEST_API}`);

    this.httpService.multipleRequests([purchase], {}).subscribe(res => {
      if (res) {
        this.purchaseList = res[0].data; 
        const filteredList = this.purchaseList.filter(item => item.siteData.site_name.includes(siteName.site_name));
        this.requestNo = filteredList.length + 1;
        this.purchaseRequestForm.controls['purchase_request_number'].setValue(this.requestNo);
      }
    });
    
  }

  
  
  getPurchaseList(filterObj: any) {
    this.httpService.GET(PURCHASE_REQUEST_API, filterObj).subscribe({
      next: (resp: any) => {
        this.originalPurchaseList = resp.data;
        this.purchaseList = resp.data;
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

  displayItemFn(item: any): string {
  return item ? item.item_name : '';
}

displayBrandFn(brand: any): string {
  return brand ? brand.brand_name : '';
}



selectedItem(event: any, i: any) {
  let category = this.itemList.filter(obj => obj._id == event.option.value._id)[0]?.categoryDetail.name;
  let subCategory = this.itemList.filter(obj => obj._id == event.option.value._id)[0]?.subCategoryDetail.subcategory_name;
  let uom = this.itemList.filter(obj => obj._id == event.option.value._id)[0]?.uomDetail.uom_name;

  this.items.at(i).patchValue({
    category: category,
    subCategory: subCategory,
    uom: uom
  });
}
  searchItem(event: any) {
    const searchValue = event.target.value.toLowerCase();
    if (this.itemList && this.itemList.length > 0 ) {
      if (event.target.value) {
        this.filteredItemList = this.itemList.filter(obj => obj.item_name.toLowerCase().includes(searchValue));

      }else{
        this.filteredItemList = this.itemList;
      }
    }
  }



  searchBrand(event: any) {
    
    const searchValue = event.target.value.toLowerCase();
    if (this.brandList && this.brandList.length > 0 ) {
      if (event.target.value) {
        this.filteredBrandList = this.brandList.filter(obj => obj.brand_name.toLowerCase().includes(searchValue));

      }else{
        this.filteredBrandList = this.brandList;
      }
    }
  
  }




  


  filteredOptions: Observable<string[]>;
  ngOnInit(): void {


    // Retrieve user permissions from local storage and parse them as JSON
    this.permissions = JSON.parse(localStorage.getItem('loginData'))

    // Extract specific permissions related to ParentChildchecklist from the parsed data
    const rolePermission = this.permissions.user.role
    const GET_ROLE_API_PERMISSION = `/roles/role/${rolePermission}`;  
      this.httpService.GET(GET_ROLE_API_PERMISSION,{}).subscribe({
        next: (resp: any) => {
          this.viewPermission=resp.dashboard_permissions[0].ParentChildchecklist[18].childList[0].isSelected;
    this.addPermission=resp.dashboard_permissions[0].ParentChildchecklist[18].childList[1].isSelected;
    this.editPermission=resp.dashboard_permissions[0].ParentChildchecklist[18].childList[2].isSelected;
          
        },
        error: (err) => {
          console.log(err)
        }
      });


      this.siteList= this.permissions.user.sites
      console.log(this.siteList);

    this.getList();
    this.addItem();


  
    
  }
}
