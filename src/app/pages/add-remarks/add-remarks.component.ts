import { isEmpty } from 'lodash';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModifyRemarksComponent } from '../modify-remarks/modify-remarks.component';
import { RequestService } from '@services/https/request.service';
import { PROJECT_ACTIVITY_REMARK_DATA_API } from '@env/api_path';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import { NoPermissionsComponent } from '../no-permissions/no-permissions.component';
import { AuthService } from '@services/auth/auth.service';
import { UsersService } from '@services/users.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-remarks',
  templateUrl: './add-remarks.component.html',
  styleUrls: ['./add-remarks.component.scss']
})
export class AddRemarksComponent implements OnInit {
  today: any;
  permissions:any;
  editRemarksPermissions:any;
  remarksArray: any;
  constructor(
    private dialogRef: MatDialogRef<AddRemarksComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpService: RequestService,
    private _dialog: MatDialog,
    private snack: SnackbarService,
    private auth: AuthService,
    private userService: UsersService,
    private router: Router
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
    this.permissions = JSON.parse(localStorage.getItem('loginData'))
    this.userService.getUserss().subscribe((users) => {
      const currentUser = users.find(
        (user) => user._id === this.permissions.user._id
      );

      if (currentUser) {
    this.editRemarksPermissions = this.permissions.permissions[0]?.ParentChildchecklist[2]?.childList[0];
  } else {
    this.snack.notify('Invalid Credentials - User Details not Valid', 1);
    this.auth.removeUser();
    this.userService.updateLogin('logout');
    this.router.navigate(['/login']);
  }
});
  }


  modifyRemarks(selectedData, i) {
    if (!this.editRemarksPermissions?.isSelected) {
      const dialogRef = this._dialog.open(NoPermissionsComponent, {
        width: '30%',
        panelClass: ['custom-modal', 'animate__animated', 'animate__fadeInDown'],
        data: "you don't have permissions to update Remarks"
        //data: supply
      });
      return;
    }
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
