import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ExcelService } from '@services/export-excel/excel.service';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import { isEmpty } from 'lodash';
import { BrandAddDataComponent } from './add-data/add-data.component';
import { ToastService } from '@services/toast.service';

@Component({
  selector: 'app-brand-master',
  templateUrl: './brand-master.component.html',
  styleUrls: ['./brand-master.component.scss']
})
export class BrandMasterComponent implements OnInit {
  viewPermission: any;
  editPermission: any;
  addPermission: any;
  deletePermission: any;
  permissions:any;
  brandList:any=[];
  list:any=[];
  constructor(private router: Router,
    private httpService: RequestService,
    private excelService: ExcelService,
    private snack: SnackbarService,
    private dialog: MatDialog,
    private toast:ToastService
    ) {
      this.permissions = JSON.parse(localStorage.getItem('loginData'))
    const rolePermission = this.permissions.user.role
    const GET_ROLE_API_PERMISSION = `/roles/role/${rolePermission}`;  
      this.httpService.GET(GET_ROLE_API_PERMISSION,{}).subscribe({
        next: (resp: any) => {
          this.addPermission=resp.dashboard_permissions[0].ParentChildchecklist[12].childList[0].isSelected;
          this.editPermission=resp.dashboard_permissions[0].ParentChildchecklist[12].childList[1].isSelected;
          this.deletePermission=resp.dashboard_permissions[0].ParentChildchecklist[12].childList[2].isSelected;
          this.viewPermission=resp.dashboard_permissions[0].ParentChildchecklist[12].childList[3].isSelected;
        
        },
        error: (err) => {
          console.log(err)
        }
      });
      this.getList();
     }

  ngOnInit(): void {
  }
  getList() {
    this.httpService.GET('/brand', {}).subscribe(res => {
      if (res && res.data) {
        this.brandList = res.data;
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
  
  delete(id: any) {
    if(!this.deletePermission)
    {
      this.toast.openSnackBar('Access to Brand Master deleting is restricted for your account.');
      return;
    }
    this.httpService.DELETE('/brand', { _id: id }).subscribe(res => {
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
      this.brandList = this.list.filter(obj => obj.brand_name.toLowerCase().includes(event.target.value.toLowerCase()))
    }
    else {
      this.brandList = this.list;
    }
  }

  async exportXlSX() {
    let sheetHeaders = [
      "Brand Name	",
    ];

    let valueKey = ['brand_name'];
    let valueDataType = ['string'];
    let sheetName: any = "Brand_Name";
    this.excelService.mapArrayToExcel(sheetName, sheetHeaders, valueKey, valueDataType, this.brandList);
  }
  add() {
    if(!this.addPermission)
    {
      this.toast.openSnackBar('Access to Brand Master add is restricted for your account.');
      return;
    }
    const confirmDialogPopup = this.dialog.open(BrandAddDataComponent, {
      data: {
        list: this.list
      }
    });
    confirmDialogPopup.afterClosed().subscribe(result => {

      if (result && result['option'] === 1) {
        this.getList();
      }
    });
  }
  edit(id: any) {
    if(!this.editPermission)
    {
      this.toast.openSnackBar('Access to Brand Master editing is restricted for your account.');
      return;
    }
    const confirmDialogPopup = this.dialog.open(BrandAddDataComponent, {
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

}
