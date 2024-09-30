import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SITE_API } from '@env/api_path';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import { ExcelService } from '@services/export-excel/excel.service';
import { isEmpty } from 'lodash';
import { ToastService } from '@services/toast.service';
import { AuthService } from '@services/auth/auth.service';
import { UsersService } from '@services/users.service';
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
  permissions:any;
  siteList: any = [];
  list: any = [];
  constructor(
    private router: Router,
    private httpService: RequestService,
    private excelService: ExcelService,
    private snack: SnackbarService,
    private toast:ToastService,
    private auth: AuthService,
    private userService: UsersService
  ) {
    this.permissions = JSON.parse(localStorage.getItem('loginData'))
    this.userService.getUserss().subscribe((users) => {
      const currentUser = users.find(
        (user) => user._id === this.permissions.user._id
      );

      if (currentUser) {
    const rolePermission = this.permissions.user.role
    const GET_ROLE_API_PERMISSION = `/roles/role/${rolePermission}`;  
      this.httpService.GET(GET_ROLE_API_PERMISSION,{}).subscribe({
        next: (resp: any) => {
          this.addPermission=resp.dashboard_permissions[0].ParentChildchecklist[14].childList[0].isSelected;
          this.editPermission=resp.dashboard_permissions[0].ParentChildchecklist[14].childList[1].isSelected;
          this.deletePermission=resp.dashboard_permissions[0].ParentChildchecklist[14].childList[2].isSelected;
          this.viewPermission=resp.dashboard_permissions[0].ParentChildchecklist[14].childList[3].isSelected;
        
        },
        error: (err) => {
          console.log(err)
        }
      });
    this.getList();
  } else {
    this.snack.notify('Invalid Credentials - User Details not Valid', 1);
    this.auth.removeUser();
    this.userService.updateLogin('logout');
    this.router.navigate(['/login']);
  }
});
  }

  getList() {
    this.httpService.GET(SITE_API, {}).subscribe(res => {
      if (res && res.data) {
        this.siteList = res.data;
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
    console.log(id,"Id");
    if(!this.editPermission)
    {
      this.toast.openSnackBar('Access to Site Master editing is restricted for your account.');
      return;
    }
    let url: string = "site/edit/" + id
    console.log(url);

    this.router.navigateByUrl(url);
  }

  add() {
    if(!this.addPermission)
    {
      this.toast.openSnackBar('Access to Site Master add is restricted for your account.');
      return;
    }
    let url: string = "site/add"
    this.router.navigateByUrl(url);
  }

  delete(id: any) {
    if(!this.deletePermission)
    {
      this.toast.openSnackBar('Access to Site Master deleting is restricted for your account.');
      return;
    }
    this.httpService.DELETE(SITE_API, { _id: id }).subscribe(res => {
      if (res) {
        this.snack.notify("site record has been deleted sucessfully.", 1);
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
      this.siteList = this.list.filter(obj => obj.site_name.toLowerCase().includes(event.target.value.toLowerCase()))
    }
    else {
      this.siteList = this.list;
    }
  }

  async exportXlSX() {

    let filterReport = this.siteList.map((o: any) => {
      o.store_manager_number = `${o.store_manager_phone_number_dialcode}-${o.store_manager_phone_number}`;
      let address = [];
      if (o.address) {
        if (o.address.street_address) {
          address.push(o.address.street_address)
        }
        if (o.address.street_address2) {
          address.push(o.address.street_address2)
        }
        if (o.address.city) {
          address.push(o.address.city)
        }
        if (o.address.state) {
          address.push(o.address.state)
        }
        if (o.address.country) {
          address.push(o.address.country)
        }
        if (o.address.zip_code) {
          address.push(o.address.zip_code)
        }
      }

      o.address2 = address.join(", ");
      return o;
    })

    let sheetHeaders = [
      "Locaton",
      "Site Name	",
      "Code",
      "Store Manager	",
      "Store Manager Number",
      "Store Manager Email",
      "Address"
    ];

    let valueKey = ['location', 'site_name', 'code', 'store_manager', 'store_manager_number', 'site_manager_email', 'address2'];
    let valueDataType = ['string', 'string', 'string', 'string', 'string', 'string', 'string'];
    let sheetName: any = "sites";
    this.excelService.mapArrayToExcel(sheetName, sheetHeaders, valueKey, valueDataType, filterReport);
  }


  ngOnInit(): void {
  }

}
