import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { RATE_COMPARATIVE_API } from '@env/api_path';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import { isEmpty } from 'lodash';

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
  filter_by = "status";
  filter_value = "pending";
  requestType = "new";
  originalRateComparativeList: any = [];
  stage='rate_comparitive';
  constructor(
    private httpService: RequestService,
    private snack: SnackbarService,
  ) {
    this.getList({ filter_by: this.filter_by, filter_value: this.filter_value, stage: 'rate_comparitive' });
    console.log(this.stage)
  }

  getList(filterObj: any) {
    this.httpService.GET(RATE_COMPARATIVE_API, filterObj).subscribe({
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
    console.log(this.stage)

  }

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

  }
}
