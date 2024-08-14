import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { RATE_COMPARATIVE_API } from '@env/api_path';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import { isEmpty } from 'lodash';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { PURCHASE_REQUEST_API} from '@env/api_path';
import { environment } from '@env/environment';

@Component({
  selector: 'app-rate-approval-list',
  templateUrl: './rate-approval-list.component.html',
  styleUrls: ['./rate-approval-list.component.scss']
})
export class RateApprovalListComponent implements OnInit {

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

  
  viewPermission: any;
  editPermission: any;
  permissions: any;
  rateComparativeList: any;
  filter_by = "status";
  filter_value = "pending";
  requestType = "new";
  siteList: any;
  originalRateComparativeList: any = [];


  purchaseList: any[] = [];
  constructor(
    private httpService: RequestService,
    private snack: SnackbarService,
    private http: HttpClient,
  ) {
    this.getList({ filter_by: this.filter_by, filter_value: this.filter_value, stage: 'rate_approval' });
  }

  /**
  * Fetches rate comparative data from the API based on the provided filter object.
  * Updates the originalRateComparativeList and rateComparativeList with the fetched data.
  * Notifies the user of any errors encountered during the API request.
  * @param filterObj The filter object to apply to the API request.
  * @returns void
  */
  getList(filterObj: any) {
    this.httpService.GET(RATE_COMPARATIVE_API, filterObj).subscribe({
      next: (resp: any) => {
  
        console.log(resp.data);
        resp.data.forEach((purchaseRequest: any) => {
          purchaseRequest.date = moment(purchaseRequest.date).format('YYYY-MM-DD');
        });

        if(this.permissions.user.role === "superadmin"){
        
          this.originalRateComparativeList = resp.data;
          this.rateComparativeList = resp.data;
        }
        else
        {
          const ComparativeList= resp.data;
          const filteredComparativeList = ComparativeList.filter(pr => 
            this.siteList.some(site => site._id === pr.site)
        );
        
        
        console.log(filteredComparativeList);
        this.originalRateComparativeList = filteredComparativeList;
        this.rateComparativeList = filteredComparativeList;  
        }

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
  * Handles changes in the status selection.
  * Fetches rate comparative data based on the selected status and stage.
  * @param item The selected status item.
  * @returns void
  */
  onStatusChange(item) {
    this.getList({ filter_by: this.filter_by, filter_value: item.value, stage: 'rate_approval' })
  }

  /**
  * Filters rate comparative data based on the selected date.
  * Updates the rateComparativeList with filtered data.
  * @param event The MatDatepickerInputEvent containing the selected date.
  * @returns void
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
  * Performs a search on the rate comparative data based on the provided event and type.
  * Updates the rateComparativeList with filtered data.
  * @param event The event triggered by the search input.
  * @param type The type of search to perform ('site' or 'title').
  * @returns void
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
      }
      });
    

  }
  reqNo(value: any) {
    const filteredList = this.purchaseList.filter(item => item._id === value);
    return filteredList[0].purchase_request_number;
  }


  ngOnInit(): void {



    this.permissions = JSON.parse(localStorage.getItem('loginData'))

    // Extract specific permissions related to ParentChildchecklist from the parsed data
    const rolePermission = this.permissions.user.role
    const GET_ROLE_API_PERMISSION = `/roles/role/${rolePermission}`;  
      this.httpService.GET(GET_ROLE_API_PERMISSION,{}).subscribe({
        next: (resp: any) => {
          console.log(resp)
          this.viewPermission=resp.dashboard_permissions[0].ParentChildchecklist[21].childList[0].isSelected;
          this.editPermission=resp.dashboard_permissions[0].ParentChildchecklist[21].childList[2].isSelected;
        },
        error: (err) => {
          console.log(err)
        }
      });

    this.getReqNO();
    this.siteList= this.permissions.user.sites
      console.log("SiteSelect", this.siteList);
  }

}
