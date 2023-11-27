import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { RATE_COMPARATIVE_DETAIL_API, GET_SITE_API } from '@env/api_path';
import { RequestService } from '@services/https/request.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-rate-comparative-details',
  templateUrl: './rate-comparative-details.component.html',
  styleUrls: ['./rate-comparative-details.component.scss']
})
export class RateComparativeDetailsComponent implements OnInit {


  id: any;
  siteList: any;
  load = false;
  items: FormArray;
  purchaseRequestForm = new FormGroup({
    title: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    expected_delivery_date: new FormControl('', Validators.required),
    handle_by: new FormControl('', Validators.required),
    rate_approval_number: new FormControl(''),
    site: new FormControl('', Validators.required),
    local_purchase: new FormControl('', Validators.required),
    remarks: new FormControl('', []),
    items: this.formBuilder.array([]),
    _id: new FormControl()
  });

  details: any = {};
  vendorsList: Array<any> = [];
  vendorAssociatedData: Array<any> = [];

  constructor(
    private router: Router,
    private httpService: RequestService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,

  ) {
    this.getSiteList();
  }

  vendorData(dataObj: any) {
    let id = dataObj._id;
    if ($(`.vendor-detail-button-${id}`).hasClass('collapsed')) {
      $(`.vendor-detail-button-${id}`).removeClass('collapsed');
      $(`.vendor-detail-${id}`).removeClass('cl-show');

    } else {
      $(`.vendor-detail-button-${id}`).addClass('collapsed');
      $(`.vendor-detail-${id}`).addClass('cl-show');
    }
  }

  patchData(data) {
    this.purchaseRequestForm.patchValue({
      title: data.title,
      date: data.date,
      expected_delivery_date: data.expected_delivery_date,
      rate_approval_number: data.rate_approval_number,
      handle_by: data.handle_by,
      site: data.site,
      local_purchase: data.local_purchase,
      remarks: data.remarks,
    });

    this.purchaseRequestForm.controls['remarks'].disable();
  }


  getSiteList() {
    this.httpService.GET(GET_SITE_API, {}).subscribe(res => {
      this.siteList = res.data;
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.httpService.GET(`${RATE_COMPARATIVE_DETAIL_API}`, { _id: params['id'] }).subscribe({
          next: res => {
            this.details = res.data.details;
            this.vendorsList = res.data.vendorsList;
            this.vendorsList.map((o: any) => {
              this.vendorAssociatedData[o._id] = o;
              return o;
            });

            this.patchData(res.data.details);
          }, error: (error) => {
            this.router.navigate(['/rate-comparative'])
          }
        })
      }
    });
  }

}
