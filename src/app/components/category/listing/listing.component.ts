import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CATEGORY_API } from '@env/api_path';
import { ExcelService } from '@services/export-excel/excel.service';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import { isEmpty } from 'lodash';
import { ToastService } from '@services/toast.service';
import { AuthService } from '@services/auth/auth.service';
import { UsersService } from '@services/users.service';
@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})
export class ListingComponent implements OnInit {
  viewPermission: any;
  editPermission: any;
  addPermission: any;
  deletePermission: any;
  permissions: any;
  categoryList: any = [];
  list: any = [];
  constructor(
    private router: Router,
    private httpService: RequestService,
    private excelService: ExcelService,
    private snack: SnackbarService,
    private route: ActivatedRoute,
    private toast: ToastService,
    private auth: AuthService,
    private userService: UsersService
  ) {
    this.permissions = JSON.parse(localStorage.getItem('loginData'));
    this.userService.getUserss().subscribe((users) => {
      const currentUser = users.find(
        (user) => user._id === this.permissions.user._id
      );

      if (currentUser) {
        const rolePermission = this.permissions.user.role;
        const GET_ROLE_API_PERMISSION = `/roles/role/${rolePermission}`;
        this.httpService.GET(GET_ROLE_API_PERMISSION, {}).subscribe({
          next: (resp: any) => {
            this.addPermission =
              resp.dashboard_permissions[0].ParentChildchecklist[16].childList[0].isSelected;
            this.editPermission =
              resp.dashboard_permissions[0].ParentChildchecklist[16].childList[1].isSelected;
            this.deletePermission =
              resp.dashboard_permissions[0].ParentChildchecklist[16].childList[2].isSelected;
            this.viewPermission =
              resp.dashboard_permissions[0].ParentChildchecklist[16].childList[3].isSelected;
          },
          error: (err) => {
            console.log(err);
          },
        });
        this.getList();
      } else {
        this.snack.notify('Invalid Credentials - User Details not Valid', 2);
        this.auth.removeUser();
        this.userService.updateLogin('logout');
        this.router.navigate(['/login']);
      }
    });
  }

  getList() {
    this.httpService.GET(CATEGORY_API, {}).subscribe(
      (res) => {
        if (res && res.data) {
          this.categoryList = res.data;
          this.list = res.data;
        }
      },
      (err) => {
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
    );
  }

  edit(id: any) {
    if (!this.editPermission) {
      this.toast.openSnackBar(
        'Access to Category Master editing is restricted for your account.'
      );
      return;
    }
    let url: string = 'category/edit/' + id;
    console.log(url);

    this.router.navigateByUrl(url);
  }

  add() {
    if (!this.addPermission) {
      this.toast.openSnackBar(
        'Access to Category Master add is restricted for your account.'
      );
      return;
    }
    let url: string = 'category/add';
    this.router.navigateByUrl(url);
  }

  delete(id: any) {
    if (!this.deletePermission) {
      this.toast.openSnackBar(
        'Access to Category Master deleting is restricted for your account.'
      );
      return;
    }
    this.httpService.DELETE(CATEGORY_API, { _id: id }).subscribe(
      (res) => {
        if (res) {
          this.snack.notify(' record has been deleted sucessfully.', 1);
          this.getList();
        }
      },
      (err) => {
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
    );
  }

  search(event: any) {
    if (event.target.value) {
      this.categoryList = this.list.filter((obj) =>
        obj.name.toLowerCase().includes(event.target.value.toLowerCase())
      );
    } else {
      this.categoryList = this.list;
    }
  }

  async exportXlSX() {
    let sheetHeaders = ['Category Name	', 'Code'];

    let valueKey = ['name', 'code'];
    let valueDataType = ['string', 'string'];
    let sheetName: any = 'Category';
    this.excelService.mapArrayToExcel(
      sheetName,
      sheetHeaders,
      valueKey,
      valueDataType,
      this.categoryList
    );
  }

  ngOnInit(): void {}
}
