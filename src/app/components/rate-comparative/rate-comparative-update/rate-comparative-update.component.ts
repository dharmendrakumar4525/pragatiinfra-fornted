import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { RATE_COMPARATIVE_DETAIL_API, GET_SITE_API, ITEM_API, UOM_API, RATE_COMPARATIVE_API } from '@env/api_path';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';

import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { RateComparativeVendorsComponent } from '../rate-comparative-vendors/rate-comparative-vendors.component';
import { isEmpty } from 'lodash';
import { UsersService } from '@services/users.service';

@Component({
  selector: 'app-rate-comparative-update',
  templateUrl: './rate-comparative-update.component.html',
  styleUrls: ['./rate-comparative-update.component.scss']
})
export class RateComparativeUpdateComponent implements OnInit {



  id: any;
  siteList: any;
  load = false;
  items: FormArray;
  flag:boolean=false;
  finalVendorArray:any[]=[];
  VendorItems:any[]=[];
  isButtonDisabled: boolean = true;

  rateComparativeForm = new FormGroup({
    title: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    expected_delivery_date: new FormControl('', Validators.required),
    handle_by: new FormControl({value: '', disabled: true}, Validators.required),
    rate_approval_number: new FormControl(''),
    site: new FormControl({value: '', disabled: true}, Validators.required),
    local_purchase: new FormControl({value: '', disabled: true}, Validators.required),
    remarks: new FormControl('', []),
    _id: new FormControl()
  });

  details: any = {};
  vendorsList: Array<any> = [];
  vendorAssociatedData: Array<any> = [];
  users: any;
  filteredItems:Array<any> = [];

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
    this.userService.getUserss().subscribe(data => {
      this.users = data
      console.log("this.users", this.users);
      //console.log(this.tasksData)
    })
  }

  vendorForm = this.formBuilder.group({
    vendor: this.formBuilder.array([]),
  });
  ItemData(dataObj: any,vendors:any) {
    console.log(vendors)
    let index=this.finalVendorArray.findIndex(item=> item==dataObj)
    //console.log(index)
    const dialogPopup = this.dialog.open(RateComparativeVendorsComponent, {
      data: {
        dataObj: dataObj,
        vendorsList: this.vendorsList,
        items:this.details?.items,
        // index:i,
        vendors:vendors,
        filledData:this.VendorItems[index]
      }
    });
    dialogPopup.afterClosed().subscribe((result: any) => {
      if (result && result['option'] === 1) {

       
        this.VendorItems[index]=result;
        // this.rateComparativeForm.get('VendorItems')['insert'](0, result);
        // this.rateComparativeForm.get('VendorItems').get(index.toString()).setValue(result);
        console.log(this.VendorItems);
        // let vendorTotalData: Array<any> = [];

        // this.details.items = this.details.items.map((o: any) => {
        //   if (o._id == dataObj._id) {
        //     o.vendors = result.data.itemVendors;
        //   }
        //   return o;
        // });

      }
    });
  }



  getList() {

    const site = this.http.get<any>(`${environment.api_path}${GET_SITE_API}`);
    this.httpService.multipleRequests([site], {}).subscribe(res => {
      if (res) {
        this.siteList = res[0].data;
      }
    })
  }

  patchData(data) {
    let loginUser = JSON.parse(localStorage.getItem('loginData'))
    this.rateComparativeForm.patchValue({
      title: data.title,
      date: data.date,
      expected_delivery_date: data.expected_delivery_date,
      rate_approval_number: data.rate_approval_number,
      handle_by: loginUser.user._id,
      site: data.site,
      local_purchase: data.local_purchase,
    });

    // this.rateComparativeForm.controls['remarks'].disable();
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

    // this.items = this.rateComparativeForm.get('items') as FormArray;
    // if (item) {
    //   this.items.push(this.createItem(item));
    // }
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


  // rejectRequest(){
  //   this.details['status']="rejected"
  //   this.load = true;
  //   this.httpService.PUT(RATE_COMPARATIVE_API, this.details).subscribe(res => {
  //     this.snack.notify("Detail has been updated", 1);
  //     this.router.navigate(['/rate-comparative'])
  //     this.load = false;
  //   }, (err: any) => {
  //     this.load = false;
  //     if (err.errors && !isEmpty(err.errors)) {
  //       let errMessage = '<ul>';
  //       for (let e in err.errors) {
  //         let objData = err.errors[e];
  //         errMessage += `<li>${objData[0]}</li>`;
  //       }
  //       errMessage += '</ul>';
  //       this.snack.notifyHtml(errMessage, 2);
  //     } else {
  //       this.snack.notify(err.message, 2);
  //     }
  //   })
  // }
  updateRequest() {
    if (!this.rateComparativeForm.valid) {
      return;
    }
    let loginUser = JSON.parse(localStorage.getItem('loginData'))
    let requestedData= this.rateComparativeForm.value;
    // console.log(this.rateComparativeForm)
    requestedData['_id'] = this.details._id;
    requestedData['items'] = this.details.items;
    requestedData['stage'] = 'rate_approval';
    requestedData['handle_by']=loginUser.user._id;
    for(let i=0;i<this.VendorItems.length;i++)
      this.VendorItems[i]=this.VendorItems[i].data.value
    
    requestedData['vendorItems']=this.VendorItems;
    this.load = true;
    // console.log(this.VendorItems)
    console.log(requestedData)
    this.httpService.PUT(RATE_COMPARATIVE_API, requestedData).subscribe({
      next: res => {
        this.snack.notify("Detail has been updated", 1);
        this.router.navigate(['/rate-comparative'])
        this.load = false;
      }, error: (err: any) => {
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
  isVendorSelected(items: any): any[] {
    let tempVendorList=this.vendorsList.filter(vendor=>vendor.category.includes(items.categoryDetail._id) && vendor.SubCategory.includes(items.subCategoryDetail._id))
    return tempVendorList;
  }
  get vendorArray(): FormArray {
    return this.vendorForm.get('vendor') as FormArray;
  }
  handleVendorChange(){
    //console.log("hi")
    this.flag=false;
    this.isButtonDisabled=false;
  }

  save(){
    console.log(this.vendorForm)
    this.flag=true;
    this.isButtonDisabled=true;
    //making array empty
    this.finalVendorArray.length=0;
    this.VendorItems.length=0;
    for(let vendors of this.vendorArray.controls)
    {
      for(let vendor of vendors.get('selectedVendors').value)
      {
        this.finalVendorArray.push(vendor)
        this.VendorItems.push("");
      }
    }
    console.log(this.finalVendorArray)
  }
  detailsOfVendor(vendor:any){
    let tempvendor=this.vendorsList.find(obj=> obj._id==vendor)
    return tempvendor.vendor_name
      // if(type=="name")
      // {
      //     return tempvendor.vendor_name
      // }
      // else if(type=="category")
      // {
      //     return this.details.items[i].categoryDetail.name
      // }
      // else if(type=="subCategory")
      // {
      //     return this.details.items[i].subCategoryDetail.subcategory_name
      // }
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.httpService.GET(`${RATE_COMPARATIVE_DETAIL_API}`, { _id: params['id'] }).subscribe({
          next: res => {
            this.details = res.data.details;
            console.log(this.details)
            this.vendorsList = res.data.vendorsList;
            console.log(this.vendorsList)
            this.vendorsList.map((o: any) => {
              this.vendorAssociatedData[o._id] = o;
              return o;
            });
            let temparr = [];
            this.filteredItems=this.details?.items.filter(item => {
              let s = item.categoryDetail._id + "$" + item.subCategoryDetail._id;
              if (!temparr.includes(s)) {
                temparr.push(s);
                return true; // Include the item when it's not in temparr
              }
              return false; // Exclude the item when it's already in temparr
            });
            // console.log(x);
            // return x;
            //Initialize selectedVendors FormArray with empty form groups for each item
            this.filteredItems.forEach((items) => {
              let tempselectedVendors = this.formBuilder.group({
                Item_category: items.categoryDetail,
                Item_subCategory: items.subCategoryDetail,
                selectedVendors: new FormControl([])
              });
              (this.vendorForm.get('vendor') as FormArray).push(tempselectedVendors);
              // other form controls specific to each item...
            });            
            console.log(this.vendorForm.get('vendor')as FormArray)
            this.patchData(res.data.details);
          }, error: (error) => {
            // this.router.navigate(['/procurement/prlist'])
          }
        })
      }
    });
  }

}
