import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { PURCHASE_REQUEST_API, GET_SITE_API, ITEM_API, UOM_API } from '@env/api_path';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import { isEmpty } from 'lodash';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-revise-purchase-request',
  templateUrl: './revise-purchase-request.component.html',
  styleUrls: ['./revise-purchase-request.component.scss']
})
export class RevisePurchaseRequestComponent implements OnInit {


  requredByMinDate = new Date();
  id: any;
  siteList: any;
  load = false;
  items: FormArray;
  uomList: any;
  itemList: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpService: RequestService,
    private snack: SnackbarService,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.getList();
  }

  purchaseRequestForm = new FormGroup({
    title: new FormControl('', Validators.required),
    date: new FormControl(moment().format('DD-MM-YYYY'), Validators.required),
    expected_delivery_date: new FormControl(moment().add(1, 'days').format('DD-MM-YYYY'), Validators.required),
    purchase_request_number: new FormControl(''),
    site: new FormControl('', Validators.required),
    local_purchase: new FormControl('yes', Validators.required),
    remarks: new FormControl(''),
    items: this.formBuilder.array([]),
    _id: new FormControl(''),
  });



  createItemArrayForm() {
    return new FormGroup({
      item_id: new FormControl('', Validators.required),
      qty: new FormControl('', Validators.required),
      category: new FormControl(null),
      subCategory: new FormControl(null),
      attachment: new FormControl(null),
      remark: new FormControl(null),
      uom: new FormControl(null),

    })

  }

  onSubmit() {
    if (this.load) {
      return
    }

    if (!this.purchaseRequestForm.valid) {
      return;
    }

    let requestData: any = this.purchaseRequestForm.value;
    requestData['date'] = moment(requestData.date, 'DD-MM-YYYY').toDate()
    requestData['expected_delivery_date'] = new Date(requestData.expected_delivery_date);
    requestData['status'] = 'revised';
    this.load = true;
    this.httpService.PUT(PURCHASE_REQUEST_API, requestData).subscribe({
      next: (resp: any) => {
        this.load = false;
        this.snack.notify("Record has been updated.", 1);
        this.router.navigate(['/procurement'])

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

  createItem(item?: any): any {
    if (item) {
      return new FormGroup({
        item_id: new FormControl(item.item_id, Validators.required),
        qty: new FormControl(item.qty, Validators.required),
        category: new FormControl(item.categoryDetail.name),
        subCategory: new FormControl(item.subCategoryDetail.subcategory_name),
        attachment: new FormControl(item.attachment),
        remark: new FormControl(item.remark),
        uom: new FormControl(item.uomDetail.uom_name),

      })
    }
    else {
      return new FormGroup({
        item_id: new FormControl('', Validators.required),
        qty: new FormControl('', Validators.required),
        category: new FormControl(''),
        subCategory: new FormControl(''),
        attachment: new FormControl(),
        remark: new FormControl(''),
        uom: new FormControl(''),

      })
    }
  }


  delete(i) {
    const remove = this.purchaseRequestForm.get('items') as FormArray;;
    remove.removeAt(i);
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
      _id: data._id
    });

    if (data.items && data.items.length > 0) {
      data.items.map((item: any) => {
        this.addItems(item);
      })
    }

    this.purchaseRequestForm.controls.remarks.disable();

  }

  addItem(): void {
    this.items = this.purchaseRequestForm.get('items') as FormArray;
    this.items.push(this.createItem());
  }

  addItems(item: any): void {

    this.items = this.purchaseRequestForm.get('items') as FormArray;
    if (item) {
      this.items.push(this.createItem(item));
    }
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.httpService.GET(`${PURCHASE_REQUEST_API}/detail`, { _id: params['id'] }).subscribe(res => {
          this.patchData(res.data[0]);
        })
      }
    });
  }

}
