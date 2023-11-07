import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { RecentActivityService } from '@services/recent-activity.service';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import * as moment from 'moment';
import { isEmpty } from 'lodash';
import { DMRPURCHASE_ORDER_API } from '@env/api_path';
import {SITE_API} from '@env/api_path';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DmrService } from '@services/dmr.service';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { ToastService } from '@services/toast.service';
@Component({
  selector: 'app-material-record-sheet',
  templateUrl: './material-record-sheet.component.html',
  styleUrls: ['./material-record-sheet.component.scss']
})
export class MaterialRecordSheetComponent implements OnInit {
  statusOption = new FormControl('pending');
  statusList = [
    {
      value: 'pending',
      label: 'Pending'
    },
    
    {
      value: 'partial',
      label: 'Partial'
    },
    {
      value: 'completed',
      label: 'Closed'
    },
  ]
  filter_by="status";
  recentActivities: any;
  recentActivitiesLen: any;
  site:any=[];
  ApprovedpurchaseOrderList: any = [];
  OriginalApprovedpurchaseOrderList:any=[];
  PurchaseRequestList:any=[];
  RateApprovalList:any=[];
  selectedDate: Date ;
  Objdate: Date ; 
  selectedOption:String="FilterBytitle";
  dataReadySubject = new BehaviorSubject<boolean>(false);
  permissions:any;
  DMRPermissionsView:any;
  DMRPermissionsEdit:any;
  constructor(
    private recentActivityService: RecentActivityService,
    private httpService:RequestService,
    private snack:SnackbarService,
    private dmrService:DmrService,
    private toast:ToastService,
    ) { 
      this.GetApprovedpurchaseOrderList({ filter_by: this.filter_by, filter_value: "pending" });
      this.getAllLocation();
    }

  ngOnInit(): void {
    this.permissions = JSON.parse(localStorage.getItem('loginData'))
    
    this.DMRPermissionsView = this.permissions.permissions[0]?.ParentChildchecklist[15]?.childList[1];
    this.DMRPermissionsEdit = this.permissions.permissions[0]?.ParentChildchecklist[15]?.childList[0];
    //console.log(this.DMRPermissionsView)
  // Define your observables
  const recentActivities$ = this.recentActivityService.getRecentAtivities();
  const PurchaseRequestList$ = this.dmrService.getPurchaseRequestList();
  const RateApprovalList$ = this.dmrService.GetRateApprovalList();

  // Use forkJoin to wait for all observables to complete
  forkJoin([recentActivities$, PurchaseRequestList$, RateApprovalList$]).subscribe(
    ([recentActivities, PurchaseRequestList, RateApprovalList]) => {
      this.recentActivities = recentActivities;
      for (let single of this.recentActivities) {
        single.time = moment(single.createdAt).fromNow();
      }
      this.recentActivitiesLen = this.recentActivities.length;

      this.PurchaseRequestList = PurchaseRequestList;
      this.PurchaseRequestList=this.PurchaseRequestList.data
      console.log(this.PurchaseRequestList);

      this.RateApprovalList = RateApprovalList//console.log(this.DmrEntryList);
      this.RateApprovalList=this.RateApprovalList.data;
      console.log(this.RateApprovalList);
      this.dataReadySubject.next(true);
    },
    (error) => {
      // Handle errors if any of the observables fail
      console.error('Error:', error);
    }
    
  );
  }
  onStatusChange(item) {
    this.GetApprovedpurchaseOrderList({ filter_by: this.filter_by, filter_value: item.value })
  }
  GetApprovedpurchaseOrderList(filterObj: any){
    this.httpService.GET(DMRPURCHASE_ORDER_API, filterObj).subscribe(res => {
     console.log(res);
      if (res && res.data) {
        this.ApprovedpurchaseOrderList = res.data;
        this.OriginalApprovedpurchaseOrderList = res.data;
        this.ApprovedpurchaseOrderList.sort((a,b)=>(a.date<b.date)?1:-1)
        this.OriginalApprovedpurchaseOrderList.sort((a,b)=>(a.date<b.date)?1:-1)
      }
    },(err) => {
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

    })
  }
  getAllLocation()
  {
    
    this.httpService.GET(SITE_API,{}).subscribe(res => {
      if (res && res.data) {
        this.site=res.data;
        // console.log(this.site)
      }
    },(err) => {
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

    })
  }
  getLocationById(id:string)
  {
      const resultobj=this.site.find((item)=> item._id==id);
      if(resultobj)
        return resultobj.location;
      return;
  }
  getPurchaseRequestById(id:string){
    const resultobj=this.PurchaseRequestList.find((item)=> item._id===id);
    //console.log(resultobj);
    return resultobj;
  }
  getRateApprovalById(id:string){
    
    //console.log(this.RateApprovalList)
      let resultobj=this.RateApprovalList.find((item)=> item._id==id)||null;
      //console.log(resultobj);
      if(resultobj!=null)
        return this.getPurchaseRequestById(resultobj.purchase_request_id);
    
  }
  
  search(event: any, type?: any) {
    if (this.OriginalApprovedpurchaseOrderList && this.OriginalApprovedpurchaseOrderList.length > 0) {
      if (type == 'location') {
        if (event.target.value) {
          this.ApprovedpurchaseOrderList = this.OriginalApprovedpurchaseOrderList.filter(obj => this.getLocationById(obj.site).toLowerCase().includes(event.target.value.toLowerCase()))
        }
        else {
          this.ApprovedpurchaseOrderList = this.OriginalApprovedpurchaseOrderList;
        }
      }
      else if(type=='title'){
        if (event.target.value) {
          this.ApprovedpurchaseOrderList = this.OriginalApprovedpurchaseOrderList.filter(obj => obj.title.toLowerCase().includes(event.target.value.toLowerCase()))
        }
        else {
          this.ApprovedpurchaseOrderList = this.OriginalApprovedpurchaseOrderList;
        }
      }
      else if(type=='vendorName'){
        if (event.target.value) {
          this.ApprovedpurchaseOrderList = this.OriginalApprovedpurchaseOrderList.filter(obj => obj.vendor_detail.vendor_name.toLowerCase().includes(event.target.value.toLowerCase()))
        }
        else {
          this.ApprovedpurchaseOrderList = this.OriginalApprovedpurchaseOrderList;
        }
      }
      else if(type=='po'){
        if (event.target.value) {
          this.ApprovedpurchaseOrderList = this.OriginalApprovedpurchaseOrderList.filter(obj => obj.po_number.toLowerCase().includes(event.target.value.toLowerCase()))
        }
        else {
          this.ApprovedpurchaseOrderList = this.OriginalApprovedpurchaseOrderList;
        }
      }
      else if(type=='pr'){
        if (event.target.value) {
          this.ApprovedpurchaseOrderList = this.OriginalApprovedpurchaseOrderList.filter(obj =>(this.getRateApprovalById(obj.rate_approval_id).purchase_request_number).toLowerCase().includes(event.target.value.toLowerCase()))
        }
        else {
          this.ApprovedpurchaseOrderList = this.OriginalApprovedpurchaseOrderList;
        }
      }
      else if(type=='handelBy'){
        if (event.target.value) {
          this.ApprovedpurchaseOrderList = this.OriginalApprovedpurchaseOrderList.filter(obj =>(this.getRateApprovalById(obj.rate_approval_id).handle_by).toLowerCase().includes(event.target.value.toLowerCase()))
        }
        else {
          this.ApprovedpurchaseOrderList = this.OriginalApprovedpurchaseOrderList;
        }
      }
      
    }

  }
  showSnackbar() {
    if (!this.DMRPermissionsEdit.isSelected) {
      this.toast.openSnackBar('Access to DMR editing is restricted for your account.');
    }
  }
  dateFilter(event: MatDatepickerInputEvent<Date>) {
    if (this.OriginalApprovedpurchaseOrderList && this.OriginalApprovedpurchaseOrderList.length > 0) {
      if (event.target.value) {
        this.selectedDate = new Date(event.target.value);
        this.ApprovedpurchaseOrderList = this.OriginalApprovedpurchaseOrderList.filter(obj => {
          
          this.Objdate=new Date(obj.date)
          // Convert both dates to a common format (only date)
          const formattedDate1 = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), this.selectedDate.getDate());
          const formattedDate2 = new Date(this.Objdate.getFullYear(), this.Objdate.getMonth(), this.Objdate.getDate());
          console.log(formattedDate1+"---------"+formattedDate2)
          return formattedDate1.getTime() === formattedDate2.getTime();
        });
      }
      else {
        this.ApprovedpurchaseOrderList = this.OriginalApprovedpurchaseOrderList;
      }
    }
  }
  clearSearchField(){
    this.ApprovedpurchaseOrderList = this.OriginalApprovedpurchaseOrderList;
  }
  

}
