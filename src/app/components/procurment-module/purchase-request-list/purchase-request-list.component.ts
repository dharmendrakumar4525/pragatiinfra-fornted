import { Component, OnInit } from '@angular/core';
import { PURCHASE_REQUEST_API } from '@env/api_path';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import { Router } from '@angular/router';
import { isEmpty } from 'lodash';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-purchase-request-list',
  templateUrl: './purchase-request-list.component.html',
  styleUrls: ['./purchase-request-list.component.scss'],
  providers: [DatePipe]
})
export class PurchaseRequestListComponent implements OnInit {
  viewPermission: any;
  purchaseList: any;
  filter_by = "status";
  filter_value = "pending";
  requestType = "new";
  siteList: any;
  originalPurchaseList: any = [];
  permissions: any;

  constructor(
    private router: Router,
    private httpService: RequestService,
    private snack: SnackbarService,
    private datePipe: DatePipe
  ) {
    // Call the getList method with filter parameters
    this.getList({ filter_by: this.filter_by, filter_value: this.filter_value });
  }

  /**
   * Fetches a list of purchase requests from the API based on the provided filter parameters.
   * Updates the originalPurchaseList and purchaseList arrays with the retrieved data.
   * @param filterObj An object containing filter parameters to be sent with the GET request.
   * @returns void
   */
  getList(filterObj: any) {
    this.httpService.GET(PURCHASE_REQUEST_API, filterObj).subscribe({
      next: (resp: any) => {
        console.log(resp.data);
        const purchaseRequests = resp.data.map((item: any) => {
          return {
            ...item,
            formattedDate: this.datePipe.transform(item.date, 'yyyy-MM-dd')
          };
        });

        if (this.permissions.user.role === "superadmin") {
          this.originalPurchaseList = purchaseRequests;
          this.purchaseList = purchaseRequests;
        } else {
          const filteredPurchaseRequests = purchaseRequests.filter(pr =>
            this.siteList.some(site => site._id === pr.site)
          );

          console.log(filteredPurchaseRequests);
          this.originalPurchaseList = filteredPurchaseRequests;
          this.purchaseList = filteredPurchaseRequests;
        }
      },
      error: (err) => {
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

  getRemainingDays(targetDateString) {
    const targetDate = new Date(targetDateString);
    const currentDate = new Date();

    // Set both dates to the same time of day
    targetDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    // Calculate the difference in days
    const timeDifference = targetDate.getTime() - currentDate.getTime();
    let remainingDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return remainingDays;
  }

  dateFilter(event: MatDatepickerInputEvent<Date>) {
    if (this.originalPurchaseList && this.originalPurchaseList.length > 0) {
      if (event.value) {
        this.purchaseList = this.originalPurchaseList.filter(obj => new Date(obj.date).getTime() === event.value.getTime());
      } else {
        this.purchaseList = this.originalPurchaseList;
      }
    }
  }

  search(event: any, type?: any) {
    if (this.originalPurchaseList && this.originalPurchaseList.length > 0) {
      if (type == 'site') {
        if (event.target.value) {
          this.purchaseList = this.originalPurchaseList.filter(obj => obj.siteData.site_name.toLowerCase().includes(event.target.value.toLowerCase()));
        } else {
          this.purchaseList = this.originalPurchaseList;
        }
      } else {
        if (event.target.value) {
          this.purchaseList = this.originalPurchaseList.filter(obj => obj.title.toLowerCase().includes(event.target.value.toLowerCase()));
        } else {
          this.purchaseList = this.originalPurchaseList;
        }
      }
    }
  }

  /**
   * Changes the request type and updates the purchase request list accordingly.
   * @param type The new request type ('new' or 'revised').
   * @returns void
   */
  changeRequestType(type: any) {
    this.requestType = type;

    if (type == 'new') {
      this.filter_value = 'pending';
      this.getList({ filter_by: this.filter_by, filter_value: this.filter_value });
    } else {
      this.filter_value = 'revised';
      this.getList({ filter_by: this.filter_by, filter_value: this.filter_value });
    }
  }

  ngOnInit(): void {
    // Retrieve user permissions from local storage and parse them as JSON
    this.permissions = JSON.parse(localStorage.getItem('loginData'));

    // Extract specific permissions related to ParentChildchecklist from the parsed data
    const rolePermission = this.permissions.user.role;
    const GET_ROLE_API_PERMISSION = `/roles/role/${rolePermission}`;
    this.httpService.GET(GET_ROLE_API_PERMISSION, {}).subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.viewPermission = resp.dashboard_permissions[0].ParentChildchecklist[19].childList[0].isSelected;
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.siteList = this.permissions.user.sites;
    console.log("SiteSelect", this.siteList);
  }
}
