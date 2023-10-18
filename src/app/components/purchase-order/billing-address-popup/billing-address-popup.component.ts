import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-billing-address-popup',
  templateUrl: './billing-address-popup.component.html',
  styleUrls: ['./billing-address-popup.component.scss']
})
export class BillingAddressPopupComponent implements OnInit {
  addForm = new FormGroup({
    address: new FormGroup({
      company_name: new FormControl('', Validators.required),
      gst_number: new FormControl(''),
      pan_card: new FormControl(''),
      street_address: new FormControl('', Validators.required),
      street_address2: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      zip_code: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
    })
  });
  constructor(
    private dialogRef: MatDialogRef<BillingAddressPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  }

  addAddress() {
    if (this.addForm.valid) {
      this.dialogRef.close({ data: this.addForm.value.address, type: 1 });
    }

  }

  closeDialog() {
    this.dialogRef.close({ type: 0, data: "" })
  }
}
