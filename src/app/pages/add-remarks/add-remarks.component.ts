import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModifyRemarksComponent } from '../modify-remarks/modify-remarks.component';

@Component({
  selector: 'app-add-remarks',
  templateUrl: './add-remarks.component.html',
  styleUrls: ['./add-remarks.component.css']
})
export class AddRemarksComponent implements OnInit {
  today:any;
  constructor(
    private dialogRef: MatDialogRef<AddRemarksComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.today = new Date().getTime()
  }


  modifyRemarks(selectedData, i){
    const dialogRef = this._dialog.open(ModifyRemarksComponent, {
      width: '30%',
      panelClass: ['custom-modal', 'animate__animated', 'animate__fadeInDown'],
      data: {allData:this.data.reDate,selectedData:selectedData,index:i,id:this.data.id}
    });
    dialogRef.afterClosed().subscribe(status => {
      console.log(status);
      if (status === 'yes') {
      }
      if (status === 'no') {
      }
    })
  }

}
