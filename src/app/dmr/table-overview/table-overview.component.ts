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
declare var $: any;
@Component({
  selector: 'app-table-overview',
  templateUrl: './table-overview.component.html',
  styleUrls: ['./table-overview.component.scss']
})
export class TableOverviewComponent implements OnInit {
  recentActivities: any;
  recentActivitiesLen: any;
  dmrEntryList:Array<any> = [];
  dmrPoList:Array<any> = [];
  OriginaldmrPoList:Array<any>=[];
  OriginaldmrEntryList:Array<any>=[];
  selectedDate: Date ;
  Objdate: Date ;
  site:any=[];
  selectedOption:String="FilterByDmrId"
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
          this.dmrEntryList.sort((a,b)=>(a.DMR_No<b.DMR_No)?1:-1)
          this.OriginaldmrEntryList.sort((a,b)=>(a.DMR_No<b.DMR_No)?1:-1)
          console.log(this.dmrEntryList)

          this.dmrPoList = this.getUniqueValues(this.dmrEntryList, 'PONumber');
          this.OriginaldmrPoList=this.getUniqueValues(this.dmrEntryList, 'PONumber');
          console.log(this.dmrPoList);

          this.once()
      })
      
    }
    getUniqueValues(array: any[], field: string): any[] {
      const uniqueValues = [];
      const uniqueValueSet = new Set();
    
      array.forEach(item => {
        const value = item[field];
        if (!uniqueValueSet.has(value)) {
          uniqueValueSet.add(value);
          uniqueValues.push(value);
        }
      });
    
      return uniqueValues;
    }
  ngOnInit(): void {
    
  }
  myGroup = this.formBuilder.group({
    dmr: this.formBuilder.array([this.formBuilder.array([])]),
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
    if (this.OriginaldmrPoList && this.OriginaldmrPoList.length > 0) {
      
      if(type=='DMRNo'){
        if (event.target.value) {
          this.dmrPoList = this.OriginaldmrPoList.filter(item => (item.toLowerCase()+"/dmr").includes(event.target.value.toLowerCase()))
        }
        else {
          this.dmrPoList = this.OriginaldmrPoList;
        }
      }
      else if (type == 'GateRegisterEntry') {
        if (event.target.value) {
          this.dmrEntryList = this.OriginaldmrEntryList.filter(obj => obj.GateRegisterEntry.toLowerCase().includes(event.target.value.toLowerCase()))
          this.dmrPoList = this.getUniqueValues(this.dmrEntryList, 'PONumber');
        }
        else {
          this.dmrEntryList = this.OriginaldmrEntryList;
          this.dmrPoList = this.OriginaldmrPoList;
        }
      }
      else if (type == 'prTitle') {
        if (event.target.value) {
          this.dmrEntryList = this.OriginaldmrEntryList.filter(obj => obj.title.toLowerCase().includes(event.target.value.toLowerCase()))
          this.dmrPoList = this.getUniqueValues(this.dmrEntryList, 'PONumber');
        }
        else {
          this.dmrEntryList = this.OriginaldmrEntryList;
          this.dmrPoList = this.OriginaldmrPoList;
        }
      }
      else if (type == 'prNumber') {
        if (event.target.value) {
          this.dmrEntryList = this.OriginaldmrEntryList.filter(obj => obj.PRNumber.toLowerCase().includes(event.target.value.toLowerCase()))
          this.dmrPoList = this.getUniqueValues(this.dmrEntryList, 'PONumber');
        }
        else {
          this.dmrEntryList = this.OriginaldmrEntryList;
          this.dmrPoList = this.OriginaldmrPoList;
        }
      }
      else if (type == 'site') {
        if (event.target.value) {
          this.dmrEntryList = this.OriginaldmrEntryList.filter(obj => obj.Site.toLowerCase().includes(event.target.value.toLowerCase()))
          this.dmrPoList = this.getUniqueValues(this.dmrEntryList, 'PONumber');
        }
        else {
          this.dmrEntryList = this.OriginaldmrEntryList;
          this.dmrPoList = this.OriginaldmrPoList;
        }
      }
      else if (type == 'vendorName') {
        if (event.target.value) {
          this.dmrEntryList = this.OriginaldmrEntryList.filter(obj => obj.VendorName.toLowerCase().includes(event.target.value.toLowerCase()))
          this.dmrPoList = this.getUniqueValues(this.dmrEntryList, 'PONumber');
        }
        else {
          this.dmrEntryList = this.OriginaldmrEntryList;
          this.dmrPoList = this.OriginaldmrPoList;
        }
      }
      else if (type == 'PONumber') {
        if (event.target.value) {
          this.dmrEntryList = this.OriginaldmrEntryList.filter(obj => obj.PONumber.toLowerCase().includes(event.target.value.toLowerCase()))
          this.dmrPoList = this.getUniqueValues(this.dmrEntryList, 'PONumber');
        }
        else {
          this.dmrEntryList = this.OriginaldmrEntryList;
          this.dmrPoList = this.OriginaldmrPoList;
        }
      }
    }    
  }
  clearSearchField(){
    this.dmrEntryList = this.OriginaldmrEntryList;
    this.dmrPoList = this.OriginaldmrPoList;
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
            //console.log(this.Objdate);
         }
          // this.Objdate=new Date(obj.dmrdate)
          // console.log(typeof(obj.dmrdate));
          const formattedDate1 = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), this.selectedDate.getDate());
          const formattedDate2 = new Date(this.Objdate.getFullYear(), this.Objdate.getMonth(), this.Objdate.getDate());
          return formattedDate1.getTime() === formattedDate2.getTime();
        });
        this.dmrPoList = this.getUniqueValues(this.dmrEntryList, 'PONumber');
      }
      else {
        this.dmrEntryList = this.OriginaldmrEntryList;
        this.dmrPoList = this.OriginaldmrPoList;
      }
    }
  }
  downloadFile(fileName: string | undefined,list) {
    if (fileName) {
      const link = document.createElement('a');
      link.href = list?.InvoiceOrChallanDoc;
      link.download = `${fileName}.jpg`;
      link.click();
    }
  }
  updateDmr(Data:any,list:any,type:any)
  {
    if(!Data)
      return
    var flag=false;
    if(type==="DateOfReceivingDocsAtHO")
    {
      
      if( list?.DateOfDocSubmissionToAccount && list?.RemarkByAudit && list?.PaymentStatus && list?.UTR_No && list?.AccountsRemark){
          flag=true;
      }
      const form={
        DateOfReceivingDocsAtHO:Data
      }
      let combinedData={...list,...form}
      if(flag && combinedData.InvoiceNumber.length>0)
      {
        combinedData.status="completed"
      }  
      //console.log(flag)
      //console.log(combinedData)
      this.updateDmrApi(combinedData);
    } 
    else if(type==="DateOfDocSubmissionToAccount")
    {
      if( list?.DateOfReceivingDocsAtHO && list?.RemarkByAudit && list?.PaymentStatus && list?.UTR_No && list?.AccountsRemark){
        flag=true;
    }
      const form={
        DateOfDocSubmissionToAccount:Data
      }
      let combinedData={...list,...form}
      if(flag && combinedData.InvoiceNumber.length>0)
      {
        combinedData.status="completed"
      }  
      //console.log(flag)
      //console.log(combinedData)
      this.updateDmrApi(combinedData);
    }
    else if(type==="RemarkByAudit")
    {
      if( list?.DateOfReceivingDocsAtHO && list?.DateOfDocSubmissionToAccount  && list?.PaymentStatus && list?.UTR_No && list?.AccountsRemark){
        flag=true;
      }
      const form={
        RemarkByAudit:Data
      }
      let combinedData={...list,...form}
      if(flag && combinedData.InvoiceNumber.length>0)
      {
        combinedData.status="completed"
      }  
      //console.log(flag)
      //console.log(combinedData)
      this.updateDmrApi(combinedData);
    } 
    else if(type==="PaymentStatus")
    {
      if( list?.DateOfReceivingDocsAtHO && list?.DateOfDocSubmissionToAccount && list?.RemarkByAudit  && list?.UTR_No && list?.AccountsRemark){
        flag=true;
    }
      const form={
        PaymentStatus:Data
      }
      let combinedData={...list,...form}
      if(flag && combinedData.InvoiceNumber.length>0)
      {
        combinedData.status="completed"
      }  
      //console.log(flag)
      //console.log(combinedData)
      this.updateDmrApi(combinedData);
    } 
    else if(type==="UTR_No")
    {
      if( list?.DateOfReceivingDocsAtHO && list?.DateOfDocSubmissionToAccount && list?.RemarkByAudit && list?.PaymentStatus && list?.AccountsRemark){
        flag=true;
      }
      const form={
        UTR_No:Data
      }
      let combinedData={...list,...form}
      if(flag && combinedData.InvoiceNumber.length>0)
      {
        combinedData.status="completed"
      }  
      //console.log(flag)
      //console.log(combinedData)
      this.updateDmrApi(combinedData);
    } 
    else if(type==="AccountsRemark")
    {
      if( list?.DateOfReceivingDocsAtHO && list?.DateOfDocSubmissionToAccount && list?.RemarkByAudit && list?.PaymentStatus && list?.UTR_No){
        flag=true;
      }
      const form={
        AccountsRemark:Data
      }
      let combinedData={...list,...form}
      if(flag && combinedData.InvoiceNumber.length>0)
      {
        combinedData.status="completed"
      }  
      //console.log(flag)
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

        //fetching the update dmr entry list
        this.dmrServide.GetDmrEntryList().subscribe(data=>{
          this.dmrEntryList=data;
          this.OriginaldmrEntryList=data;
          this.dmrEntryList.sort((a,b)=>(a.dmrdate<b.dmrdate)?1:-1)
          this.OriginaldmrEntryList.sort((a,b)=>(a.dmrdate<b.dmrdate)?1:-1)
          //this.once()
        })
        //console.log(res)
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
  toggleDMR(poItem: any) {
    if ($(`#DMR-${poItem}`).hasClass('collapsed')) {
      $(`#DMR-${poItem}`).removeClass('collapsed');
      $(`.DMR-${poItem}`).removeClass('cl-hide');
      $(`.toggle-structure`).removeClass('collapsed');
    } else {
      $(`#DMR-${poItem}`).addClass('collapsed');
      $(`.DMR-${poItem}`).addClass('cl-hide');
    }
  }
  getdmrEntryListPOitemWise(poItem){

      const dmrListPoWise=this.dmrEntryList.filter(item=> item.PONumber==poItem)
      return dmrListPoWise.sort((a,b)=>(a.DMR_No<b.DMR_No)?-1:1)
  }
  
  once(){
    for(let i=0;i<this.dmrPoList.length;i++)
    {
      
        const itemGroup=this.formBuilder.array([]);
        (this.myGroup.get('dmr') as FormArray).push(itemGroup);

        for(let j=0;j<this.getdmrEntryListPOitemWise(this.dmrPoList[i]).length;j++)
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
          (this.myGroup.get('dmr').get(i.toString()) as FormArray).push(itemGroup);
        }
        
    }
    
  }
}
