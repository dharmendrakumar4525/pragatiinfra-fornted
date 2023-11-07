import { Component, OnInit } from '@angular/core';
import { DmrService } from '@services/dmr.service';
import { RecentActivityService } from '@services/recent-activity.service';
import * as moment from 'moment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-final-dmr',
  templateUrl: './final-dmr.component.html',
  styleUrls: ['./final-dmr.component.css']
})
export class FinalDmrComponent implements OnInit {
  recentActivities: any;
  recentActivitiesLen: any;
  finalDmrList:any=[];
  OriginalfinalDmrList:any=[];
  selectedOption:String="FilterByDmrId"
  selectedDate: Date ;
  Objdate: Date ;
  constructor(
    private recentActivityService: RecentActivityService,
    private dmrServide:DmrService,
    ) {
    this.recentActivityService.getRecentAtivities().subscribe(data => {
      this.recentActivities = data
      for (let single of this.recentActivities) {
        single.time = moment(single.createdAt).fromNow()
      }
      this.recentActivitiesLen = this.recentActivities.length
    });
    this.dmrServide.GetDmrEntryList().subscribe(data=>{
      this.finalDmrList=data;
      this.OriginalfinalDmrList=data;
      this.finalDmrList.sort((a,b)=>(a.DMR_No<b.DMR_No)?1:-1)
      this.finalDmrList=this.finalDmrList.filter(item=> item.status==="completed")
      
      this.OriginalfinalDmrList.sort((a,b)=>(a.DMR_No<b.DMR_No)?1:-1)
      this.OriginalfinalDmrList=this.OriginalfinalDmrList.filter(item=> item.status==="completed")


      console.log(this.finalDmrList)

  })
   }

  ngOnInit(): void {
  }
  search(event: any, type?: any) {
    if (this.OriginalfinalDmrList && this.OriginalfinalDmrList.length > 0) {
      
      if(type=='DMRID'){
        if (event.target.value) {
          this.finalDmrList = this.OriginalfinalDmrList.filter(obj => obj.DMR_No.toLowerCase().includes(event.target.value.toLowerCase()))
        }
        else {
          this.finalDmrList = this.OriginalfinalDmrList;
        }
      }
      else if (type == 'prTitle') {
        if (event.target.value) {
          this.finalDmrList = this.OriginalfinalDmrList.filter(obj => obj.title.toLowerCase().includes(event.target.value.toLowerCase()))
        }
        else {
          this.finalDmrList = this.OriginalfinalDmrList;
        }
      }
      else if (type == 'prNumber') {
        if (event.target.value) {
          this.finalDmrList = this.OriginalfinalDmrList.filter(obj => obj.PRNumber.toLowerCase().includes(event.target.value.toLowerCase()))
        }
        else {
          this.finalDmrList = this.OriginalfinalDmrList;
        }
      }
      else if (type == 'vendorName') {
        if (event.target.value) {
          this.finalDmrList = this.OriginalfinalDmrList.filter(obj => obj.VendorName.toLowerCase().includes(event.target.value.toLowerCase()))
        }
        else {
          this.finalDmrList = this.OriginalfinalDmrList;
        }
      }
      else if (type == 'PONumber') {
        if (event.target.value) {
          this.finalDmrList = this.OriginalfinalDmrList.filter(obj => obj.PONumber.toLowerCase().includes(event.target.value.toLowerCase()))
        }
        else {
          this.finalDmrList = this.OriginalfinalDmrList;
        }
      }
    }    
  }
  clearSearchField(){
    this.finalDmrList = this.OriginalfinalDmrList;
  }
  dateFilter(event: MatDatepickerInputEvent<Date>) {
    if (this.OriginalfinalDmrList && this.OriginalfinalDmrList.length > 0) {
      if (event.target.value) {
        this.selectedDate = new Date(event.target.value);
        this.finalDmrList = this.OriginalfinalDmrList.filter(obj => {
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
      }
      else {
        this.finalDmrList = this.OriginalfinalDmrList;
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

}
