import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-new-permission',
  templateUrl: './new-permission.component.html',
  styleUrls: ['./new-permission.component.css']
})
export class NewPermissionComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NewPermissionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
