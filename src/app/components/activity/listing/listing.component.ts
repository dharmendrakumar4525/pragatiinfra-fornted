import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ACTIVITY_API } from '@env/api_path';
import { ExcelService } from '@services/export-excel/excel.service';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import { AddDataComponent } from '../add-data/add-data.component';
import { isEmpty } from 'lodash';
@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
  activityList: any = [];
  list: any = [];
  constructor(
    private router: Router,
    private httpService: RequestService,
    private excelService: ExcelService,
    private snack: SnackbarService,
    private dialog: MatDialog,
  ) {
    this.getList();
  }

  getList() {
    this.httpService.GET(ACTIVITY_API, {}).subscribe(res => {
      if (res && res.data) {
        this.activityList = res.data;
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
    const confirmDialogPopup = this.dialog.open(AddDataComponent, {
    });
    confirmDialogPopup.afterClosed().subscribe(result => {

      if (result && result['option'] === 1) {
        this.getList();
      }
    });
  }

  delete(id: any) {
    this.httpService.DELETE(ACTIVITY_API, { _id: id }).subscribe(res => {
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
      this.activityList = this.list.filter(obj => obj.activity_name.toLowerCase().includes(event.target.value.toLowerCase()))
    }
    else {
      this.activityList = this.list;
    }
  }

  async exportXlSX() {
    let sheetHeaders = [
      "Activity Name	",
    ];

    let valueKey = ['activity_name'];
    let valueDataType = ['string'];
    let sheetName: any = "Activity";
    this.excelService.mapArrayToExcel(sheetName, sheetHeaders, valueKey, valueDataType, this.activityList);
  }

  ngOnInit(): void {
  }

}
