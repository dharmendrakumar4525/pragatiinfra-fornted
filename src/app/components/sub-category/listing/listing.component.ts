import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CATEGORY_API, SUB_CATEGORY_API } from '@env/api_path';
import { environment } from '@env/environment';
import { ExcelService } from '@services/export-excel/excel.service';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
  subCategoryList: any = [];
  categoryList: any;
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
        this.categoryList = res[1].data;
        this.list = res[0].data;
      }
    })
  }

  add() {
    let url: string = "sub-category/add"
    this.router.navigateByUrl(url);
  }

  delete(id: any) {
    this.httpService.DELETE(SUB_CATEGORY_API, { _id: id }).subscribe(res => {
      if (res) {
        this.snack.notify("Sub Category record has been deleted sucessfully.", 1);
        this.getList();
      }
    })
  }

  getCategory(id) {
    return this.categoryList.filter(obj => obj._id == id)[0]?.name
  }

  search(event: any) {
    if (event.target.value) {
      this.subCategoryList = this.list.filter(obj => obj.subcategory_name.toLowerCase().includes(event.target.value.toLowerCase()))
    }
    else {
      this.subCategoryList = this.list;
    }
  }

  async exportXlSX() {

    let filterReport = this.subCategoryList.map((o: any) => {
      o.categoryName = this.getCategory(o.category)
      return o;
    })
    let sheetHeaders = [
      "Sub Category Name",
      "Category Name",
    ];


    let valueKey = ['subcategory_name', 'categoryName'];
    let valueDataType = ['string', 'string'];
    let sheetName: any = "Sub Category";
    this.excelService.mapArrayToExcel(sheetName, sheetHeaders, valueKey, valueDataType, filterReport);
  }


  ngOnInit(): void {
  }

}
