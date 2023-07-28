import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PURCHASE_REQUEST_API } from '@env/api_path';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import { Router } from '@angular/router';
import { isEmpty } from 'lodash';
@Component({
  selector: 'app-purchase-request-list',
  templateUrl: './purchase-request-list.component.html',
  styleUrls: ['./purchase-request-list.component.css']
})
export class PurchaseRequestListComponent implements OnInit {
  purchaseList: any;

  constructor(private router: Router,
    private httpService: RequestService,
    private snack: SnackbarService,
    private formBuilder: FormBuilder
  ) {
    this.getList();
  }

  getList() {
    this.httpService.GET(PURCHASE_REQUEST_API, "").subscribe({
      next: (resp: any) => {
        this.purchaseList = resp.data;
      }, error: (err) => {
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
      }
    });
  }

  viewDetails(prId) {
    let url: string = "procurement/" + prId
    this.router.navigateByUrl(url);


  }

  ngOnInit(): void {

  }


}
