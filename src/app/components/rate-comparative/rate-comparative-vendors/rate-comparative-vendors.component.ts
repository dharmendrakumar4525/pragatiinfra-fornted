import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import { isEmpty } from 'lodash';
import * as moment from 'moment';
import { VENDOR_API } from '@env/api_path';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
@Component({
  selector: 'app-rate-comparative-vendors',
  templateUrl: './rate-comparative-vendors.component.html',
  styleUrls: ['./rate-comparative-vendors.component.scss']
})
export class RateComparativeVendorsComponent implements OnInit {

  // form = new UntypedFormGroup({
  //   customer: new UntypedFormControl('', [Validators.required]),
  //   date: new UntypedFormControl(new Date()),
  //   numbering_group: new UntypedFormControl('', [Validators.required])
  // });
  // vendorAssociatedData: Array<any> = [];
  vendorsList: any;
  pageDetail: any;
  // totalInputQuantity: any = 0;
  items:any;
  i:any;
  category:any;
  subCategory:any;
  VendorDetails:any;
  tempFilteredItems:any;
  vendorItemsForm: FormGroup;
  type:any;
  vendors:any;
  filledData
  brandList: any;
  constructor(
    private formBuilder: FormBuilder,
    private snack: SnackbarService,
    public dialogRef: MatDialogRef<RateComparativeVendorsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.brandList=data.brandList;
    if(data.type)
    {
      this.pageDetail = data.dataObj;
      this.vendorsList = data.vendorsList;
      this.items=data.items;
      this.type=data.type;
      this.filledData=data.filledData;
      this.VendorDetails=this.vendorsList.find(obj=> obj._id==this.pageDetail)
      // filledData:dataObj,
    }
    else{
      this.pageDetail = data.dataObj;
      this.vendorsList = data.vendorsList;
      this.items=data.items;
      this.vendors=data.vendors;
      // this.i=data.index;
      this.filledData=data.filledData;
      //console.log(this.filledData)
      
      console.log(this.pageDetail);
      console.log(this.items);
      // console.log(this.i);
      this.category=this.vendors.get('Item_category').value;
      this.subCategory=this.vendors.get('Item_subCategory').value;
      this.VendorDetails=this.vendorsList.find(obj=> obj._id==this.pageDetail)
      console.log(this.VendorDetails)
      this.tempFilteredItems=this.items.filter(obj=> obj.categoryDetail._id==this.category._id && obj.subCategoryDetail._id==this.subCategory._id)
      this.vendorItemsForm = new FormGroup({
        Vendor: new FormControl(this.pageDetail, Validators.required),
        category: new FormControl(this.category._id, Validators.required),
        subCategory: new FormControl(this.subCategory._id, Validators.required),
        items: this.formBuilder.array([]),
      });
      for(let i=0;i<this.tempFilteredItems.length;i++)
      {
        const itemGroup = this.formBuilder.group({
          item: new FormControl(this.tempFilteredItems[i]),
          RequiredQuantity: new FormControl('', Validators.required),
          Rate:new FormControl('', Validators.required),
          SubTotalAmount:new FormControl('', Validators.required),
          Total:new FormControl('', Validators.required),
        });
        (this.vendorItemsForm.get('items')as FormArray).push(itemGroup);
      }
      if(this.filledData)
      {
        this.fillpage(this.filledData);
      }
  
    }
    
    // this.itemVendors = this.itemVendors.map((o: any) => {
    //   this.totalInputQuantity = this.totalInputQuantity + (o.quantity && o.quantity > 0) ? o.quantity : 0;
    //   o.brand = o.brand ? o.brand : '';
    //   return o;
    // })

    // this.data.vendorsList.map((o: any) => {
    //   this.vendorAssociatedData[o._id] = o;
    //   return o;
    // });
  }
  fillpage(filledData:any)
  {
      console.log(filledData);
      this.vendorItemsForm=filledData.data;
  }
  myBrandName(brandId:any){
    console.log("mybrandfunction",brandId)
    let brand=this.brandList.filter(brand=>brand._id==brandId)
    console.log(brand)
    return brand[0].brand_name;
  } 
  // Filtereditems(){
  //   let tempFilteredItems=this.items.filter(obj=> obj.categoryDetail._id==this.category._id && obj.subCategoryDetail._id==this.subCategory._id)
  //   for(let i=0;i<tempFilteredItems.length;i++)
  //   {
  //     const itemGroup = this.formBuilder.group({
  //       item: new FormControl(tempFilteredItems[i]),
  //       RequiredQuantity: new FormControl('', Validators.required),
  //       Rate:new FormControl('', Validators.required),
  //       SubTotalAmount:new FormControl('', Validators.required),
  //       Total:new FormControl('', Validators.required),
  //     });
  //     (this.vendorItemsForm.get('items')as FormArray).push(itemGroup);
  //   }
  //   return tempFilteredItems;
  // }
  calculateSubTotalAmount(index: number): number {
    const rate = this.vendorItemsForm.get('items').get(index.toString()).get('Rate').value;
    const requiredQuantity = this.vendorItemsForm.get('items').get(index.toString()).get('RequiredQuantity').value;
    this.vendorItemsForm.get('items').get(index.toString()).get('SubTotalAmount').setValue(rate*requiredQuantity);
    return rate * requiredQuantity;
  }
  calculateTotalAmount(index: number): number {
    const totalAmount=this.vendorItemsForm.get('items').get(index.toString()).get('SubTotalAmount').value+(this.vendorItemsForm.get('items').get(index.toString()).get('SubTotalAmount').value*this.tempFilteredItems[index].tax.amount)/100;
    this.vendorItemsForm.get('items').get(index.toString()).get('Total').setValue(totalAmount);
    // console.log(this.vendorItemsForm)
    return totalAmount;
  }
  onNoClick(): void {
    this.dialogRef.close({ option: 2, data: this.data });
  }

  onYesClick(): void {
    //console.log(this.vendorItemsForm.value)
    this.dialogRef.close({ option: 1, data: this.data });
  }




  onChangeQuantity(event, itemObj) {

    // let quantity = (event.target.value && event.target.value >= 0) ? Number(event.target.value) : 0;
    // let currentItemQuantity = (itemObj.quantity && itemObj.quantity >= 0) ? Number(itemObj.quantity) : 0;

    // let totalInputQuantityData = (this.totalInputQuantity + quantity) - currentItemQuantity;

    // if (totalInputQuantityData > this.pageDetail.qty) {
    //   event.target.value = currentItemQuantity;
    //   this.snack.notify("Total quantity cannot be greater than required quantity", 2);
    //   return;
    // }

    // this.totalInputQuantity = totalInputQuantityData;

    // this.itemVendors = this.itemVendors.map((o: any) => {

    //   if (o._id == itemObj._id) {
    //     o.quantity = quantity;
    //     let itemRate = (o.item_rate && o.item_rate >= 0) ? o.item_rate : 0;
    //     o.item_subtotal = o.quantity * itemRate;
    //     if (this.pageDetail.tax && this.pageDetail.tax.amount && this.pageDetail.tax.amount > 0) {
    //       let tax = (o.item_subtotal * this.pageDetail.tax.amount) / 100;
    //       o.item_total_amount = o.item_subtotal + tax;
    //     } else {
    //       o.item_total_amount = o.item_subtotal;
    //     }
    //   }
    //   return o;
    // });

  }

  onChangeBrand(event, itemObj) {
    // this.itemVendors = this.itemVendors.map((o: any) => {
    //   if (o._id == itemObj._id) {
    //     o.brand = event.target.value;
    //   }
    //   return o;
    // });

  }

  onChangeItemRate(event, itemObj) {
    // this.itemVendors = this.itemVendors.map((o: any) => {
    //   if (o._id == itemObj._id) {
    //     o.quantity = (o.quantity && o.quantity >= 0) ? o.quantity : 0;
    //     o.item_rate = (event.target.value && event.target.value >= 0) ? Number(event.target.value) : 0;
    //     o.item_subtotal = o.quantity * o.item_rate;
    //     if (this.pageDetail.tax && this.pageDetail.tax.amount && this.pageDetail.tax.amount > 0) {
    //       let tax = (o.item_subtotal * this.pageDetail.tax.amount) / 100;
    //       o.item_total_amount = o.item_subtotal + tax;
    //     } else {
    //       o.item_total_amount = o.item_subtotal;
    //     }
    //   }
    //   return o;
    // });
  }

  onClickSubmit() {
    console.log(this.vendorItemsForm.value)
    this.dialogRef.close({ option: 1, data: this.vendorItemsForm});
    // this.data.itemVendors = this.itemVendors;
    // this.onYesClick();
  }


  ngOnInit(): void {

  }

}
