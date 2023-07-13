import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SITE_API } from '@env/api_path';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';

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
    private snack: SnackbarService,
    private route: ActivatedRoute
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

  ngOnInit(): void {
  }

}
