import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ORG_REQUEST_API } from '@env/api_path';
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
  orgList: any = [];
  list: any = [];
  constructor(
    private router: Router,
    private httpService: RequestService,
    private excelService: ExcelService,
    private snack: SnackbarService,
    private route: ActivatedRoute
  ) {
    this.getList();
  }

  getList() {
    this.httpService.GET(ORG_REQUEST_API, {}).subscribe(res => {
      if (res && res.data) {
        this.orgList = res.data;
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
    let url: string = "organisation/edit/" + id
    console.log(url);

    this.router.navigateByUrl(url);
  }

  add() {
    let url: string = "organisation/add"
    this.router.navigateByUrl(url);
  }

  delete(id: any) {
    this.httpService.DELETE(ORG_REQUEST_API, { _id: id }).subscribe(res => {
      if (res) {
        this.snack.notify("Organisation record has been deleted sucessfully.", 1);
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
      this.orgList = this.list.filter(obj => obj.location.toLowerCase().includes(event.target.value.toLowerCase()))
    }
    else {
      this.orgList = this.list;
    }
  }

  async exportXlSX() {

    let filterReport = this.orgList.map((o: any) => {
      o.organisation_number = `${o.store_manager_phone_number_dialcode}-${o.store_manager_phone_number}`;
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
      "Contact PErson Name",
      "Designation",
      'Organisation Number',
      "Email",
      "PAN Number",
      "GST Number",
      "Address"
    ];


    let valueKey = ['location', 'contact_person', 'designation', 'organisation_number', 'email', 'pan_number', 'gst_number', 'address2'];
    let valueDataType = ['string', 'string', 'string', 'string', 'string', 'string', 'string'];
    let sheetName: any = "Organisation";
    this.excelService.mapArrayToExcel(sheetName, sheetHeaders, valueKey, valueDataType, filterReport);
  }

  ngOnInit(): void {
  }

}
