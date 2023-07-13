import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CATEGORY_API, ORG_REQUEST_API, VENDOR_API } from '@env/api_path';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
  vendorList: any = [];
  categoryList: any = [];
  constructor(
    private router: Router,
    private httpService: RequestService,
    private snack: SnackbarService,
  ) {
    this.httpService.GET(CATEGORY_API, {}).subscribe(res => {
      this.categoryList = res.data;
    })
    this.getList();
  }

  getList() {
    this.httpService.GET(VENDOR_API, {}).subscribe(res => {
      if (res && res.data) {
        this.vendorList = res.data;
      }
    })
  }

  edit(id: any) {
    let url: string = "vendor/edit/" + id
    console.log(url);

    this.router.navigateByUrl(url);
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
    })
  }

  getCategory(id: any) {
    return this.categoryList.filter(ob => ob._id == id)[0]?.name;
  }

  ngOnInit(): void {
  }

}
