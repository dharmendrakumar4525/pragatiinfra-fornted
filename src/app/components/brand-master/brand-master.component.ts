import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ExcelService } from '@services/export-excel/excel.service';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import { isEmpty } from 'lodash';
import { BrandAddDataComponent } from './add-data/add-data.component';

@Component({
  selector: 'app-brand-master',
  templateUrl: './brand-master.component.html',
  styleUrls: ['./brand-master.component.scss']
})
export class BrandMasterComponent implements OnInit {
  brandList:any=[];
  list:any=[];
  constructor(private router: Router,
    private httpService: RequestService,
    private excelService: ExcelService,
    private snack: SnackbarService,
    private dialog: MatDialog,) {
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
