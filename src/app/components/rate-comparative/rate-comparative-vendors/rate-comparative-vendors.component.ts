import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-rate-comparative-vendors',
  templateUrl: './rate-comparative-vendors.component.html',
  styleUrls: ['./rate-comparative-vendors.component.scss']
})
export class RateComparativeVendorsComponent implements OnInit {
  formSubmitted: boolean = false;
  vendorItemsForm: FormGroup;
  showVendorRate: boolean = false;
  vendorRates: any[] = [];
  load: boolean = false;

  constructor(
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<RateComparativeVendorsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    // Initialize form and data as per your existing logic
  }

  ngOnInit(): void {
    // Initialization logic
  }

  onSave(): void {
    if (this.vendorItemsForm.valid) {
      // Collect data and perform save operation
      this.showVendorRate = true; // Show the vendor rate component
      this.vendorRates = this.calculateVendorRates(); // Example function to populate vendor rates
    } else {
      this._snackBar.open('Please fill all the required fields', 'Close', { duration: 3000 });
    }
  }

  calculateVendorRates(): any[] {
    // Logic to calculate vendor rates
    return [];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
