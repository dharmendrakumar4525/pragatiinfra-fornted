import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CATEGORY_API, ORG_REQUEST_API, VENDOR_API, SUB_CATEGORY_API } from '@env/api_path';
import { ExcelService } from '@services/export-excel/excel.service';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import { isEmpty } from 'lodash';
import { BehaviorSubject } from 'rxjs';
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
  viewPermission: any;
  editPermission: any;
  addPermission: any;
  deletePermission: any;
  permissions: any;
  vendorList: any = [];
  categoryList: any = [];
  list: any = [];
  errorList:string;
  subCategoryList: any = [];
  dataReadySubject = new BehaviorSubject<boolean>(false);
  selectedFile: File | null = null;

  @ViewChild('errorDialog') errorDialog: TemplateRef<any>; // ViewChild for the error dialog template

  constructor(
    private router: Router,
    private httpService: RequestService,
    private excelService: ExcelService,
    private snack: SnackbarService,
    private toast: ToastService,
    public dialog: MatDialog, // Inject MatDialog
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
        this.addPermission = resp.dashboard_permissions[0].ParentChildchecklist[15].childList[0].isSelected;
        this.editPermission = resp.dashboard_permissions[0].ParentChildchecklist[15].childList[1].isSelected;
        this.deletePermission = resp.dashboard_permissions[0].ParentChildchecklist[15].childList[2].isSelected;
        this.viewPermission = resp.dashboard_permissions[0].ParentChildchecklist[15].childList[3].isSelected;
      },
      error: (err) => {
        this.showErrorDialog(err.message);
      }
    });
    this.httpService.GET(CATEGORY_API, {}).subscribe(res => {
      this.categoryList = res.data;
    }, (err) => {
      if (err.errors && !isEmpty(err.errors)) {
        let errMessage = '<ul>';
        for (let e in err.errors) {
          let objData = err.errors[e];
          errMessage += `<li>${objData[0]}</li>`;
        }
        errMessage += '</ul>';
        this.showErrorDialog(errMessage);
      } else {
        this.showErrorDialog(err.message);
      }
    });
    this.httpService.GET(SUB_CATEGORY_API, {}).subscribe(res => {
      this.subCategoryList = res.data;
      this.dataReadySubject.next(true);
    }, (err) => {
      if (err.errors && !isEmpty(err.errors)) {
        let errMessage = '<ul>';
        for (let e in err.errors) {
          let objData = err.errors[e];
          errMessage += `<li>${objData[0]}</li>`;
        }
        errMessage += '</ul>';
        this.showErrorDialog(errMessage);
      } else {
        this.showErrorDialog(err.message);
      }
    });
    this.dataReadySubject.subscribe((dataReady) => {
      if (dataReady) {
        this.getList();
      }
    });
  } else {
    this.snack.notify('Invalid Credentials - User Details not Valid', 1);
    this.auth.removeUser();
    this.userService.updateLogin('logout');
    this.router.navigate(['/login']);
  }
});
  }

  getList() {
    this.httpService.GET(VENDOR_API, {}).subscribe(res => {
      if (res && res.data) {
        this.vendorList = res.data;
        this.vendorList.map((obj: any) => {
          obj.category = this.getCategory(obj.category);
          obj.SubCategory = this.getSubCategory(obj.SubCategory);
          return obj;
        });
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
        this.showErrorDialog(errMessage);
      } else {
        this.showErrorDialog(err.message);
      }
    });
  }

  edit(id: any) {
    if (!this.editPermission) {
      this.toast.openSnackBar('Access to Vendor Master editing is restricted for your account.');
      return;
    }
    let url: string = "vendor/edit/" + id;
    this.router.navigateByUrl(url);
  }

  add() {
    if (!this.addPermission) {
      this.toast.openSnackBar('Access to Vendor Master add is restricted for your account.');
      return;
    }
    let url: string = "vendor/add";
    this.router.navigateByUrl(url);
  }

  delete(id: any) {
    if (!this.deletePermission) {
      this.toast.openSnackBar('Access to Vendor Master deleting is restricted for your account.');
      return;
    }
    this.httpService.DELETE(VENDOR_API, { _id: id }).subscribe(res => {
      if (res) {
        this.snack.notify("Vendor record has been deleted successfully.", 1);
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
        this.showErrorDialog(errMessage);
      } else {
        this.showErrorDialog(err.message);
      }
    });
  }

  getCategory(ids: any) {
    var finalName = [];
    Object.values(ids).forEach((id: string) => {
      const category = this.categoryList.find((element: any) => element._id === id);
      if (category) {
        finalName.push(category.name);
      }
    });
    return finalName.join(",");
  }

  getSubCategory(ids: any) {
    var finalName = [];
    Object.values(ids).forEach((id: string) => {
      const subCategory = this.subCategoryList.find((element: any) => element._id === id);
      if (subCategory) {
        finalName.push(subCategory.subcategory_name);
      }
    });
    return finalName.join(",");
  }

  search(event: any) {
    if (event.target.value) {
      this.vendorList = this.list.filter(obj => obj.vendor_name.toLowerCase().includes(event.target.value.toLowerCase()));
    } else {
      this.vendorList = this.list;
    }
  }

  async exportXlSX() {
    let filterReport = this.vendorList.map((o: any) => {
      o.vendor_phone_number = `${o.dialcode}-${o.phone_number}`;
      let address = [];
      if (o.address) {
        if (o.address.street_address) {
          address.push(o.address.street_address);
        }
        if (o.address.street_address2) {
          address.push(o.address.street_address2);
        }
        if (o.address.city) {
          address.push(o.address.city);
        }
        if (o.address.state) {
          address.push(o.address.state);
        }
        if (o.address.country) {
          address.push(o.address.country);
        }
        if (o.address.zip_code) {
          address.push(o.address.zip_code);
        }
      }
      o.address2 = address.join(", ");
      return o;
    });
    let sheetHeaders = [
      "Vendor Name",
      "Category",
      "Sub Category",
      "Contact Person",
      "Phone Number",
      "GST Number",
      "PAN Number",
      "Email",
      "Payment Term",
      "Term & Condtiion",
      "Address"
    ];
    let valueKey = ['vendor_name', 'category', 'SubCategory', 'contact_person', 'vendor_phone_number', 'gst_number', 'pan_number', 'email', 'payment_terms', 'terms_condition', 'address2'];
    let valueDataType = ['string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string'];
    let sheetName: any = "vendors";
    this.excelService.mapArrayToExcel(sheetName, sheetHeaders, valueKey, valueDataType, filterReport);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.importFile();
    }
  }

  importFile() {
    if (!this.selectedFile) {
      this.showErrorDialog("Please select a file before importing.");
      return;
    }
  
    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    
    this.httpService.POST('/vendor/upload-csv', formData).subscribe(res => {
      if (res && res.data) {
        console.log(res);
        const errors = res.data.errors;
        
        if (errors && errors.length > 0) {
          // Create error list HTML
          let errorMessage = '<ul>';
          errors.forEach((error: any) => {
            errorMessage += `<li>${error.error}</li>`;
          });
          errorMessage += '</ul>';
  
          // Show errors in dialog
          this.showErrorDialog(errorMessage);
          this.getList();
        } else {
          // Notify success
          this.snack.notify("Vendor list has been uploaded successfully.", 1);
          this.getList();
        }
      }
    }, (err) => {
      this.showErrorDialog(err.message);
     console.log(err);
    });
  }
  

  showErrorDialog(message: string) {
    console.log(message);
    this.dialog.open(this.errorDialog, {
      data: { message: message }
    });
  }

  ngOnInit(): void { }
}
