import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RateComparativeVendorsComponent } from '@component/rate-comparative/rate-comparative-vendors/rate-comparative-vendors.component';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';

@Component({
  selector: 'app-vendor-rate-listing',
  templateUrl: './vendor-rate-listing.component.html',
  styleUrls: ['./vendor-rate-listing.component.scss']
})
export class VendorRateListingComponent implements OnInit {

  form = new UntypedFormGroup({
    customer: new UntypedFormControl('', [Validators.required]),
    date: new UntypedFormControl(new Date()),
    numbering_group: new UntypedFormControl('', [Validators.required])
  });
  vendorAssociatedData: Array<any> = [];
  itemVendors: any;
  pageDetail: any;
  totalInputQuantity: any = 0;


  constructor(

    private snack: SnackbarService,
    private request: RequestService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<RateComparativeVendorsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
     this.pageDetail = data.dataObj;
    this.itemVendors = data.dataObj.vendors;
    this.itemVendors = this.itemVendors.map((o: any) => {
      this.totalInputQuantity = this.totalInputQuantity + (o.quantity && o.quantity > 0) ? o.quantity : 0;
      return o;
    })

    this.data.vendorsList.map((o: any) => {
      this.vendorAssociatedData[o._id] = o;
      return o;
    });
  }


  onNoClick(): void {
    this.dialogRef.close({ option: 2, data: this.data });
  }

  onYesClick(): void {
    this.dialogRef.close({ option: 1, data: this.data });
  }




  onChangeQuantity(event, itemObj) {

    let quantity = (event.target.value && event.target.value >= 0) ? Number(event.target.value) : 0;
    let currentItemQuantity = (itemObj.quantity && itemObj.quantity >= 0) ? Number(itemObj.quantity) : 0;

    let totalInputQuantityData = (this.totalInputQuantity + quantity) - currentItemQuantity;

    if (totalInputQuantityData > this.pageDetail.qty) {
      event.target.value = currentItemQuantity;
      this.snack.notify("Total quantity cannot be greater than required quantity", 2);
      return;
    }

    this.totalInputQuantity = totalInputQuantityData;

    this.itemVendors = this.itemVendors.map((o: any) => {

      if (o._id == itemObj._id) {
        o.quantity = quantity;
        let itemRate = (o.item_rate && o.item_rate >= 0) ? o.item_rate : 0;
        o.item_subtotal = o.quantity * itemRate;
        if (this.pageDetail.tax && this.pageDetail.tax.amount && this.pageDetail.tax.amount > 0) {
          let tax = (o.item_subtotal * this.pageDetail.tax.amount) / 100;
          o.item_total_amount = o.item_subtotal + tax;
        } else {
          o.item_total_amount = o.item_subtotal;
        }
      }
      return o;
    });

  }

  onChangeBrand(event, itemObj) {
    this.itemVendors = this.itemVendors.map((o: any) => {
      if (o._id == itemObj._id) {
        o.brand = event.target.value;
      }
      return o;
    });

  }



  onClickSubmit() {
    this.data.itemVendors = this.itemVendors;
    this.onYesClick();
  }


  ngOnInit(): void {

  }

}
