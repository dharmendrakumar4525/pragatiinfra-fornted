import { isEmpty } from 'lodash';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModifyRemarksComponent } from '../modify-remarks/modify-remarks.component';
import { RequestService } from '@services/https/request.service';
import { PROJECT_ACTIVITY_REMARK_DATA_API } from '@env/api_path';
import { SnackbarService } from '@services/snackbar/snackbar.service';

@Component({
  selector: 'app-add-remarks',
  templateUrl: './add-remarks.component.html',
  styleUrls: ['./add-remarks.component.scss']
})
export class AddRemarksComponent implements OnInit {
  today: any;
  remarksArray: any;
  constructor(
    private dialogRef: MatDialogRef<AddRemarksComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpService: RequestService,
    private _dialog: MatDialog,
    private snack: SnackbarService,
  ) {

    this.getList();
  }

  getList() {
    this.httpService.GET(PROJECT_ACTIVITY_REMARK_DATA_API, { activity_id: this.data.id }).subscribe({
      next: (res: any) => {
        this.remarksArray = res.data;

      }, error: (err) => {
        if (err.errors && !isEmpty(err.errors)) {
          let errMessage = '<ul>';
          for (let e in err.errors) {
            let objData = err.errors[e];
            errMessage += `<li>${objData[0]}</li>`;
          }
          errMessage += '</ul>';
          this.snack.notifyHtml(errMessage, 2);
        } else {
          this.snack.notify(err.message, 2);
        }
      }
    })
  }


  onNoClick(): void {
    this.dialogRef.close({ option: 2, data: this.data });
  }

  ngOnInit(): void {
    this.today = new Date().getTime()
  }


  modifyRemarks(selectedData, i) {
    const dialogRef = this._dialog.open(ModifyRemarksComponent, {
      panelClass: ['custom-modal', 'animate__animated', 'animate__fadeInDown'],
      data: { selectedData: selectedData, }
    });
    dialogRef.afterClosed().subscribe(status => {
      console.log(status);
      if (status && status.type == 1) {
        this.remarksArray.map((o) => {
          if (o._id == selectedData._id) {
            o.remark = status.data.remark;
          }
          return o;
        })
      }
      if (status === 'no') {
      }
    })
  }

}
