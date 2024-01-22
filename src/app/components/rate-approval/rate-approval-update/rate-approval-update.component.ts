import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { RATE_COMPARATIVE_DETAIL_API, GET_SITE_API, ITEM_API, UOM_API, RATE_COMPARATIVE_API,PURCHASE_ORDER_API } from '@env/api_path';
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
  // vendorsList: Array<any> = [];
  // vendorAssociatedData: Array<any> = [];
  users: any = [];

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
    this.getVendorList();
    this.userService.getUserss().subscribe(data => {
      this.users = data;
    })


  }


  vendorData(dataObj: any) {
    console.log(dataObj)
    // console.log(this.ItemwiseVendorRate.get(dataObj.item_id))
    const dialogPopup = this.dialog.open(VendorRateListingComponent, {
      data: {
        item: dataObj,
        vendorItems: this.details.vendorItems,
        fetchedVendorList:this.fetchedVendorList,
        pageData:this.ItemwiseVendorRate.get(dataObj.item_id)
      }
    });
    dialogPopup.afterClosed().subscribe((result: any) => {
      console.log('result', result)
      if(result && result.data && result.data.VendorRate ){
        if(result.data.VendorRate.size>0)
          this.ItemwiseVendorRate.set(dataObj.item_id,result.data)
        else
          this.ItemwiseVendorRate.delete(dataObj.item_id)
      }
      // if (result && result['option'] === 1) {

      //   let vendorTotalData: Array<any> = [];

      //   this.details.items = this.details.items.map((o: any) => {
      //     if (o._id == dataObj._id) {
      //       o.vendors = result.data.itemVendors;
      //     }

      //     o.vendors.map((vendorObj: any) => {
      //       if (!(vendorTotalData[vendorObj.vendor_id])) {
      //         vendorTotalData[vendorObj.vendor_id] = { tax_total: 0, vendor_subtotal: 0 };
      //       }
      //       if (!vendorTotalData[vendorObj.vendor_id]['tax_total']) {
      //         vendorTotalData[vendorObj.vendor_id]['tax_total'] = 0;
      //       }
      //       if (!vendorTotalData[vendorObj.vendor_id]['vendor_subtotal']) {
      //         vendorTotalData[vendorObj.vendor_id]['vendor_subtotal'] = 0;
      //       }

      //       let taxamount = 0;
      //       if (o.tax && o.tax.amount) {
      //         taxamount = (vendorObj.item_subtotal * o.tax.amount) / 100;
      //       }
      //       vendorTotalData[vendorObj.vendor_id]['tax_total'] += taxamount;
      //       vendorTotalData[vendorObj.vendor_id]['vendor_subtotal'] += vendorObj.item_subtotal;
      //     })
      //     return o;
      //   });



      //   this.details.vendors_total = this.details.vendors_total.map((o: any) => {
      //     let dataObj = vendorTotalData[o.vendor_id];
      //     o.subtotal = dataObj.vendor_subtotal;
      //     o.total_tax = dataObj.tax_total;
      //     let total = o.subtotal + o.total_tax;

      //     if (o.freight_charges) {
      //       total += Number(o.freight_charges);
      //     }
      //     if (o.freight_tax) {
      //       total += (Number(o.freight_charges) * Number(o.freight_tax)) / 100;
      //     }
      //     o.total_amount = total;
      //     return o;
        // })





        // console.log('vendorTotalData', vendorTotalData)

      // }
    });
  }



  getList() {

    const site = this.http.get<any>(`${environment.api_path}${GET_SITE_API}`);
    const purchase = this.http.get<any>(`${environment.api_path}${PURCHASE_ORDER_API}`);
    this.httpService.multipleRequests([site,purchase], {}).subscribe(res => {
      if (res) {
        this.siteList = res[0].data;
        this.purchaseList=res[1].data
        console.log(this.purchaseList+"from getsitelist")
      }
    })
  }
  compare(type:any)
  {
    this.VendorRate.clear();
    this.ItemwiseVendorRate.clear();
    if(type=="vendor")
      this.compareBy="vendor"
    else
      this.compareBy="item";
  }
  patchData(data) {
    console.log(data)
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
  // vendorDisplay(item:any){
  //   console.log(item)
  //   console.log(this.details);
  //   // let filteredVendors=this.details.vendorItems.filter((obj)=>{
  //   //     return obj.items.filter( (itemobj)=> itemobj.item.item_id==item.item_id)
  //   // })
  //   // console.log("---------")
  //   // console.log(filteredVendors)
  // }

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
  handleCheckboxChange(vendor_id,vendorItem,vendorTotal)
  {
    // console.log(vendorItem)
    // console.log(vendorTotal)
      if(this.VendorRate.has(vendor_id))
        this.deleteVendor(vendor_id,vendorItem,vendorTotal);
      else 
        this.addVendor(vendor_id,vendorItem,vendorTotal);
  }
  deleteVendor(vendor_id,vendorItem,vendorTotal){
    this.VendorRate.delete(vendor_id)
      // console.log("delete vendor")
  }
  addVendor(vendor_id,vendorItem,vendorTotal){
    // console.log({...vendorItem,...vendorTotal})
    this.VendorRate.set(vendor_id,{...vendorItem,...vendorTotal});
    // console.log("add vendor")
  }

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
    // console.log(this.details)
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

  // onChangeFreightCharges(event: any, item: any) {
  //   let value = (event.target.value && event.target.value >= 0) ? Number(event.target.value) : 0;

  //   this.details.vendors_total = this.details.vendors_total.map((o: any) => {

  //     if (o.vendor_id == item.vendor_id) {
  //       o.freight_charges = value;
  //       let total = o.subtotal + o.total_tax;

  //       if (o.freight_charges) {
  //         total += Number(o.freight_charges);
  //       }
  //       if (o.freight_tax) {
  //         total += (Number(o.freight_charges) * Number(o.freight_tax)) / 100;
  //       }
  //       o.total_amount = total;
  //     }

  //     return o;
  //   })

  // }


  // onChangeFreightTaxPercent(event: any, item: any) {
  //   let value = (event.target.value && event.target.value >= 0) ? Number(event.target.value) : 0;

  //   this.details.vendors_total = this.details.vendors_total.map((o: any) => {

  //     if (o.vendor_id == item.vendor_id) {
  //       o.freight_tax = value;
  //       let total = o.subtotal + o.total_tax;

  //       if (o.freight_charges) {
  //         total += Number(o.freight_charges);
  //       }
  //       if (o.freight_tax) {
  //         total += (Number(o.freight_charges) * Number(o.freight_tax)) / 100;
  //       }
  //       o.total_amount = total;
  //     }
  //     return o;
  //   })
  // }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.httpService.GET(`${RATE_COMPARATIVE_DETAIL_API}`, { _id: params['id'] }).subscribe({
          next: res => {
            this.details = res.data.details;
            // this.vendorsList = res.data.vendorsList;
            // this.vendorsList.map((o: any) => {
            //   this.vendorAssociatedData[o._id] = o;
            //   return o;
            // });

            this.patchData(res.data.details);
          }, error: (error) => {
            // this.router.navigate(['/procurement/prlist'])
          }
        })
      }
    });
  }


}
