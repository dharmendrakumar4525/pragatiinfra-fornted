import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-new-role',
  templateUrl: './new-role.component.html',
  styleUrls: ['./new-role.component.css']
})
export class NewRoleComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NewRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    
  ) { }
 

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
