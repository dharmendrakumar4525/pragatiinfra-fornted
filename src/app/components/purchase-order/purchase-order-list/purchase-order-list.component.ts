import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { PURCHASE_ORDER_API } from '@env/api_path';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import { isEmpty } from 'lodash';
@Component({
  selector: 'app-purchase-order-list',
  templateUrl: './purchase-order-list.component.html',
  styleUrls: ['./purchase-order-list.component.scss']
})
export class PurchaseOrderListComponent implements OnInit {

  statusOption = new FormControl('pending');
  statusList = [
    {
      value: 'pending',
      label: 'Pending'
    },
    {
      value: 'approved',
      label: 'Approved'
    },
    {
      value: 'rejected',
      label: 'Rejected'
    },
    {
      value: 'revise',
      label: 'Revise'
    },
  ]
  rateComparativeList: any;
  filter_by = "status";
  filter_value = "pending";
  requestType = "new";
  originalRateComparativeList: any = [];
  permissions: any;

  constructor(
    private httpService: RequestService,
    private snack: SnackbarService,
  ) {
    this.getList({ filter_by: this.filter_by, filter_value: this.filter_value });
  }

  /**
  * Fetches data from the PURCHASE_ORDER_API based on the provided filter object.
  * @param filterObj The filter object containing parameters for the request.
  */
  getList(filterObj: any) {
    this.httpService.GET(PURCHASE_ORDER_API, filterObj).subscribe({
      next: (resp: any) => {
        console.log(resp);

        this.originalRateComparativeList = resp.data;
        this.rateComparativeList = resp.data;
      }, error: (err: any) => {
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

  /**
  * Updates the list based on the selected status.
  * @param item The selected status item.
  */
  onStatusChange(item) {

    // Call the getList function with the filter_by and filter_value parameters
    // The filter_by parameter is taken from the component's property filter_by
    // The filter_value parameter is taken from the value of the selected item
    this.getList({ filter_by: this.filter_by, filter_value: item.value })
  }

  /**
  * Filters the rateComparativeList based on the selected date.
  * @param event The MatDatepickerInputEvent<Date> event containing the selected date.
  */
  dateFilter(event: MatDatepickerInputEvent<Date>) {
    if (this.originalRateComparativeList && this.originalRateComparativeList.length > 0) {
      if (event.value) {
        this.rateComparativeList = this.originalRateComparativeList.filter(obj => new Date(obj.date) == new Date(event.value))
      }
      else {
        this.rateComparativeList = this.originalRateComparativeList;
      }
    }
  }

  /**
  * Filters the rateComparativeList based on the search input and type.
  * @param event The event containing the search input.
  * @param type The type of search (optional).
  */
  search(event: any, type?: any) {

    if (this.originalRateComparativeList && this.originalRateComparativeList.length > 0) {
      if (type == 'site') {
        if (event.target.value) {
          this.rateComparativeList = this.originalRateComparativeList.filter(obj => obj.siteData.site_name.toLowerCase().includes(event.target.value.toLowerCase()))
        }
        else {
          this.rateComparativeList = this.originalRateComparativeList;
        }
      }
      else {
        if (event.target.value) {
          this.rateComparativeList = this.originalRateComparativeList.filter(obj => obj.title.toLowerCase().includes(event.target.value.toLowerCase()))
        }
        else {
          this.rateComparativeList = this.originalRateComparativeList;
        }
      }
    }

  }

  ngOnInit(): void {

    // Retrieve user permissions from local storage
    this.permissions = JSON.parse(localStorage.getItem('loginData'))

    // Set the permissions property to the permissions retrieved from local storage
    // In this case, it appears that the permissions are stored in an array at permissions[0].ParentChildchecklist[13]
    this.permissions=this.permissions.permissions[0].ParentChildchecklist[13];
  }
}
