import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { PURCHASE_REQUEST_API, GET_SITE_API, ITEM_API, UOM_API } from '@env/api_path';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import { isEmpty } from 'lodash';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-purchase-request',
  templateUrl: './purchase-request.component.html',
  styleUrls: ['./purchase-request.component.scss']
})
export class PurchaseRequestComponent implements OnInit {
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
    {
      value: 'rejected',
      label: 'Rejected'
    },
    {
      value: 'revise',
      label: 'Revise'
    },
  ]
  requredByMinDate = new Date();
  id: any;
  siteList: any;
  load = false;
  items: FormArray | any = [];
  uomList: any;
  itemList: any;
  option = 1;
  purchaseList: any = [];
  filter_by = "status";
  originalPurchaseList: any = [];
  constructor(
    private router: Router,
    private httpService: RequestService,
    private snack: SnackbarService,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) { }

  purchaseRequestForm = new FormGroup({
    title: new FormControl('', Validators.required),
    date: new FormControl(moment().format('DD-MM-YYYY'), Validators.required),
    expected_delivery_date: new FormControl(moment().add(1, 'days').format('DD-MM-YYYY'), Validators.required),
    purchase_request_number: new FormControl(''),
    site: new FormControl('', Validators.required),
    local_purchase: new FormControl('yes', Validators.required),
    remarks: new FormControl(''),
    items: this.formBuilder.array([]),
  });


  onSubmit() {
    if (this.load) {
      return
    }

    if (!this.purchaseRequestForm.valid) {
      return;
    }

    let requestData: any = this.purchaseRequestForm.value;
    requestData['date'] = moment(requestData.date, 'DD-MM-YYYY').toDate()
    requestData['expected_delivery_date'] = new Date(requestData.expected_delivery_date)
    this.load = true;
    this.httpService.POST(PURCHASE_REQUEST_API, requestData).subscribe({
      next: (resp: any) => {
        this.load = false;
        this.snack.notify("Purchase requrest has been created.", 1);
        this.purchaseRequestForm.reset();
        this.purchaseRequestForm.markAsUntouched();
        this.option = 2;
        this.getPurchaseList({ filter_by: this.filter_by, filter_value: this.statusOption.value })

      }, error: (err) => {
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
      }
    });
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

  addItem(): void {
    this.items = this.purchaseRequestForm.get('items') as FormArray;
    this.items.push(this.createItem());
  }

  selectedItem(event: any, i: any) {
    let category = this.itemList.filter(obj => obj._id == event.value)[0]?.categoryDetail.name;
    let subCategory = this.itemList.filter(obj => obj._id == event.value)[0]?.subCategoryDetail.subcategory_name;
    let uom = this.itemList.filter(obj => obj._id == event.value)[0]?.uomDetail.uom_name;

    this.items.at(i).patchValue({
      category: category,
      subCategory: subCategory,
      uom: uom
    });
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      item_id: new FormControl('', Validators.required),
      qty: new FormControl('', Validators.required),
      category: new FormControl(null),
      subCategory: new FormControl(null),
      attachment: new FormControl(''),
      remark: new FormControl(''),
      uom: new FormControl(''),

    });
  }


  delete(i) {
    const remove = this.purchaseRequestForm.get('items') as FormArray;;
    remove.removeAt(i);
  }

  onStatusChange(item) {
    this.getPurchaseList({ filter_by: this.filter_by, filter_value: item.value })

  }

  getPurchaseList(filterObj: any) {
    this.httpService.GET(PURCHASE_REQUEST_API, filterObj).subscribe({
      next: (resp: any) => {
        this.originalPurchaseList = resp.data;
        this.purchaseList = resp.data;
      }, error: (err) => {
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

  dateFilter(event: MatDatepickerInputEvent<Date>) {
    if (this.originalPurchaseList && this.originalPurchaseList.length > 0) {
      if (event.value) {
        this.purchaseList = this.originalPurchaseList.filter(obj => new Date(obj.date) == new Date(event.value))
      }
      else {
        this.purchaseList = this.originalPurchaseList;
      }
    }
  }

  search(event: any, type?: any) {
    if (this.originalPurchaseList && this.originalPurchaseList.length > 0) {
      if (type == 'site') {
        if (event.target.value) {
          this.purchaseList = this.originalPurchaseList.filter(obj => obj.siteData.site_name.toLowerCase().includes(event.target.value.toLowerCase()))
        }
        else {
          this.purchaseList = this.originalPurchaseList;
        }
      }
      else {
        if (event.target.value) {
          this.purchaseList = this.originalPurchaseList.filter(obj => obj.title.toLowerCase().includes(event.target.value.toLowerCase()))
        }
        else {
          this.purchaseList = this.originalPurchaseList;
        }
      }
    }

  }



  ngOnInit(): void {
    this.getList();
    this.addItem();
  }
}
