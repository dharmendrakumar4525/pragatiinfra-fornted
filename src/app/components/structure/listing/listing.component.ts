import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { STRUCTURE_API } from '@env/api_path';
import { ExcelService } from '@services/export-excel/excel.service';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import { AddDataComponent } from '../add-data/add-data.component';
import { isEmpty } from 'lodash';
import { ToastService } from '@services/toast.service';
@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
  viewPermission: any;
  editPermission: any;
  addPermission: any;
  deletePermission: any;
  structureList: any = [];
  list: any = [];
  permissions:any;
  constructor(
    private router: Router,
    private httpService: RequestService,
    private excelService: ExcelService,
    private snack: SnackbarService,
    private dialog: MatDialog,
    private toast:ToastService,
  ) {
    this.permissions = JSON.parse(localStorage.getItem('loginData'))
    const rolePermission = this.permissions.user.role
    const GET_ROLE_API_PERMISSION = `/roles/role/${rolePermission}`;  
      this.httpService.GET(GET_ROLE_API_PERMISSION,{}).subscribe({
        next: (resp: any) => {
          this.addPermission=resp.dashboard_permissions[0].ParentChildchecklist[6].childList[0].isSelected;
          this.editPermission=resp.dashboard_permissions[0].ParentChildchecklist[6].childList[1].isSelected;
          this.deletePermission=resp.dashboard_permissions[0].ParentChildchecklist[6].childList[2].isSelected;
          this.viewPermission=resp.dashboard_permissions[0].ParentChildchecklist[6].childList[3].isSelected;
        },
        error: (err) => {
          console.log(err)
        }
      });
    this.getList();
  }

  getList() {
    this.httpService.GET(STRUCTURE_API, {}).subscribe(res => {
      if (res && res.data) {
        this.structureList = res.data;
        this.list = res.data;
      }
    }, (err) => {
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

    })
  }

  edit(id: any) {
    if(!this.editPermission)
    {
      this.toast.openSnackBar('Access to Activity Master editing is restricted for your account.');
      return;
    }
    const confirmDialogPopup = this.dialog.open(AddDataComponent, {
      data: {
        id: id
      }
    });
    confirmDialogPopup.afterClosed().subscribe(result => {

      if (result && result['option'] === 1) {
        this.getList();
      }
    });
  }

  add() {
    if(!this.addPermission)
    {
      this.toast.openSnackBar('Access to Activity Master add is restricted for your account.');
      return;
    }
    const confirmDialogPopup = this.dialog.open(AddDataComponent, {
    });
    confirmDialogPopup.afterClosed().subscribe(result => {

      if (result && result['option'] === 1) {
        this.getList();
      }
    });
  }

  delete(id: any) {
    if(!this.deletePermission)
    {
      this.toast.openSnackBar('Access to Activity Master deleting is restricted for your account.');
      return;
    }
    this.httpService.DELETE(STRUCTURE_API, { _id: id }).subscribe(res => {
      if (res) {
        this.snack.notify(" record has been deleted sucessfully.", 1);
        this.getList();
      }
    }, (err) => {
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

    })
  }

  search(event: any) {
    if (event.target.value) {
      this.structureList = this.list.filter(obj => obj.structure_name.toLowerCase().includes(event.target.value.toLowerCase()))
    }
    else {
      this.structureList = this.list;
    }
  }

  async exportXlSX() {
    let sheetHeaders = [
      "Structure Name	",
    ];

    let valueKey = ['structure_name'];
    let valueDataType = ['string'];
    let sheetName: any = "Structure";
    this.excelService.mapArrayToExcel(sheetName, sheetHeaders, valueKey, valueDataType, this.structureList);
  }

  ngOnInit(): void {
  }

}
