import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { PURCHASE_REQUEST_API, GET_SITE_API, ITEM_API, UOM_API, VENDOR_DETAIL_API, GET_BRAND_API } from '@env/api_path';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';

import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Component({
  selector: 'app-purchase-request-details',
  templateUrl: './purchase-request-details.component.html',
  styleUrls: ['./purchase-request-details.component.scss']
})
export class PurchaseRequestDetailsComponent implements OnInit {


  id: any;
  siteList: any;
  load = false;
  items: FormArray;

  /**
  * Represents the purchase request form, including form controls for various fields.
  * @returns void
  */
  purchaseRequestForm = new FormGroup({
    title: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    expected_delivery_date: new FormControl('', Validators.required),
    purchase_request_number: new FormControl(''),
    site: new FormControl({value: '', disabled: true}, Validators.required),
    local_purchase: new FormControl({value: '', disabled: true}, Validators.required),
    remarks: new FormControl('', []),
    items: this.formBuilder.array([]),
    _id: new FormControl()
  });
  uomList: any;
  itemList: any;
  details: any = {};
  selectedVendor: any;
  brandList: any;


  constructor(
    private router: Router,
    private httpService: RequestService,
    private snack: SnackbarService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.getList();


  }

  /**
   * Fetches lists of UOM, items, sites, and brands from the API and assigns them to corresponding class properties.
   * Uses HTTP requests to retrieve data asynchronously.
   * @returns void
   */
  getList() {
    const UOM = this.http.get<any>(`${environment.api_path}${UOM_API}`);
    const item = this.http.get<any>(`${environment.api_path}${ITEM_API}`);
    const site = this.http.get<any>(`${environment.api_path}${GET_SITE_API}`);
    const brand = this.http.get<any>(`${environment.api_path}${GET_BRAND_API}`);
    this.httpService.multipleRequests([UOM, item, site,brand], {}).subscribe(res => {
      if (res) {
        this.uomList = res[0].data;
        this.itemList = res[1].data;
        this.siteList = res[2].data;
        this.brandList=res[3].data;
      }
    })
  }

  /**
  * Patches data received from an DB into the purchase request form.
  * Disables the 'remarks' form control after patching the data.
  * @param data The data object containing values to be patched into the form.
  * @returns void
  */
  patchData(data) {
    this.purchaseRequestForm.patchValue({
      title: data.title,
      date: data.date,
      expected_delivery_date: data.expected_delivery_date,
      purchase_request_number: data.purchase_request_number,
      site: data.site,
      local_purchase: data.local_purchase,
      remarks: data.remarks,
    });

    this.purchaseRequestForm.controls['remarks'].disable();
  }


  createItemArrayForm() {
    return new FormGroup({
      item_id: new FormControl('', Validators.required),
      qty: new FormControl('', Validators.required),
      category: new FormControl(''),
      subCategory: new FormControl(''),
      attachment: new FormControl(''),
      remark: new FormControl('', Validators.required),
      uom: new FormControl('', Validators.required),
      brandName:new FormControl(''),
    })

  }


  addItems(item: any): void {

    this.items = this.purchaseRequestForm.get('items') as FormArray;
    if (item) {
      this.items.push(this.createItem(item));
    }
  }

  createItem(item?: any): any {
    if (item) {
      return new FormGroup({
        item_id: new FormControl(item.item_id, Validators.required),
        qty: new FormControl(item.qty, Validators.required),
        category: new FormControl(item.categoryDetail.name),
        subCategory: new FormControl(item.subCategoryDetail.subcategory_name),
        attachment: new FormControl(item.attachment),
        remark: new FormControl(item.remark, Validators.required),
        uom: new FormControl(item.uomDetail._id, Validators.required),
        brandName:new FormControl(item.brandName),

      })
    }
  }

  /**
  * Retrieves the brand name corresponding to the provided brand ID from the brand list.
  * @param brandId The ID of the brand for which the name is to be retrieved.
  * @returns The brand name corresponding to the provided brand ID, if found; otherwise, undefined.
  */
  myBrandName(brandId:any){
    if(this.brandList){
      let brand=this.brandList.filter(brand=>brand._id==brandId)
      // console.log(brand)
      return brand[0].brand_name;
    }
  } 
  getSiteList() {
    this.httpService.GET(GET_SITE_API, {}).subscribe(res => {
      this.siteList = res;
    })
  }


  getItemName(id: any) {
    if(this.itemList && this.itemList.length>0){

      return this.itemList.filter(obj => obj._id == id)[0].item_name;
    }
  }

  updateRequest(status: any) {
    this.httpService.PUT(PURCHASE_REQUEST_API, { _id: this.details._id, status: status, remarks: this.purchaseRequestForm.value.remarks }).subscribe(res => {
      this.router.navigate(['/procurement/prlist'])
    })
  }
  getVendorName() {
    if(this.details.vendor)
    {
      const vendor = this.http.get<any>(`${environment.api_path}${VENDOR_DETAIL_API}?_id=${this.details.vendor}`);
      this.httpService.multipleRequests(vendor, {}).subscribe(res => {
        if (res) {
          console.log(res[0])
          this.selectedVendor=res[0].data[0].vendor_name
        }
  
      })
    }
    
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.httpService.GET(`${PURCHASE_REQUEST_API}/detail`, { _id: params['id'] }).subscribe({
          next: res => {
            this.details = res.data[0];
            console.log(this.details);
            this.getVendorName();
            this.patchData(res.data[0]);
          }, error: (error) => {
            this.router.navigate(['/procurement/prlist'])
          }
        })
      }
    });
  }
}
