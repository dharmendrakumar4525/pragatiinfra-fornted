import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'VendorFilesModalComponent',
  templateUrl: './VendorFilesModal.component.html',
  styleUrls: ['./VendorFilesModal.component.css']
})
export class VendorFilesModalComponent {

  constructor(
    public dialogRef: MatDialogRef<VendorFilesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { vendorFiles: { [key: string]: string }, poNumber:string }
  ) {}

  // Helper function to get the object keys for *ngFor
  objectKeys = Object.keys;

  close(): void {
    this.dialogRef.close();
  }
}
