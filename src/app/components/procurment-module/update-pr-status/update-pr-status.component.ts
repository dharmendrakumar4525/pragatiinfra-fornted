import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { PURCHASE_REQUEST_API, GET_SITE_API, ITEM_API, UOM_API, GET_VENDOR_API, VENDOR_DETAIL_API, GET_BRAND_API } from '@env/api_path';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Component({
  selector: 'app-update-pr-status',
  templateUrl: './update-pr-status.component.html',
  styleUrls: ['./update-pr-status.component.scss']
})
export class UpdatePrStatusComponent implements OnInit {


  id: any;
  siteList: any;
  load = false;
  items: FormArray;
  purchaseRequestForm = new FormGroup({
    title: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    expected_delivery_date: new FormControl('', Validators.required),
    purchase_request_number: new FormControl(''),
    site: new FormControl({value: '', disabled: true}, Validators.required),
    local_purchase: new FormControl({value: '', disabled: true}, Validators.required),
    remarks: new FormControl(''),
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
      brandName:new FormControl('', Validators.required),
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
        brandName:new FormControl(item.brandName, Validators.required),

      })
    }
  }

  myBrandName(brandId:any){
    console.log(brandId)
    if(this.brandList==null)
      return;
    let brand=this.brandList.filter(brand=>brand._id==brandId)
    console.log(brand)
    return brand[0].brand_name;
  } 
  getSiteList() {
    this.httpService.GET(GET_SITE_API, {}).subscribe(res => {
      this.siteList = res;
    })
  }

  getItemName(id: any) {
    if (this.itemList && id) return this.itemList.filter(obj => obj._id == id)[0].item_name;
  }

  updateRequest(status: any) {
    this.httpService.PUT(PURCHASE_REQUEST_API, { _id: this.details._id, status: status, remarks: this.purchaseRequestForm.value.remarks }).subscribe(res => {
      this.router.navigate(['/procurement/prlist'])
    })
  }
  // isVendorSelected(items: any): any[] {
  //   console.log(items,"Items")
  //   let tempVendorList=this.vendorsList.filter(vendor=>vendor.category.includes(items.categoryDetail._id) && vendor.SubCategory.includes(items.subCategoryDetail._id))
  //   console.log(tempVendorList,"LLL")
  //   return tempVendorList;
  // }
  getVendorList() {
    if(this.details.vendor!=null)
    {
      const vendor = this.http.get<any>(`${environment.api_path}${VENDOR_DETAIL_API}?_id=${this.details.vendor}`);
      this.httpService.multipleRequests(vendor, {}).subscribe(res => {
        if (res) {
          //console.log(res[0],"res")
          //this.vendorsList=res[0].data;
          this.selectedVendor=res[0].data[0].vendor_name
         //this.isVendorSelected(this.details.items[1]);
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
            console.log(this.details,"JKL")
            this.getVendorList();
            this.patchData(res.data[0]);
          }, error: (error) => {
            this.router.navigate(['/procurement/prlist'])
          }
        })
      }
    });
    }
}
