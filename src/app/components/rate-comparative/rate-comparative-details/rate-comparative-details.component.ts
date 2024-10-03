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
  files:any;
  isSaved = true;
  vendorItemsTables :any;
  purchaseRequestForm = new FormGroup({
    title: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    expected_delivery_date: new FormControl('', Validators.required),
    handle_by: new FormControl({value:'',disabled:true}, Validators.required),
    rate_approval_number: new FormControl(''),
    site: new FormControl({value:'',disabled:true}, Validators.required),
    local_purchase: new FormControl({value:'',disabled:true}, Validators.required),
    remarks: new FormControl('', []),
    files:new FormControl([]),
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
    console.log("==dataObj==",dataObj)
    
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
      
      const formGroup: FormGroup = this.formBuilder.group({
        Vendor: [myObject.Vendor, Validators.required],
        category: [myObject.category, Validators.required],
        subCategory: [myObject.subCategory, Validators.required],
        items: this.formBuilder.array([]),  // You may need to handle items array similarly
        // ... other controls
      });

      this.VendorItems.push(formGroup);
    }
    
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
      files:data.files,
    });
    this.files=data.files;
    this.vendorItemsTables=data.vendorRatesVendorWise;
    console.log("vendorItemsTable", this.vendorItemsTables);
    this.purchaseRequestForm.controls['remarks'].disable();
  }


  
  getVendorKeysArray(vendorObj: any): string[] {

    console.log(vendorObj);
    return Object.keys(vendorObj);
  }

  isLowestGrandTotal(vendorId: string): boolean {
    const vendorItemsTable = this.vendorItemsTables[0];
    
    // Ensure vendorItemsTable and totals exist
    if (!vendorItemsTable || !vendorItemsTable.totals) {
        console.error('Vendor items table or totals not found');
        return false;
    }

    const currentGrandTotal = vendorItemsTable.totals[vendorId]?.grandTotal || Infinity;


    // Extract grandTotal values from the totals object
    const totalsArray = Object.values(vendorItemsTable.totals);
    const grandTotalArray: number[] = totalsArray.map((item: any) => item.grandTotal);

  

    // Check if the currentGrandTotal is the minimum in the array
    const isLowest = currentGrandTotal === Math.min(...grandTotalArray);
    return isLowest;
} 

isPreferredGrandTotal(vendorId: string): boolean {
  const vendorItemsTable = this.vendorItemsTables[0];

  // Ensure vendorItemsTable and totals exist
  if (!vendorItemsTable || !vendorItemsTable.totals) {
      console.error('Vendor items table or totals not found');
      return false;
  }

  // Check if the preferred property is true for this vendorId
  return vendorItemsTable.totals[vendorId]?.preferred === true;
}
t


isSmallestAmount(itemId: string, vendorId: string): boolean {
  // Find the item that matches the provided itemId
  const item = this.vendorItemsTables[0].items.find((item: any) => item.item_id === itemId);
  
  // If item is not found, return false
  if (!item) {
    console.error(`Item with ID ${itemId} not found`);
    return false;
  }

  // Get the vendors object for the specific item
  const vendors = item.vendors;

  // If the vendorId is not found in the vendors object, return false
  if (!vendors[vendorId]) {
    console.error(`Vendor with ID ${vendorId} not found in item ${itemId}`);
    return false;
  }

  // Get the amount of the vendorId we're checking
  const currentVendorAmount = parseFloat(vendors[vendorId].amount);

  // Extract all vendor amounts and compare
  const vendorAmounts = Object.values(vendors).map((vendor: any) => parseFloat(vendor.amount));

  // Return true if the current vendor's amount is the smallest in the list
  return currentVendorAmount === Math.min(...vendorAmounts);
}


// In your component
getVendorKeys() {
  return Object.keys(this.vendorItemsTables[0].totals);
}

getVendorIds(table: any): string[] {
  return Object.keys(table.totals);
}



togglePreferredVendor(item: any, selectedVendorId: string): void {
  // Find the vendor that was previously selected in this item
  const previouslyPreferredVendorId = Object.keys(item.vendors).find(vendorId => item.vendors[vendorId].preferred);

  // If there was a previously preferred vendor, unset its preference
  if (previouslyPreferredVendorId && previouslyPreferredVendorId !== selectedVendorId) {
    item.vendors[previouslyPreferredVendorId].preferred = false;
  }

  // Toggle the selected vendor's preferred status
  const selectedVendor = item.vendors[selectedVendorId];
  selectedVendor.preferred = !selectedVendor.preferred;

  // Update the totals
  this.updateVendorTotals();
}

  
updateVendorTotals() {
  // Get all items from all vendor items tables
  const allItems = this.vendorItemsTables.flatMap(table => table.items);

  // Update each vendor's total preferred status based on their preference in items
  Object.keys(this.vendorItemsTables[0].totals).forEach(vendorId => {
    const vendorIsPreferredInAllItems = allItems.every(itm => itm.vendors[vendorId]?.preferred);
    this.vendorItemsTables[0].totals[vendorId].preferred = vendorIsPreferredInAllItems;
  });
}

toggleVendorPreferred(index: number, event: any) {
  const vendorKeys = Object.keys(this.vendorItemsTables[0].totals);
  const selectedVendorId = vendorKeys[index];
  const isChecked = event.target.checked;

  // Loop through all items to update the preference status
  this.vendorItemsTables.forEach(table => {
    table.items.forEach(item => {
      Object.keys(item.vendors).forEach(vendorId => {
        if (vendorId !== selectedVendorId) {
          // Clear preference for vendors that are not selected
          item.vendors[vendorId].preferred = false;
        } else if (!isChecked) {
          // If the selected vendor is being unselected, just clear its preference
          item.vendors[vendorId].preferred = false;
        }
      });
    });
  });

  // Update the preferred status in totals
  vendorKeys.forEach(vendorId => {
    this.vendorItemsTables[0].totals[vendorId].preferred = (vendorId === selectedVendorId) && isChecked;
  });

  // If the vendor is selected, set all items' vendor preferred to true for that vendor
  if (isChecked) {
    this.vendorItemsTables.forEach(table => {
      table.items.forEach(item => {
        item.vendors[selectedVendorId].preferred = true;
      });
    });
  }

  // Update totals based on item preferences
  this.updateVendorTotals();
}

filterData(data) {
  const { items, vendors, totals } = data;

  // Check if any vendor in totals is preferred
  const preferredVendorIds = Object.keys(totals).filter(vendorId => totals[vendorId].preferred);

  if (preferredVendorIds.length > 0) {
      // Case 1: If there are preferred vendors, remove other vendors from totals
      const preferredVendorId = preferredVendorIds[0];

      // Filter totals
      const filteredTotals = {};
      filteredTotals[preferredVendorId] = totals[preferredVendorId];

      // Filter items
      const filteredItems = items.map(item => {
          const preferredVendorData = item.vendors[preferredVendorId];
          if (preferredVendorData) {
              return {
                  ...item,
                  vendors: {
                      [preferredVendorId]: preferredVendorData
                  }
              };
          }
          return item;
      });

      return { items: filteredItems, vendors, totals: filteredTotals };
  } else {
      // Case 2: No preferred vendors, filter items based on preferred vendors
      const filteredItems = items.map(item => {
          const preferredVendors = Object.keys(item.vendors).filter(vendorId => item.vendors[vendorId].preferred);
          if (preferredVendors.length > 0) {
              const filteredVendors = preferredVendors.reduce((acc, vendorId) => {
                  acc[vendorId] = item.vendors[vendorId];
                  return acc;
              }, {});

              return {
                  ...item,
                  vendors: filteredVendors
              };
          }
          return {
              ...item,
              vendors: {}
          };
      });

      return { items: filteredItems, vendors, totals };
  }
}




getTotalAmount(items: any[]): number {
  console.log("here that is", items);
  return items.reduce((total, item) => {
    const taxAmount = item.Total-item. SubTotalAmount;
    return total + taxAmount;
  }, 0);
}

calculateGrandTotal(vendorItem: any): number {
  const vendorTotal = this.vendorTotal(vendorItem.items);
  const gstTotal = this.getTotalAmount(vendorItem.items);
  return vendorTotal.subTotal + vendorTotal.freight + gstTotal;
}

getLowestGrandTotal(): number {
  return Math.min(...this.details.vendorItems.map(vendorItem => this.calculateGrandTotal(vendorItem)));
}


vendorTotal(item:any){

  console.log("check Item", item);
  let subTotal=0;
  let total=0;
  let freight=0;
  let gstAmount=0;
  let rate=0;
  let qty=0;
  item.forEach(obj=>{
      subTotal=obj.SubTotalAmount + subTotal;
      total=+obj.Total + +total;
      freight = +obj.Freight + +freight;
      gstAmount = total-subTotal;
      rate=obj.Rate;
      qty=obj.RequiredQuantity;

  })
  return {
          subTotal:subTotal,
          gstAmount:gstAmount,
          total:total,
          freight : freight,
          rate:rate,
          qty:qty
    }
}


  getSiteList() {
    this.httpService.GET(GET_SITE_API, {}).subscribe(res => {
      
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
      
    })
  }
  ngOnInit(): void {
    
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.httpService.GET(`${RATE_COMPARATIVE_DETAIL_API}`, { _id: params['id'] }).subscribe({
          next: res => {
            this.details = res.data.details;
            
            
            this.objectBackToFormGroup(); 
            
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
