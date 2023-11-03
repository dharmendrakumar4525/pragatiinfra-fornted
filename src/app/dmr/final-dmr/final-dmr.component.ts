import { Component, OnInit } from '@angular/core';
import { DmrService } from '@services/dmr.service';
import { RecentActivityService } from '@services/recent-activity.service';
import * as moment from 'moment';

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
  downloadFile(fileName: string | undefined,list) {
    if (fileName) {
      const link = document.createElement('a');
      link.href = list?.InvoiceOrChallanDoc;
      link.download = `${fileName}.jpg`;
      link.click();
    }
  }

}
