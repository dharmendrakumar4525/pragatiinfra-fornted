import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { PURCHASE_ORDER_API } from '@env/api_path';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import { isEmpty } from 'lodash';
import { Observable } from 'rxjs';


import { HttpClient } from '@angular/common/http';

import { PURCHASE_REQUEST_API} from '@env/api_path';
import { environment } from '@env/environment';

@Component({
  selector: 'app-purchase-order-list',
  templateUrl: './purchase-order-list.component.html',
  styleUrls: ['./purchase-order-list.component.scss']
})
export class PurchaseOrderListComponent implements OnInit {

  private apiUrl = PURCHASE_ORDER_API; 

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
 
  viewPermission: any;
  editPermission: any;

  purchaseList: any[] = [];
  purchaseOrderList: any[] = [];
  purchase_request_number: any[] = [];
  constructor(
    private httpService: RequestService,
    private snack: SnackbarService,
    private http: HttpClient,
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
        this.originalRateComparativeList = resp.data;
        this.rateComparativeList = resp.data;

        //console.log("this.originalRateComparativeList",this.originalRateComparativeList)
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
  getReqNO(){

    const purchase = this.http.get<any>(`${environment.api_path}${PURCHASE_REQUEST_API}`);
    this.httpService.multipleRequests([purchase], {}).subscribe(res => {
      if (res) {
        this.purchaseList = res[0].data; 
        //console.log("--this.PURCHASE_REQUEST_API--",this.purchaseList);
      }
    });

    const purchaseOrder = this.http.get<any>(`${environment.api_path}${PURCHASE_ORDER_API}`);
    this.httpService.multipleRequests([purchaseOrder], {}).subscribe(res => {
      if (res) {
        this.purchaseOrderList = res[0].data; 
        //console.log("--purchaseOrderList--",this.purchaseOrderList);
      }
    });
  }

  reqNo(value: any) {
    // console.log("valuePPP",value);
    const filteredList = this.purchaseList.filter(item => item.title === value);
    // console.log("--filteredListt--",filteredList);
    return filteredList[0].purchase_request_number ;
  }

  poNo(value: any) {
    // console.log("--VALUE--",)
    // console.log(value)
    // console.log("--VALUE--")
    // console.log("--originalRateComparativeList--");
    // console.log(this.originalRateComparativeList);
    const filteredList = this.purchaseOrderList.filter(item => item.billing_address.company_name.includes(value.company_name));
    //console.log("--filteredListt--",filteredList);
    const purchaseOrderNumber = filteredList.length ;
    return purchaseOrderNumber ;
  }



  ngOnInit(): void {

    this.getReqNO();
        // Retrieve user permissions from local storage and parse them as JSON
        this.permissions = JSON.parse(localStorage.getItem('loginData'))

        // Extract specific permissions related to ParentChildchecklist from the parsed data
        const rolePermission = this.permissions.user.role
        const GET_ROLE_API_PERMISSION = `/roles/role/${rolePermission}`;  
          this.httpService.GET(GET_ROLE_API_PERMISSION,{}).subscribe({
            next: (resp: any) => {
              this.viewPermission=resp.dashboard_permissions[0].ParentChildchecklist[22].childList[0].isSelected;
              this.editPermission=resp.dashboard_permissions[0].ParentChildchecklist[22].childList[2].isSelected;
            },
            error: (err) => {
              console.log(err)
            }
          });
  }
}
