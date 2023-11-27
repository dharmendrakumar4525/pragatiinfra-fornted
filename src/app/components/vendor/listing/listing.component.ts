import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CATEGORY_API, ORG_REQUEST_API, VENDOR_API } from '@env/api_path';
import { ExcelService } from '@services/export-excel/excel.service';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import { isEmpty } from 'lodash';
@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
  vendorList: any = [];
  categoryList: any = [];
  list: any = [];
  constructor(
    private router: Router,
    private httpService: RequestService,
    private excelService: ExcelService,
    private snack: SnackbarService,
  ) {
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
    this.getList();
  }

  getList() {
    this.httpService.GET(VENDOR_API, {}).subscribe(res => {
      if (res && res.data) {
        this.vendorList = res.data;
        this.vendorList.map((obj: any) => {
          obj.category = this.getCategory(obj.category);
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


  add() {
    let url: string = "vendor/add"
    this.router.navigateByUrl(url);
  }

  delete(id: any) {
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
    // return this.categoryList.filter(ob => ob._id == id)[0]?.name;

    var finalName = [];
    this.categoryList.forEach((element: any) => {
      if (ids.includes(element._id)) {
        finalName.push(element.name);
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
      'categoryList',
      'contact_person',
      'vendor_phone_number',
      'gst_number',
      'pan_number',
      'email',
      'payment_terms',
      , 'terms_condition', 'address2'];
    let valueDataType = ['string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string'];
    let sheetName: any = "sites";
    this.excelService.mapArrayToExcel(sheetName, sheetHeaders, valueKey, valueDataType, filterReport);
  }

  ngOnInit(): void {
  }

}
