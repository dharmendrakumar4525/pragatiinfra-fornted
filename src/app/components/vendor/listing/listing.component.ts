// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { RequestService } from '@services/https/request.service';
// import { SnackbarService } from '@services/snackbar/snackbar.service';
// import { ExcelService } from '@services/export-excel/excel.service';
// import { isEmpty } from 'lodash';
// import { CATEGORY_API, ORG_REQUEST_API, VENDOR_API,SUB_CATEGORY_API} from '@env/api_path';

// @Component({
//   selector: 'app-listing',
//   templateUrl: './listing.component.html',
//   styleUrls: ['./listing.component.scss']
// })
// export class ListingComponent implements OnInit {
//   vendorList: any = [];
//   paginatedVendorList: any = [];
//   currentPage: number = 1;
//   pageSize: number = 10; // Change this value as per your requirement
//   totalPages: number = 0;

//   constructor(
//     private router: Router,
//     private httpService: RequestService,
//     private excelService: ExcelService,
//     private snack: SnackbarService,
//   ) {}

//   ngOnInit(): void {
//     this.getList();
//   }

//   getList() {
//     this.httpService.GET(VENDOR_API, {}).subscribe(res => {
//       if (res && res.data) {
//         this.vendorList = res.data;
//         this.totalPages = Math.ceil(this.vendorList.length / this.pageSize);
//         this.paginateList();
//       }
//     }, (err) => {
//       // Handle errors
//     })
//   }

//   paginateList() {
//     const startIndex = (this.currentPage - 1) * this.pageSize;
//     const endIndex = Math.min(startIndex + this.pageSize, this.vendorList.length);
//     this.paginatedVendorList = this.vendorList.slice(startIndex, endIndex);
//   }

//   previousPage() {
//     if (this.currentPage > 1) {
//       this.currentPage--;
//       this.paginateList();
//     }
//   }

//   nextPage() {
//     if (this.currentPage < this.totalPages) {
//       this.currentPage++;
//       this.paginateList();
//     }
//   }

//   add() {
//     let url: string = "vendor/add"
//     this.router.navigateByUrl(url);
//   }

//   delete(id: any) {
//     this.httpService.DELETE(VENDOR_API, { _id: id }).subscribe(res => {
//       if (res) {
//         this.snack.notify("vendor record has been deleted successfully.", 1);
//         this.getList();
//       }
//     }, (err) => {
//       if (err.errors && !isEmpty(err.errors)) {
//         let errMessage = '<ul>';
//         for (let e in err.errors) {
//           let objData = err.errors[e];
//           errMessage += `<li>${objData[0]}</li>`;
//         }
//         errMessage += '</ul>';
//         this.snack.notifyHtml(errMessage, 2);
//       } else {
//         this.snack.notify(err.message, 2);
//       }
//     })
//   }

//   search(event: any) {
//     if (event.target.value) {
//       this.paginatedVendorList = this.vendorList.filter(obj => obj.vendor_name.toLowerCase().includes(event.target.value.toLowerCase()))
//     } else {
//       this.getList();
//     }
//   }

//   async exportXlSX() {
//     let filterReport = this.vendorList.map((o: any) => {
//       o.vendor_phone_number = `${o.dialcode}-${o.phone_number}`;
//       let address = [];
//       if (o.address) {
//         if (o.address.street_address) {
//           address.push(o.address.street_address)
//         }
//         if (o.address.street_address2) {
//           address.push(o.address.street_address2)
//         }
//         if (o.address.city) {
//           address.push(o.address.city)
//         }
//         if (o.address.state) {
//           address.push(o.address.state)
//         }
//         if (o.address.country) {
//           address.push(o.address.country)
//         }
//         if (o.address.zip_code) {
//           address.push(o.address.zip_code)
//         }
//       }
//       o.address2 = address.join(", ");
//       return o;
//     })

//     let sheetHeaders = [
//       "Vendor Name",
//       "Category",
//       "Sub Category",
//       "Contact Person",
//       "Phone Number",
//       "GST Number",
//       "PAN Number",
//       "Email",
//       "Payment Term",
//       "Term & Condition",
//       "Address"
//     ];

//     let valueKey = ['vendor_name',
//       'category',
//       'SubCategory',
//       'contact_person',
//       'vendor_phone_number',
//       'gst_number',
//       'pan_number',
//       'email',
//       'payment_terms',
//       'terms_condition', // Removed extra comma
//       'address2'];
//     let valueDataType = ['string', 'string', 'string','string',  'string', 'string', 'string', 'string', 'string', 'string', 'string'];
//     let sheetName: any = "sites";
//     this.excelService.mapArrayToExcel(sheetName, sheetHeaders, valueKey, valueDataType, filterReport);
//   }
// }



import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CATEGORY_API, ORG_REQUEST_API, VENDOR_API,SUB_CATEGORY_API} from '@env/api_path';
import { ExcelService } from '@services/export-excel/excel.service';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import { isEmpty } from 'lodash';
import { BehaviorSubject } from 'rxjs';
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
  permissions:any;
  vendorList: any = [];
  categoryList: any = [];
  list: any = [];
  subCategoryList:any=[];
  dataReadySubject = new BehaviorSubject<boolean>(false);
  constructor(
    private router: Router,
    private httpService: RequestService,
    private excelService: ExcelService,
    private snack: SnackbarService,
    private toast:ToastService
  ) {
    this.permissions = JSON.parse(localStorage.getItem('loginData'))
    const rolePermission = this.permissions.user.role
    const GET_ROLE_API_PERMISSION = `/roles/role/${rolePermission}`;  
      this.httpService.GET(GET_ROLE_API_PERMISSION,{}).subscribe({
        next: (resp: any) => {
          this.addPermission=resp.dashboard_permissions[0].ParentChildchecklist[15].childList[0].isSelected;
          this.editPermission=resp.dashboard_permissions[0].ParentChildchecklist[15].childList[1].isSelected;
          this.deletePermission=resp.dashboard_permissions[0].ParentChildchecklist[15].childList[2].isSelected;
          this.viewPermission=resp.dashboard_permissions[0].ParentChildchecklist[15].childList[3].isSelected;
        
        },
        error: (err) => {
          console.log(err)
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
        this.snack.notifyHtml(errMessage, 2);
      } else {
        this.snack.notify(err.message, 2);
      }
    })
    this.httpService.GET(SUB_CATEGORY_API, {}).subscribe(res => {
      this.subCategoryList = res.data;
      this.dataReadySubject.next(true);
      //this.subCategoryList=this.AllSubCategoryList;
      //console.log(this.subCategoryList)
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
    this.dataReadySubject.subscribe((dataReady) => {
      if(dataReady){
        this.getList();
      }})
  }
  getList() {
    this.httpService.GET(VENDOR_API, {}).subscribe(res => {
      if (res && res.data) {
        this.vendorList = res.data;
    console.log("kjjhv")
        console.log(res.data)
        this.vendorList.map((obj: any) => {
          obj.category = this.getCategory(obj.category);
          obj.SubCategory=this.getSubCategory(obj.SubCategory);
          return obj;
        }
        )
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
      this.toast.openSnackBar('Access to Vendor Master editing is restricted for your account.');
      return;
    }
    let url: string = "vendor/edit/" + id
    console.log(url);

    this.router.navigateByUrl(url);
  }
  add() {
    if(!this.addPermission)
    {
      this.toast.openSnackBar('Access to Vendor Master add is restricted for your account.');
      return;
    }
    let url: string = "vendor/add"
    this.router.navigateByUrl(url);
  }
  delete(id: any) {
    if(!this.deletePermission)
    {
      this.toast.openSnackBar('Access to Vendor Master deleting is restricted for your account.');
      return;
    }
    this.httpService.DELETE(VENDOR_API, { _id: id }).subscribe(res => {
      if (res) {
        this.snack.notify("vendor record has been deleted sucessfully.", 1);
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
  getCategory(ids: any) {
    console.log("wfjhfgjhg");
    console.log(ids);
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
      this.vendorList = this.list.filter(obj => obj.vendor_name.toLowerCase().includes(event.target.value.toLowerCase()))
    }
    else {
      this.vendorList = this.list;
    }
  }
  async exportXlSX() {
    let filterReport = this.vendorList.map((o: any) => {
      o.vendor_phone_number = `${o.dialcode}-${o.phone_number}`;
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
    let valueKey = ['vendor_name',
      'category',
      'SubCategory',
      'contact_person',
      'vendor_phone_number',
      'gst_number',
      'pan_number',
      'email',
      'payment_terms',
      , 'terms_condition', 'address2'];
    let valueDataType = ['string', 'string', 'string','string',  'string', 'string', 'string', 'string', 'string', 'string', 'string'];
    let sheetName: any = "sites";
    this.excelService.mapArrayToExcel(sheetName, sheetHeaders, valueKey, valueDataType, filterReport);
  }
  ngOnInit(): void {
  }
}