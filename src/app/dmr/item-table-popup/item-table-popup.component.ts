import { Component, OnInit ,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';

@Component({
  selector: 'app-item-table-popup',
  templateUrl: './item-table-popup.component.html',
  styleUrls: ['./item-table-popup.component.scss']
})
export class ItemTablePopupComponent implements OnInit {

  itemList:any
  constructor(private snack: SnackbarService,
    private request: RequestService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<ItemTablePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) 
    { 
      this.itemList = this.data?.currentRecords;
      console.log("--item--")
      console.log(this.itemList)
    }

  ngOnInit(): void {
  }
  closeDialog() {
    this.dialogRef.close()
  }

}
