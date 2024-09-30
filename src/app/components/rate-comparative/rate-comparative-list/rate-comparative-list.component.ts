import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { RATE_COMPARATIVE_API } from '@env/api_path';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import { isEmpty } from 'lodash';
import { HttpClient } from '@angular/common/http';
import { PURCHASE_REQUEST_API} from '@env/api_path';
import { environment } from '@env/environment';
import { formatDate } from '@angular/common'; 
import * as moment from 'moment';
import { UsersService } from '@services/users.service';
import { AuthService } from '@services/auth/auth.service';
import {Router } from '@angular/router';

@Component({
  selector: 'app-rate-comparative-list',
  templateUrl: './rate-comparative-list.component.html',
  styleUrls: ['./rate-comparative-list.component.scss']
})
export class RateComparativeListComponent implements OnInit {
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
    // {
    //   value: 'rejected',
    //   label: 'Rejected'
    // },
    {
      value: 'revise',
      label: 'Revise'
    },
  ]
  rateComparativeList: any;
  siteList : any;
  filter_by = "status";
  filter_value = "pending";
  requestType = "new";
  originalRateComparativeList: any = [];
  stage='rate_comparitive';
  permissions: any;
  purchaseList: any[] = [];

 
  viewPermission: any;
  editPermission: any;
  addPermission: any;
  // deletePermission: any;
 
  
  


  x: any;
  constructor(
    private httpService: RequestService,
    private http: HttpClient,
    private auth: AuthService,
    private userService: UsersService,
    private router: Router,
    private snack: SnackbarService,){
    
      this.getList({ filter_by: this.filter_by, filter_value: this.filter_value, stage: 'rate_comparitive' });
      // console.log(this.stage)
  }

  /**
  * Fetches a list of rate comparatives from the API based on the provided filter parameters.
  * Updates the originalRateComparativeList and rateComparativeList arrays with the retrieved data.
  * @param filterObj An object containing filter parameters to be sent with the GET request.
  * @returns void
  */
  getList(filterObj: any) {
    this.httpService.GET(RATE_COMPARATIVE_API, filterObj).subscribe({
      next: (resp: any) => {
       

        resp.data.forEach((purchaseRequest: any) => {
          purchaseRequest.date = moment(purchaseRequest.updated_at).format('DD-MM-YYYY');
        });

        console.log(resp.data);

        
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

  /**
  * Handles the change in status of an item and fetches the corresponding list based on the selected status.
  * @param item The selected item containing the new status value.
  * @returns void
  */
  onStatusChange(item) {
    let stage;
    if (item.value == "pending" || item.value == "revise" || item.value == "rejected"  ) {
      stage = 'rate_comparitive';
      this.getList({ filter_by: this.filter_by, filter_value: item.value, stage: stage })
    }
    else {
      stage = 'rate_approval'
      this.getList({ filter_by: this.filter_by, stage: stage })
    }
    this.stage=stage;
    // console.log(this.stage)

  }

  /**
  * Filters the rate comparative list based on the selected date.
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
  * Searches and filters the rate comparative list based on the provided search query and type.
  * @param event The event object containing the search query.
  * @param type Optional parameter indicating the type of search ('site' or undefined for default title search).
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



  
  ngOnInit(): void {


        // Retrieve user permissions from local storage and parse them as JSON
        this.permissions = JSON.parse(localStorage.getItem('loginData'))

        // Extract specific permissions related to ParentChildchecklist from the parsed data
        this.userService.getUserss().subscribe((users) => {
          const currentUser = users.find(
            (user) => user._id === this.permissions.user._id
          );
    
          if (currentUser) {
        const rolePermission = this.permissions.user.role
        const GET_ROLE_API_PERMISSION = `/roles/role/${rolePermission}`;  
          this.httpService.GET(GET_ROLE_API_PERMISSION,{}).subscribe({
            next: (resp: any) => {
              this.viewPermission=resp.dashboard_permissions[0].ParentChildchecklist[20].childList[0].isSelected;
              this.addPermission=resp.dashboard_permissions[0].ParentChildchecklist[20].childList[1].isSelected;
              this.editPermission=resp.dashboard_permissions[0].ParentChildchecklist[20].childList[2].isSelected;
            },
            error: (err) => {
              console.log(err)
            }
          });

    this.getReqNO();
    this.siteList= this.permissions.user.sites
      console.log("SiteSelect", this.siteList);
    } else {
      this.snack.notify('Invalid Credentials - User Details not Valid', 1);
      this.auth.removeUser();
      this.userService.updateLogin('logout');
      this.router.navigate(['/login']);
    }
  });

  }
}
