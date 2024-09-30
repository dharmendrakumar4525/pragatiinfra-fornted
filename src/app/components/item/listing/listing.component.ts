import { Component, OnInit, ViewChild,TemplateRef  } from '@angular/core';
import { Router } from '@angular/router';
import { ITEM_API } from '@env/api_path';
import { ExcelService } from '@services/export-excel/excel.service';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import { isEmpty } from 'lodash';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { CATEGORY_API, SUB_CATEGORY_API,GET_BRAND_API } from '@env/api_path';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ToastService } from '@services/toast.service';
import { MatDialog } from '@angular/material/dialog'; // Import MatDialog
import { AuthService } from '@services/auth/auth.service';
import { UsersService } from '@services/users.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  viewPermission: any;
  editPermission: any;
  addPermission: any;
  deletePermission: any;
  permissions: any;
  categoryList: any;
  brandList:any;
  subCategoryList: any = [];
  itemList: any = [];
  list: any;
  pageSizeOptions: number[] = [5, 10, 20];
  pageSize: number = 10;
  length = 50;
  pageIndex = 0;
  disabled = false;
  showPageSizeOptions = false;
  showFirstLastButtons = true;
  hidePageSize = false;
  pagestore = 0;


  @ViewChild('errorDialog') errorDialog: TemplateRef<any>;

  constructor(
    private router: Router,
    private httpService: RequestService,
    private excelService: ExcelService,
    private snack: SnackbarService,
    private http: HttpClient,
    private toast: ToastService,
    public dialog: MatDialog,
    private auth: AuthService,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
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
        this.addPermission = resp.dashboard_permissions[0].ParentChildchecklist[11].childList[0].isSelected;
        this.editPermission = resp.dashboard_permissions[0].ParentChildchecklist[11].childList[1].isSelected;
        this.deletePermission = resp.dashboard_permissions[0].ParentChildchecklist[11].childList[2].isSelected;
        this.viewPermission = resp.dashboard_permissions[0].ParentChildchecklist[11].childList[3].isSelected;
      },
      error: (err) => {
        console.log(err);
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
    const subCategory = this.http.get<any>(`${environment.api_path}${SUB_CATEGORY_API}`);
    const category = this.http.get<any>(`${environment.api_path}${CATEGORY_API}`);
    const brands = this.http.get<any>(`${environment.api_path}${GET_BRAND_API}`);
    this.httpService.multipleRequests([subCategory, category, brands], {}).subscribe(res => {
      if (res) {
        this.subCategoryList = res[0].data;
        console.log("Sub Category : ", this.subCategoryList);
        this.categoryList = res[1].data;
        this.brandList=res[2].data;
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
    });
    this.fetchItemList(0, this.pageSize);
    this.httpService.GET(ITEM_API, {}).subscribe(res => {
      if (res && res.data) {
        console.log(res.data);
        this.list = res.data;
        this.length = res.data.length;
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
    });
  }

  fetchItemList(page: number, pageSize: number) {
    const params = { page: page + 1, per_page: pageSize };
    this.pagestore = params.page;
    console.log("L", this.pagestore);
    this.httpService.GET(ITEM_API, params).subscribe(res => {
      console.log("res+++", res);
      if (res && res.data) {
        this.itemList = res.data;
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
    });
  }

  getCategory(id: any) {
    return this.categoryList.filter((obj: { _id: any; }) => obj._id == id)[0]?.name;
  }

  getSubCategory(id: any) {
    return this.subCategoryList.filter((obj: { _id: any; }) => obj._id == id)[0]?.subcategory_name;
  }

  getBrandNamesByIds(brandIds): string {
    if(brandIds===undefined)
    {
      return '';
    }
    console.log(brandIds);
    const brandMap = this.brandList.reduce((map, brand) => {
      map[brand._id] = brand.brand_name;
      return map;
    }, {} as Record<string, string>);

    return brandIds
      .map(id => brandMap[id])
      .filter(name => name)
      .join(' / ');
  }

  edit(id: any) {
    if (!this.editPermission) {
      this.toast.openSnackBar('Access to Item Master editing is restricted for your account.');
      return;
    }
    let url: string = "item/edit/" + id;
    console.log(url);
    this.router.navigateByUrl(url);
  }

  add() {
    if (!this.addPermission) {
      this.toast.openSnackBar('Access to Item Master add is restricted for your account.');
      return;
    }
    let url: string = "item/add";
    this.router.navigateByUrl(url);
  }

  delete(id: any) {
    if (!this.deletePermission) {
      this.toast.openSnackBar('Access to Item Master deleting is restricted for your account.');
      return;
    }
    this.httpService.DELETE(ITEM_API, { _id: id }).subscribe(res => {
      if (res) {
        this.snack.notify("Item record has been deleted successfully.", 2);
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
    });
  }

  search(event: any) {
    if (event.target.value) {
      this.itemList = this.list.filter(obj => obj.item_name.toLowerCase().includes(event.target.value.toLowerCase()));
    } else {
      this.fetchItemList(this.pagestore - 1, this.pageSize);
    }
  }

  async exportXlSX() {
    let filterReport = this.itemList.map((o: any) => {
      o.categoryName = o.categoryDetail?.name;
      o.brandName=this.getBrandNamesByIds(o.brands);
      o.subCategoryName = o.subCategoryDetail?.subcategory_name;
      o.uomName = o.uomDetail?.uom_name;
      o.gstValue = o.gstDetail?.gst_percentage;
      return o;
    });
    let sheetHeaders = [
      "Item Number",
      "Item Name",
      "Brands",
      "Category Name",
      "Sub Category Name",
      "UOM",
      "GST",
      "Specification"
    ];
    let valueKey = ['item_number',
      'item_name',
      "brandName",
      'categoryName',
      'subCategoryName',
      'uomName',
      'gstValue',
      'specification'];
    let valueDataType = ['string', 'string', 'string', 'string', 'string', 'string', 'string'];
    let sheetName: any = "Item";
    this.excelService.mapArrayToExcel(sheetName, sheetHeaders, valueKey, valueDataType, filterReport);
  }

  async exportAllXlSX() {
    let filterReport = this.list.map((o: any) => {
      o.categoryName = o.categoryDetail?.name;
      o.subCategoryName = o.subCategoryDetail?.subcategory_name;
      o.uomName = o.uomDetail?.uom_name;
      o.gstValue = o.gstDetail?.gst_percentage;
      return o;
    });
    let sheetHeaders = [
      "Item Number",
      "Item Name",
      "Category Name",
      "Sub Category Name",
      "UOM",
      "GST",
      "Specification"
    ];
    let valueKey = ['item_number',
      'item_name',
      'categoryName',
      'subCategoryName',
      'uomName',
      'gstValue',
      'specification'];
    let valueDataType = ['string', 'string', 'string', 'string', 'string', 'string', 'string'];
    let sheetName: any = "Item";
    this.excelService.mapArrayToExcel(sheetName, sheetHeaders, valueKey, valueDataType, filterReport);
  }

  onPageChange(event: PageEvent) {
    console.log(event);
    this.fetchItemList(event.pageIndex, event.pageSize);
  }

  importFile(event: any) {
    const file = event.target.files[0];
    if (!file) return;
console.log("deaw",file);
    const formData = new FormData();
    formData.append('file', file);

    console.log(formData);

    this.http.post(`${environment.api_path}/item/upload-csv`, formData).subscribe({
      next: (res: any) => {
        this.snack.notify('File imported successfully!', 1);
        this.getList();
      },
      error: (err) => {
        console.log("Error:", err.error.message);
        const message = err.error.message;

        // Remove the leading part of the message and split by commas
        const errorParts = message
          .replace('Errors encountered during processing:', '') // Remove the leading message
          .split(',')  // Split by commas
          .map(error => `<li>${error.trim()}</li>`)  // Trim and format each error
          .join('');

        const errorHtml = `<ul>${errorParts}</ul>`;
        this.showErrorDialog(errorHtml);
      }
    });
  }

  showErrorDialog(message: string) {
    console.log(message);
    this.dialog.open(this.errorDialog, {
      data: { message: message }
    });
  }

}
