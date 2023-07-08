import { Component, OnInit } from '@angular/core';
import { PURCHASE_REQUEST_API } from '@env/api_path';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import { isEmpty } from 'lodash';

@Component({
  selector: 'app-prstatus',
  templateUrl: './prstatus.component.html',
  styleUrls: ['./prstatus.component.css']
})
export class PrstatusComponent implements OnInit {

  prList:any
  constructor(
    private httpService: RequestService,
    private snack: SnackbarService,
  ) { }

  getList() {
    this.httpService.GET(PURCHASE_REQUEST_API, {}).subscribe(res => {
      this.prList = res.data;
    })
  }

  ngOnInit(): void {
    this.getList();
  }

}
