import { Component, OnInit } from '@angular/core';
import { RecentActivityService } from '@services/recent-activity.service';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';
import { isEmpty } from 'lodash';
import { FormControl, Validators, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import {DmrService} from '@services/dmr.service';
import { MatDialog } from '@angular/material/dialog';
import { ItemTablePopupComponent } from '../item-table-popup/item-table-popup.component';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import {SITE_API} from '@env/api_path';
import { FormGroup } from '@angular/forms';
import { ToastService } from '@services/toast.service';
import { an } from '@fullcalendar/core/internal-common';
@Component({
  selector: 'app-table-overview',
  templateUrl: './table-overview.component.html',
  styleUrls: ['./table-overview.component.scss']
})
export class TableOverviewComponent implements OnInit {
  recentActivities: any;
  recentActivitiesLen: any;
  dmrEntryList:Array<any> = [];
  OriginaldmrEntryList:Array<any>=[];
  selectedDate: Date ;
  Objdate: Date ;
  site:any=[];
  constructor(private recentActivityService: RecentActivityService,
    private httpService:RequestService,
    private snack:SnackbarService,
    private route:ActivatedRoute,
    private toast:ToastService,
    private dmrServide:DmrService,public dialog: MatDialog,
    private formBuilder: FormBuilder,) { 
      this.recentActivityService.getRecentAtivities().subscribe(data => {
        this.recentActivities = data
        for (let single of this.recentActivities) {
          single.time = moment(single.createdAt).fromNow()
        }
        this.recentActivitiesLen = this.recentActivities.length
      });
      this.dmrServide.GetDmrEntryList().subscribe(data=>{
          this.dmrEntryList=data;
          this.OriginaldmrEntryList=data;
          this.dmrEntryList.sort((a,b)=>(a.dmrdate<b.dmrdate)?1:-1)
          this.OriginaldmrEntryList.sort((a,b)=>(a.dmrdate<b.dmrdate)?1:-1)
          console.log(this.dmrEntryList)
          this.once()
      })
      
    }
  ngOnInit(): void {
    
  }
  myGroup = this.formBuilder.group({
    dmr: this.formBuilder.array([]),
  });
  dmrDateForm= this.formBuilder.group({
    DateOfReceivingDocsAtHO: ['', Validators.required],

  });
  viewMaterials(list) {
    const dialogPopup = this.dialog.open(ItemTablePopupComponent, {
      data: {
        type: 'item-table',
        currentRecords: list
      }
    });
  }
  getLocationById(id:string)
  {
      const resultobj=this.site.find((item)=> item._id==id);
      if(resultobj)
        return resultobj.location;
      return;
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
  search(event: any, type?: any) {
    if (this.OriginaldmrEntryList && this.OriginaldmrEntryList.length > 0) {
      
      if(type=='DMRNo'){
        if (event.target.value) {
          this.dmrEntryList = this.OriginaldmrEntryList.filter(obj => obj.DMR_No.toLowerCase().includes(event.target.value.toLowerCase()))
        }
        else {
          this.dmrEntryList = this.OriginaldmrEntryList;
        }
      }
      // else if (type == 'location') {
      //   if (event.target.value) {
      //     this.dmrEntryList = this.OriginaldmrEntryList.filter(obj => this.getLocationById(obj.site).toLowerCase().includes(event.target.value.toLowerCase()))
      //   }
      //   else {
      //     this.dmrEntryList = this.OriginaldmrEntryList;
      //   }
      // }
    }    
  }
  dateFilter(event: MatDatepickerInputEvent<Date>) {
    if (this.OriginaldmrEntryList && this.OriginaldmrEntryList.length > 0) {
      if (event.target.value) {
        this.selectedDate = new Date(event.target.value);
        this.dmrEntryList = this.OriginaldmrEntryList.filter(obj => {
          var dateString = obj.dmrdate; 
          var parts = dateString.split('-');

          if (parts.length === 3) {
            var day = parseInt(parts[0]);
            var month = parseInt(parts[1]) - 1; // Months in JavaScript are zero-based (0-11)
            var year = parseInt(parts[2]);

            // Create a Date object using the parsed values
            this.Objdate = new Date(year, month, day);
            console.log(this.Objdate);
         }
          // this.Objdate=new Date(obj.dmrdate)
          // console.log(typeof(obj.dmrdate));
          const formattedDate1 = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), this.selectedDate.getDate());
          const formattedDate2 = new Date(this.Objdate.getFullYear(), this.Objdate.getMonth(), this.Objdate.getDate());
          return formattedDate1.getTime() === formattedDate2.getTime();
        });
      }
      else {
        this.dmrEntryList = this.OriginaldmrEntryList;
      }
    }
  }
  updateDmr(Data:any,index:any,type:any)
  {
    if(!Data)
      return
    if(type==="DateOfReceivingDocsAtHO")
    {
      const form={
        DateOfReceivingDocsAtHO:Data
      }
      let combinedData={...this.dmrEntryList[index],...form}
      //console.log(combinedData)
      this.updateDmrApi(combinedData);
    } 
    else if(type==="DateOfDocSubmissionToAccount")
    {
      const form={
        DateOfDocSubmissionToAccount:Data
      }
      let combinedData={...this.dmrEntryList[index],...form}
      //console.log(combinedData)
      this.updateDmrApi(combinedData);
    }
    else if(type==="RemarkByAudit")
    {
      const form={
        RemarkByAudit:Data
      }
      let combinedData={...this.dmrEntryList[index],...form}
      //console.log(combinedData)
      this.updateDmrApi(combinedData);
    } 
    else if(type==="PaymentStatus")
    {
      const form={
        PaymentStatus:Data
      }
      let combinedData={...this.dmrEntryList[index],...form}
      //console.log(combinedData)
      this.updateDmrApi(combinedData);
    } 
    else if(type==="UTR_No")
    {
      const form={
        UTR_No:Data
      }
      let combinedData={...this.dmrEntryList[index],...form}
      //console.log(combinedData)
      this.updateDmrApi(combinedData);
    } 
    else if(type==="AccountsRemark")
    {
      const form={
        AccountsRemark:Data
      }
      let combinedData={...this.dmrEntryList[index],...form}
      //console.log(combinedData)
      this.updateDmrApi(combinedData);
    } 
  }
  updateDmrApi(combinedData:any){
    //updating the dmr
    this.httpService.PUT("/dmr_entry",combinedData).subscribe(res => {
      if(res)
      {
        this.toast.openSnackBar("DMR updated Successfully");
        console.log(res)
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
  once(){

    for(let i=0;i<this.dmrEntryList.length;i++)
    {
      const itemGroup = new FormGroup({
        DateOfReceivingDocsAtHO:new FormControl(''),
        DateOfDocSubmissionToAccount:new FormControl(''),
        RemarkByAudit:new FormControl(''),
        PaymentStatus:new FormControl(''),
        UTR_No:new FormControl(''),
        AccountsRemark:new FormControl(''),
      });
        // Push the FormGroup to the "dmritem" FormArray
      (this.myGroup.get('dmr') as FormArray).push(itemGroup);
    }
  }
}
