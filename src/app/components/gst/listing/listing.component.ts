import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GST_API } from '@env/api_path';
import { ExcelService } from '@services/export-excel/excel.service';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
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
    this.httpService.GET(GST_API, {}).subscribe(res => {
      if (res && res.data) {
        this.list = res.data;
      }
    })
  }

  edit(id: any) {
    let url: string = "gst/edit/" + id
    console.log(url);

    this.router.navigateByUrl(url);
  }

  add(){
    let url: string = "gst/add"
    this.router.navigateByUrl(url);
  }

  delete(id: any) {
    this.httpService.DELETE(GST_API, { _id: id }).subscribe(res => {
      if (res) {
        this.snack.notify(" record has been deleted sucessfully.", 1);
        this.getList();
      }
    })
  }

  async exportXlSX() {
    let sheetHeaders = [
      "Name",
      "Percentage",
    ];

    let valueKey = ['gst_name', 'gst_percentage',];
    let valueDataType = ['string', 'string',];
    let sheetName: any = "GST";
    this.excelService.mapArrayToExcel(sheetName, sheetHeaders, valueKey, valueDataType, this.list);
  }

  ngOnInit(): void {
  }

}
