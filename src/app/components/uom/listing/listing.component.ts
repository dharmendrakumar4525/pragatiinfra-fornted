import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UOM_API } from '@env/api_path';
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
  UOMList: any = [];
  list: any;
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
    this.httpService.GET(UOM_API, {}).subscribe(res => {
      if (res && res.data) {
        this.UOMList = res.data;
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
    let url: string = "uom/edit/" + id
    console.log(url);

    this.router.navigateByUrl(url);
  }

  add() {
    let url: string = "uom/add"
    this.router.navigateByUrl(url);
  }

  delete(id: any) {
    this.httpService.DELETE(UOM_API, { _id: id }).subscribe(res => {
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
      this.UOMList = this.list.filter(obj => obj.uom_name.toLowerCase().includes(event.target.value.toLowerCase()))
    }
    else {
      this.UOMList = this.list;
    }
  }

  async exportXlSX() {

    let sheetHeaders = [
      "UOM  Name",
      "Code/Unit",
    ];


    let valueKey = ['uom_name', 'unit'];
    let valueDataType = ['string', 'string'];
    let sheetName: any = "UOM";
    this.excelService.mapArrayToExcel(sheetName, sheetHeaders, valueKey, valueDataType, this.UOMList);
  }

  ngOnInit(): void {
  }

}
