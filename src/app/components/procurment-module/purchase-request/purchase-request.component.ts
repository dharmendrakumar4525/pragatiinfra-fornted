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
@Component({
  selector: 'app-purchase-request',
  templateUrl: './purchase-request.component.html',
  styleUrls: ['./purchase-request.component.scss']
})
export class PurchaseRequestComponent implements OnInit {


  id: any;
  siteList: any;
  load = false;
  items: FormArray;
  uomList: any;
  itemList: any;
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
    items: this.formBuilder.array([this.createItemArrayForm()]),
  });



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

    console.log('requestData', requestData)

    this.load = true;
    this.httpService.POST(PURCHASE_REQUEST_API, requestData).subscribe({
      next: (resp: any) => {
        this.load = false;
        this.snack.notify("Purchase requrest has been created.", 1);

        this.router.navigate(['procurement/prList'])

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
    let data = [];
    data[i] = {
      category: this.itemList.filter(obj => obj._id == event.value)[0]?.categoryDetail.name,
      subCategory: this.itemList.filter(obj => obj._id == event.value)[0]?.subCategoryDetail.subcategory_name,
    }
    this.purchaseRequestForm.patchValue({
      items: data
    })

  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      item_id: new FormControl('', Validators.required),
      qty: new FormControl('', Validators.required),
      // intendedUse: new FormControl('', Validators.required),
      attachment: new FormControl(''),
      remark: new FormControl('', Validators.required),
      uom: new FormControl('', Validators.required),

    });
  }


  delete(i) {
    const remove = this.purchaseRequestForm.get('items') as FormArray;;
    remove.removeAt(i);
  }

  ngOnInit(): void {
    this.getList();
  }
}