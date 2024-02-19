import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { RATE_COMPARATIVE_DETAIL_API, GET_SITE_API, ITEM_API, UOM_API, RATE_COMPARATIVE_API,PURCHASE_ORDER_API, GET_BRAND_API } from '@env/api_path';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';

import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { isEmpty } from 'lodash';
import { VendorRateListingComponent } from '../vendor-rate-listing/vendor-rate-listing.component';
import { UsersService } from '@services/users.service';

@Component({
  selector: 'app-rate-approval-update',
  templateUrl: './rate-approval-update.component.html',
  styleUrls: ['./rate-approval-update.component.scss']
})
export class RateApprovalUpdateComponent implements OnInit {



  id: any;
  siteList: any;
  load = false;
  items: FormArray;
  fetchedVendorList:any;
  VendorRate = new Map<string, any>();
  ItemwiseVendorRate=new Map<string,any>();
  compareBy:any="item"
  purchaseList: any;
  po_no: any;
  curr_site:any;

  /**
  * Defines the form structure for purchase request data.
  */
  purchaseRequestForm = new FormGroup({
    title: new FormControl({value: '', disabled: true}, Validators.required),
    date: new FormControl({value: '', disabled: true}, Validators.required),
    expected_delivery_date: new FormControl({value: '', disabled: true}, Validators.required),
    handle_by: new FormControl({value: '', disabled: true}, Validators.required),
    rate_approval_number: new FormControl(''),
    site: new FormControl({value: '', disabled: true}, Validators.required),
    local_purchase: new FormControl({value: '', disabled: true}, Validators.required),
    remarks: new FormControl({value: '', disabled: true}, []),
    items: this.formBuilder.array([]),
    _id: new FormControl()
  });

  details: any = {};
  users: any = [];
  brandList: any;

  constructor(
    private router: Router,
    private httpService: RequestService,
    private snack: SnackbarService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private http: HttpClient,
    private userService: UsersService,
  ) {
    this.getList();
    this.getBrandList();
    this.getVendorList();
    this.userService.getUserss().subscribe(data => {
      // Store the retrieved user data in the 'users' property
      this.users = data;
    })
  }

  /**
  * Opens a dialog to display vendor rate listings for a specific item.
  * @param dataObj The object containing data related to the item.
  * @returns void
  */
  vendorData(dataObj: any) {
    console.log(dataObj)

    // Open a dialog to display vendor rate listings
    const dialogPopup = this.dialog.open(VendorRateListingComponent, {
      data: {
        item: dataObj,
        vendorItems: this.details.vendorItems,
        fetchedVendorList:this.fetchedVendorList,
        pageData:this.ItemwiseVendorRate.get(dataObj.item_id)
      }
    });
    // Subscribe to dialog closing event
    dialogPopup.afterClosed().subscribe((result: any) => {
      console.log('result', result)
      if(result && result.data && result.data.VendorRate ){
        if(result.data.VendorRate.size>0)
          this.ItemwiseVendorRate.set(dataObj.item_id,result.data)
        else
          this.ItemwiseVendorRate.delete(dataObj.item_id)
      }
      
    });
  }


  /**
  * Fetches site and purchase order data.
  * Updates the siteList and purchaseList properties with the fetched data.
  */
  getList() {
    const site = this.http.get<any>(`${environment.api_path}${GET_SITE_API}`);
    const purchase = this.http.get<any>(`${environment.api_path}${PURCHASE_ORDER_API}`);
    this.httpService.multipleRequests([site,purchase], {}).subscribe(res => {
      if (res) {
        this.siteList = res[0].data;
        this.purchaseList=res[1].data
        // console.log(this.purchaseList+"from getsitelist")
      }
    })
  }

  /**
  * Clears VendorRate and ItemwiseVendorRate maps and sets the comparison type.
  * @param type The type of comparison ('vendor' or 'item').
  */
  compare(type:any)
  {
    this.VendorRate.clear();
    this.ItemwiseVendorRate.clear();
    if(type=="vendor")
      this.compareBy="vendor"
    else
      this.compareBy="item";
  }

  /**
  * Patches the purchase request form with provided data and disables remarks field.
  * @param data The data to patch into the form.
  */
  patchData(data) {
    // console.log(data)
    this.purchaseRequestForm.patchValue({
      title: data.title,
      date: data.date,
      expected_delivery_date: data.expected_delivery_date,
      rate_approval_number: data.rate_approval_number,
      handle_by: data.handle_by,
      site: data.site,
      local_purchase: data.local_purchase,
      remarks: data.remarks,
    });
    this.curr_site=data.site
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

      })
    }
  }
  
  getSiteList() {
    this.httpService.GET(GET_SITE_API, {}).subscribe(res => {
      this.siteList = res;
    })
  }

  getVendorList(){
    this.httpService.GET("/vendor",{}).subscribe(res=>{
      this.fetchedVendorList=res.data;
      console.log(this.fetchedVendorList);
    })
  }

  findVendor(id:any){
    // console.log(this.fetchedVendorList.find(obj=> obj._id==id))
    return this.fetchedVendorList.find(obj=> obj._id==id);
  }

  /**
  * Checks if the number of items in each vendor's item list matches the number of items in the purchase request.
  * @returns A boolean indicating whether the vendor comparison is valid.
  */
  CheckVendorComparision(){
    let ans = false;
    for (const obj of this.details.vendorItems) {
      if (obj.items.length === this.details.items.length) {
        ans = true;
        break; // This will terminate the loop
      }
    }
    return ans;
  }

  /**
  * Calculates the total amounts for a given item from vendor data.
  * @param item An array of vendor data for the item.
  * @returns An object containing subTotal, gstAmount, and total.
  */
  vendorTotal(item:any){
      let subTotal=0;
      let total=0;
      item.forEach(obj=>{
          subTotal=subTotal+obj.SubTotalAmount;
          total=total+obj.Total
      })
      let gstAmount=total-subTotal;
      return {subTotal:subTotal,
              gstAmount:gstAmount,
              total:total
        }
  }

  /**
  * Handles the change in checkbox state for a vendor.
  * If the vendor already exists in VendorRate, deletes the vendor.
  * If the vendor doesn't exist in VendorRate, adds the vendor.
  * @param vendor_id The ID of the vendor.
  * @param vendorItem The vendor item data.
  * @param vendorTotal The total amount for the vendor.
  */
  handleCheckboxChange(vendor_id,vendorItem,vendorTotal)
  {
    if(this.VendorRate.has(vendor_id))
      this.deleteVendor(vendor_id,vendorItem,vendorTotal);
    else 
      this.addVendor(vendor_id,vendorItem,vendorTotal);
  }

  /**
  * Deletes a vendor from the VendorRate map.
  * @param vendor_id The ID of the vendor to delete.
  */
  deleteVendor(vendor_id,vendorItem,vendorTotal){
    this.VendorRate.delete(vendor_id)
  }

  /**
  * Adds a vendor to the VendorRate map.
  * @param vendor_id The ID of the vendor.
  * @param vendorItem The vendor item data.
  * @param vendorTotal The total amount for the vendor.
  */
  addVendor(vendor_id,vendorItem,vendorTotal){
    this.VendorRate.set(vendor_id,{...vendorItem,...vendorTotal});
  }

  /**
  * Retrieves the list of brands from the API.
  */
  getBrandList(){
    this.httpService.GET(GET_BRAND_API, {}).subscribe(res => {
      this.brandList=res.data
      console.log(this.brandList);
    })
  }

  /**
  * Retrieves the name of the brand based on the provided brand ID.
  * @param brandId The ID of the brand.
  * @returns The name of the brand.
  */
  myBrandName(brandId:any){
    let brand=this.brandList.filter(brand=>brand._id==brandId)
    return brand[0].brand_name;
  } 

  /**
  * Updates the purchase request with the provided status.
  * @param status The status of the purchase request.
  */
  updateRequest(status: any) {
    if(status=="revise")
    {
      this.details['status']=status;
      this.details.stage="rate_comparitive";
    }
    else if(status=="rejected")
    {
      this.details['status']=status;
    }
    else{

      //generating po number
      const siteName=this.siteList.find(obj=> obj._id==this.curr_site);
      console.log(siteName)
      const dynamicDataFormatted = siteName.site_name.replace(/[ ,]/g, '_');
      console.log(dynamicDataFormatted)
      const currentYear = new Date().getFullYear();
      const nextYear = currentYear + 1;
      const yearRange = `${String(currentYear).slice(-2)}-${String(nextYear).slice(-2)}`;
      const searchTerm = `PISL/${yearRange}/${dynamicDataFormatted}/`;
      console.log(searchTerm)
      console.log(this.purchaseList)
      const filteredList = this.purchaseList.filter(item => item.po_number.includes(dynamicDataFormatted));
      const Pocount=filteredList.length+1;
      this.po_no=searchTerm;
      console.log(this.po_no);

      if(this.compareBy=='vendor')
      {
          console.log(this.VendorRate)
          // if (!this.purchaseRequestForm.valid) {
          //   return;
          // }
          let vendorRates:any[]=[];
          this.VendorRate.forEach((value,key)=>{
            // console.log(value);
            // value.VendorRate.forEach((value1,key1)=>{
  
              vendorRates.push(value);
            // })
          
          })
          this.details['vendorRatesVendorWise']=vendorRates;
         
          this.details['compareBy']=this.compareBy;
          this.details['po_number']=this.po_no;
          this.details['Pocount']=Pocount;
          if(this.details.status=='revise')
            this.details['isRevised']=true;
          this.details['status']="approved"
          // let requestedData: any = this.purchaseRequestForm.value;
          console.log(this.details);
          // let requestedData: any = this.purchaseRequestForm.value;
          // console.log(requestedData);
          // requestedData['_id'] = this.details._id;
          // requestedData['items'] = this.details.items;
          // requestedData['vendors_total'] = this.details.vendors_total;
          // requestedData['status'] = status;
      }
      else{
        // console.log(this.ItemwiseVendorRate)
        // if (!this.purchaseRequestForm.valid) {
        //   return;
        // }
        let vendorRates:any[]=[];
        this.ItemwiseVendorRate.forEach((value,key)=>{
          // console.log(value);
          value.VendorRate.forEach((value1,key1)=>{
            vendorRates.push(value1);
          })
         
        })
        this.details['vendorRatesItemWise']=vendorRates
        
        this.details['compareBy']=this.compareBy;
        this.details['po_number']=this.po_no;
        this.details['Pocount']=Pocount;
        if(this.details.status=='revise')
            this.details['isRevised']=true;
        this.details['status']="approved"
        // let requestedData: any = this.purchaseRequestForm.value;
        console.log(this.details);
  
      }
      if (!this.purchaseRequestForm.valid) {
        return;
      }
  
      // let requestedData: any = this.purchaseRequestForm.value;
      // requestedData['_id'] = this.details._id;
      // requestedData['items'] = this.details.items;
      // requestedData['vendors_total'] = this.details.vendors_total;
      // requestedData['status'] = status;
      // requestedData['po_number']=this.po_no;
    }
    this.load = true;
    console.log(this.details)
    this.httpService.PUT(RATE_COMPARATIVE_API, this.details).subscribe(res => {
      this.snack.notify("Detail has been updated", 1);
      this.router.navigate(['/rate-approval'])
      this.load = false;
    }, (err: any) => {
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
    })
   
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.httpService.GET(`${RATE_COMPARATIVE_DETAIL_API}`, { _id: params['id'] }).subscribe({
          next: res => {
            this.details = res.data.details;
            this.patchData(res.data.details);
          }, error: (error) => {
            // this.router.navigate(['/procurement/prlist'])
          }
        })
      }
    });
  }


}
