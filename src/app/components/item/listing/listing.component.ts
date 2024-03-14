import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ITEM_API_MASTER } from '@env/api_path';
import { ExcelService } from '@services/export-excel/excel.service';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import { isEmpty } from 'lodash';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { CATEGORY_API,SUB_CATEGORY_API} from '@env/api_path';
@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
  categoryList: any;
  subCategoryList: any = [];
  itemList: any = [];
  list: any;
  constructor(
    private router: Router,
    private httpService: RequestService,
    private excelService: ExcelService,
    private snack: SnackbarService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.getList();
  }

  getList() {
    const subCategory = this.http.get<any>(`${environment.api_path}${SUB_CATEGORY_API}`);
    const category = this.http.get<any>(`${environment.api_path}${CATEGORY_API}`);

    this.httpService.multipleRequests([subCategory, category], {}).subscribe(res => {
      if (res) {
        this.subCategoryList = res[0].data;
        console.log("Sub Category : ",this.subCategoryList);
        this.categoryList = res[1].data;
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
  

    this.httpService.GET(ITEM_API_MASTER, {}).subscribe(res => {
      console.log("res+++",res);
      if (res && res.data) {
        this.itemList = res.data;
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

  getCategory(id: any) {
    return this.categoryList.filter((obj: { _id: any; }) => obj._id == id)[0]?.name
  }

  getSubCategory(id: any) {
    return this.subCategoryList.filter((obj: { _id: any; }) => obj._id == id)[0]?.subcategory_name
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
    this.httpService.DELETE(ITEM_API_MASTER, { _id: id }).subscribe(res => {
      if (res) {
        this.snack.notify("item record has been deleted sucessfully.", 1);
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
      this.itemList = this.list.filter(obj => obj.item_name.toLowerCase().includes(event.target.value.toLowerCase()))
    }
    else {
      this.itemList = this.list;
    }
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
