import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ITEM_API } from '@env/api_path';
import { ExcelService } from '@services/export-excel/excel.service';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
  itemList: any = [];
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
    this.httpService.GET(ITEM_API, {}).subscribe(res => {
      if (res && res.data) {
        this.itemList = res.data;
      }
    })
  }

  edit(id: any) {
    let url: string = "item/edit/" + id
    console.log(url);

    this.router.navigateByUrl(url);
  }

  add() {
    let url: string = "item/add"
    this.router.navigateByUrl(url);
  }

  delete(id: any) {
    this.httpService.DELETE(ITEM_API, { _id: id }).subscribe(res => {
      if (res) {
        this.snack.notify("item record has been deleted sucessfully.", 1);
        this.getList();
      }
    })
  }

  async exportXlSX() {

    let filterReport = this.itemList.map((o: any) => {
      o.categoryName = o.categoryDetail?.name
      o.subCategoryName = o.subCategoryDetail?.subcategory_name
      o.uomName = o.uomDetail?.uom_name
      o.gstValue = o.gstDetail?.gst_percentage

      return o;
    })
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

  ngOnInit(): void {
  }

}
