import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { PURCHASE_REQUEST_API, GET_SITE_API, ITEM_API, UOM_API } from '@env/api_path';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import { isEmpty } from 'lodash';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Component({
  selector: 'app-purchase-request-details',
  templateUrl: './purchase-request-details.component.html',
  styleUrls: ['./purchase-request-details.component.scss']
})
export class PurchaseRequestDetailsComponent implements OnInit {


  id: any;
  siteList: any;
  load = false;
  items: FormArray;
  purchaseRequestForm = new FormGroup({
    title: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    expected_delivery_date: new FormControl('', Validators.required),
    purchase_request_number: new FormControl(''),
    site: new FormControl('', Validators.required),
    local_purchase: new FormControl('', Validators.required),
    remarks: new FormControl(''),
    items: this.formBuilder.array([]),
    _id: new FormControl()
  });
  uomList: any;
  itemList: any;
  details: any = {};

  constructor(
    private router: Router,
    private httpService: RequestService,
    private snack: SnackbarService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.getList();


  }


  getList() {
    const UOM = this.http.get<any>(`${environment.api_path}${UOM_API}`);
    const item = this.http.get<any>(`${environment.api_path}${ITEM_API}`);
    const site = this.http.get<any>(`${environment.api_path}${GET_SITE_API}`);
    this.httpService.multipleRequests([UOM, item, site], {}).subscribe(res => {
      if (res) {
        this.uomList = res[0].data;
        this.itemList = res[1].data;
        this.siteList = res[2].data;
      }
    })
  }

  patchData(data) {
    this.purchaseRequestForm.patchValue({
      title: data.title,
      date: data.date,
      expected_delivery_date: data.expected_delivery_date,
      purchase_request_number: data.purchase_request_number,
      site: data.site,
      local_purchase: data.local_purchase,
      remarks: data.remarks,
    });
  }


  createItemArrayForm() {
    return new FormGroup({
      item_id: new FormControl('', Validators.required),
      qty: new FormControl('', Validators.required),
      category: new FormControl(''),
      subCategory: new FormControl(''),
      attachment: new FormControl(''),
      remark: new FormControl('', Validators.required),
      uom: new FormControl('', Validators.required),

    })

  }


  addItems(item: any): void {

    this.items = this.purchaseRequestForm.get('items') as FormArray;
    if (item) {
      this.items.push(this.createItem(item));
    }
  }

  createItem(item?: any): any {
    if (item) {
      return new FormGroup({
        item_id: new FormControl(item.item_id, Validators.required),
        qty: new FormControl(item.qty, Validators.required),
        category: new FormControl(item.categoryDetail.name),
        subCategory: new FormControl(item.subCategoryDetail.subcategory_name),
        attachment: new FormControl(item.attachment),
        remark: new FormControl(item.remark, Validators.required),
        uom: new FormControl(item.uomDetail._id, Validators.required),

      })
    }
  }

  onSubmit() {
    if (this.load) {
      return
    }

    if (!this.purchaseRequestForm.valid) {
      return;
    }

    let requestData: any = this.purchaseRequestForm.value;
    requestData['requestDate'] = moment(requestData.requestDate, 'DD-MM-YYYY').toDate()
    requestData['requiredBy'] = new Date(requestData.requiredBy)

    console.log('requestData', requestData)

    this.load = true;
    this.httpService.POST(PURCHASE_REQUEST_API, requestData).subscribe((resp: any) => {
      this.load = false;
      this.snack.notify("Purchase requrest has been created.", 1);

      this.router.navigate(['/prstatus'])

    }, (err) => {
      this.load = false;
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
    });
  }


  getSiteList() {
    this.httpService.GET(GET_SITE_API, {}).subscribe(res => {
      this.siteList = res;
    })
  }

  getItemName(id: any) {
    return this.itemList.filter(obj => obj._id == id)[0].item_name;
  }

  updateRequest(status: any) {
    this.httpService.PUT(PURCHASE_REQUEST_API, { _id: this.details._id, status: status, remarks: this.purchaseRequestForm.value.remarks }).subscribe(res => {
      this.router.navigate(['/procurement/prList'])
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.httpService.GET(`${PURCHASE_REQUEST_API}/detail`, { _id: params['id'] }).subscribe({
          next: res => {
            this.details = res.data[0];
            this.patchData(res.data[0]);
          }, error: (error) => {
            this.router.navigate(['/procurement/prList'])
          }
        })
      }
    });
  }
}
