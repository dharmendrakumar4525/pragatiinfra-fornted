import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { RATE_COMPARATIVE_DETAIL_API, GET_SITE_API, GET_BRAND_API } from '@env/api_path';
import { RequestService } from '@services/https/request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RateComparativeVendorsComponent } from '../rate-comparative-vendors/rate-comparative-vendors.component';
import { I, P } from '@angular/cdk/keycodes';
import { UsersService } from '@services/users.service';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
declare var $: any;
@Component({
  selector: 'app-rate-comparative-details',
  templateUrl: './rate-comparative-details.component.html',
  styleUrls: ['./rate-comparative-details.component.scss']
})
export class RateComparativeDetailsComponent implements OnInit {


  id: any;
  siteList: any;
  load = false;
  items: FormArray;
  finalVendorArray:any[]=[];
  VendorItems: FormArray = this.formBuilder.array([]);
  filteredItems:any;

  purchaseRequestForm = new FormGroup({
    title: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    expected_delivery_date: new FormControl('', Validators.required),
    handle_by: new FormControl({value:'',disabled:true}, Validators.required),
    rate_approval_number: new FormControl(''),
    site: new FormControl({value:'',disabled:true}, Validators.required),
    local_purchase: new FormControl({value:'',disabled:true}, Validators.required),
    remarks: new FormControl('', []),
    items: this.formBuilder.array([]),
    _id: new FormControl()
  });

  details: any = {};
  vendorsList: Array<any> = [];
  vendorAssociatedData: Array<any> = [];
  users:any;
  brandList: any;
  constructor(
    private router: Router,
    private httpService: RequestService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userService: UsersService,
    private http: HttpClient

  ) {
    this.getSiteList();
    this.getBrandList();
    this.userService.getUserss().subscribe(data => {
      this.users = data
      console.log("this.users", this.users);
      //console.log(this.tasksData)
    })
  }

  
  vendorData(dataObj: any) {
    let id = dataObj._id;
    if ($(`.vendor-detail-button-${id}`).hasClass('collapsed')) {
      $(`.vendor-detail-button-${id}`).removeClass('collapsed');
      $(`.vendor-detail-${id}`).removeClass('cl-show');

    } else {
      $(`.vendor-detail-button-${id}`).addClass('collapsed');
      $(`.vendor-detail-${id}`).addClass('cl-show');
    }
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
  createItem(item?: any): any {
    console.log(item,"item")
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
  ItemData(dataObj: any) {
    
    // let index=this.finalVendorArray.findIndex(item=> item==dataObj)
    // console.log(index)
    const dialogPopup = this.dialog.open(RateComparativeVendorsComponent, {
      data: {
        dataObj: dataObj.Vendor,
        vendorsList: this.vendorsList,
        items:this.details?.items,
        filledData:dataObj,
        brandList:this.brandList,
        type:"detailsPage"
      }
    });
    // console.log(dataObj,this.items,"data")
    dialogPopup.afterClosed().subscribe((result: any) => {
      if (result && result['option'] === 1) {

       
        // this.VendorItems[index]=result;
        // this.rateComparativeForm.get('VendorItems')['insert'](0, result);
        // this.rateComparativeForm.get('VendorItems').get(index.toString()).setValue(result);
        // console.log(this.VendorItems,"VV");
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


  objectBackToFormGroup() {
    // Clear the existing form array
    this.VendorItems.clear();

    for (let i = 0; i < this.details.vendorItems.length; i++) {
      const myObject = {
        Vendor: this.details.vendorItems[i].Vendor,
        category: 'GST',
        subCategory: 'GST',
        items: this.details.vendorItems[i].items,
      };
      console.log(this.details.vendorItems[i].items)
      console.log("bye")
      const formGroup: FormGroup = this.formBuilder.group({
        Vendor: [myObject.Vendor, Validators.required],
        category: [myObject.category, Validators.required],
        subCategory: [myObject.subCategory, Validators.required],
        items: this.formBuilder.array([]),  // You may need to handle items array similarly
        // ... other controls
      });

      this.VendorItems.push(formGroup);
    }
    console.log(this.VendorItems)
  }

 
  patchData(data) {
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

    this.purchaseRequestForm.controls['remarks'].disable();
  }


  getSiteList() {
    this.httpService.GET(GET_SITE_API, {}).subscribe(res => {
      console.log("site",res.data)
      this.siteList = res.data;
      //console.log("site",this.siteList)
    })
  }

  isVendorSelected(items: any): any[] {
    //console.log(items,"Items")
    let tempVendorList=this.details.vendorItems.filter((vendor)=>vendor.category==items.categoryDetail._id 
      && vendor.subCategory==items.subCategoryDetail._id)
    //console.log(tempVendorList,"LLL")
    return tempVendorList;
  }
  detailsOfVendor(vendor:any,type:any,i:any){
    // console.log("object")
    // console.log(vendor,type,i,"KKKKK")
    // if(type=="topview")
    // {
      let temp=this.vendorsList.find(obj=> obj._id==vendor.Vendor)
      return temp.vendor_name;
    // }
    // let tempvendor=this.vendorsList.find(obj=> obj._id==vendor)   
    // //console.log(this.details.items,tempvendor);
    
    //   if(type=="name")
    //   {
    //       return tempvendor.vendor_name
    //   }
    //   else if(type=="category")
    //   {
    //       return this.details.items[i].categoryDetail.name
    //   }
    //   else if(type=="subCategory")
    //   {
    //       return this.details.items[i].subCategoryDetail.subcategory_name
    //   }
  }
  // get vendorArray(): FormArray {
  //   return this.vendorForm.get('vendor') as FormArray;
  // }
  getBrandList(){
    // console.log("hi")
    this.httpService.GET(GET_BRAND_API, {}).subscribe(res => {
      this.brandList=res.data
      console.log(this.brandList);
    })
  }
  ngOnInit(): void {
    
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.httpService.GET(`${RATE_COMPARATIVE_DETAIL_API}`, { _id: params['id'] }).subscribe({
          next: res => {
            this.details = res.data.details;
            console.log(this.details)
            
            this.objectBackToFormGroup(); 
            console.log(this.details)
            this.vendorsList = res.data.vendorsList;
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
            this.patchData(res.data.details);  
                     
          }, error: (error) => {
            this.router.navigate(['/rate-comparative'])
          }
        })
      }
    });
  }

}
