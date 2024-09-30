import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RateComparativeVendorsComponent } from '@component/rate-comparative/rate-comparative-vendors/rate-comparative-vendors.component';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
@Component({
  selector: 'app-vendor-rate-listing',
  templateUrl: './vendor-rate-listing.component.html',
  styleUrls: ['./vendor-rate-listing.component.scss']
})
export class VendorRateListingComponent implements OnInit {

 
  item:any;
  vendorItems:any;
  fetchedVendorList:any;
  totalQuantity=0;
  VendorRate = new Map<string, any>();
  pageData:any;
 

  constructor(
    private formBuilder: FormBuilder,
    private snack: SnackbarService,
    private request: RequestService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<RateComparativeVendorsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.item=data.item;
      this.vendorItems=data.vendorItems
      this.fetchedVendorList=data.fetchedVendorList
      this.pageData=data.pageData
      console.log(this.pageData)
      if(this.pageData && this.pageData.VendorRate && this.pageData.totalQuantity)
      {
        // console.log(this.pageData)
        this.pageData.VendorRate.forEach((value, key) => {
          this.VendorRate.set(key, value);
        });
        // this.VendorRate=this.pageData.VendorRate,
        this.totalQuantity=Number(this.pageData.totalQuantity)
      }
     
  }

  selected: boolean = false;
  onNoClick(): void {
    this.dialogRef.close({ option: 2, data: this.data });
  }

  onYesClick(): void {
    // console.log(this.VendorRate)
    let result:any[]=[];
    this.VendorRate.forEach((value, key) => {
      result.push(value)
      // console.log(key, value);
    });
    // console.log(result)
    this.dialogRef.close({ option: 1, data: {VendorRate:this.VendorRate,totalQuantity:this.totalQuantity}});
  }
  handleCheckboxChange(i:any,j:any,obj,vendorDetails){
      let key=i+"$"+j;
      if(this.VendorRate.has(key))
        this.deleteVendor(key,obj,vendorDetails);
      else 
        this.addVendor(key,obj,vendorDetails);
  }
  addVendor(key:any,obj,vendorDetails)
  {
    // let obj={

    // }
    console.log(obj)
    this.totalQuantity+=Number(obj.RequiredQuantity);
    obj["vendor"]=vendorDetails
    this.VendorRate.set(key,obj)

    
  }
  deleteVendor(key:any,obj,vendorDetails){
    this.totalQuantity-=obj.RequiredQuantity;
    this.VendorRate.delete(key)
    
  }
  check(obj,item,totalQuantity)
  {
    console.log(item.qty)
    console.log(totalQuantity)
    return (totalQuantity+Number(obj.RequiredQuantity))>item.qty
  }
 
  findVendor(id:any)
  {
  
    return this.fetchedVendorList.find(obj=> obj._id==id);
  }
 



  onClickSubmit() {
    this.onYesClick();
  }


  ngOnInit(): void {

  }

}
