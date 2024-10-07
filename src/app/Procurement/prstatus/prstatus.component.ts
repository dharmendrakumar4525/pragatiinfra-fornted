import { Component, OnInit } from '@angular/core';
import { PURCHASE_REQUEST_API, PURCHASE_ORDER_API } from '@env/api_path';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import { isEmpty } from 'lodash';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-prstatus',
  templateUrl: './prstatus.component.html',
  styleUrls: ['./prstatus.component.css']
})
export class PrstatusComponent implements OnInit {

  prList:any
  allprList: any = [];
  constructor(
    private httpService: RequestService,
    private snack: SnackbarService,
  ) { }

  filterRecords(event: any) {
    //console.log(this.allpoArray,event.target.value);
    
    if (event.target.value) {
      console.log("as");
      
      this.prList = this.allprList.filter(obj => {
        obj.title.toLowerCase().includes(event.target.value.toLowerCase())});
    }
    else {
      this.prList = this.allprList
    }
  }
  
  dateFilter(event: MatDatepickerInputEvent<Date>) {
    const eventdate=new Date(event.value)
      if (event.value) {
        this.prList = this.allprList.filter(obj => {
          const reqdate = new Date(obj.expected_delivery_date);
          return reqdate.getTime() == eventdate.getTime();
          })
      }
      else {
        this.prList = this.allprList;
      }
  }
  getList() {
    this.httpService.GET(PURCHASE_ORDER_API, {}).subscribe(res => {
      console.log(res.data);
      this.prList = res.data;
      this.allprList=res.data
      // const date2 = new Date(this.allprList[1].expected_delivery_date);
      //console.log(res.data,date2.getUTCDate());
      
    })
  }

  ngOnInit(): void {
    this.getList();
  }

}
