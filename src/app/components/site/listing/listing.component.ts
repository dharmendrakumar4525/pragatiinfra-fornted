import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SITE_API } from '@env/api_path';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import { ExcelService } from '@services/export-excel/excel.service';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
  siteList: any = [];
  constructor(
    private router: Router,
    private httpService: RequestService,
    private excelService: ExcelService,
    private snack: SnackbarService,
    private route: ActivatedRoute,
  ) {
    this.getList();
  }

  getList() {
    this.httpService.GET(SITE_API, {}).subscribe(res => {
      if (res && res.data) {
        this.siteList = res.data;
      }
    })
  }

  add(){
    let url: string = "site/add"
    this.router.navigateByUrl(url);
  }

  delete(id: any) {
    this.httpService.DELETE(SITE_API, { _id: id }).subscribe(res => {
      if (res) {
        this.snack.notify("site record has been deleted sucessfully.", 1);
        this.getList();
      }
    })
  }


  async exportXlSX() {   

    let filterReport = this.siteList.map((o:any)=>{
      o.store_manager_number = `${o.store_manager_phone_number_dialcode}-${o.store_manager_phone_number}`;
      let address = [];
      if(o.address){
        if(o.address.street_address){
          address.push(o.address.street_address)
        }
        if(o.address.street_address2){
          address.push(o.address.street_address2)
        }
        if(o.address.city){
          address.push(o.address.city)
        }
        if(o.address.state){
          address.push(o.address.state)
        }
        if(o.address.country){
          address.push(o.address.country)
        }
        if(o.address.zip_code){
          address.push(o.address.zip_code)
        }
      }
   
      o.address2 = address.join(", ");
      return o;
    })

    let sheetHeaders = [
     "Locaton",
     "Site Name	",
     "Code",
     "Store Manager	",
     "Store Manager Number",
     "Store Manager Email",
     "Address"
    ];

    let valueKey = ['location', 'site_name', 'code', 'store_manager', 'store_manager_number','site_manager_email', 'address2'];
    let valueDataType = ['string', 'string', 'string', 'string', 'string', 'string', 'string'];
    let sheetName:any = "sites";
    this.excelService.mapArrayToExcel(sheetName, sheetHeaders, valueKey, valueDataType, filterReport);
  }


  ngOnInit(): void {
  }

}
