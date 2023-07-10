import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ORG_REQUEST_API } from '@env/api_path';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
  orgList: any = [];
  constructor(
    private router: Router,
    private httpService: RequestService,
    private snack: SnackbarService,
    private route: ActivatedRoute
  ) {
    this.getList();
  }

  getList() {
    this.httpService.GET(ORG_REQUEST_API, {}).subscribe(res => {
      if (res && res.data) {
        this.orgList = res.data;
      }
    })
  }

  edit(id: any) {
    let url: string = "organisation/edit/" + id
    console.log(url);

    this.router.navigateByUrl(url);
  }

  add(){
    let url: string = "organisation/add"
    this.router.navigateByUrl(url);
  }

  delete(id: any) {
    this.httpService.DELETE(ORG_REQUEST_API, { _id: id }).subscribe(res => {
      if (res) {
        this.snack.notify("Organisation record has been deleted sucessfully.", 1);
        this.getList();
      }
    })
  }

  ngOnInit(): void {
  }

}
