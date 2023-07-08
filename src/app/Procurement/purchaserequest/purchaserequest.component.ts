import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { PURCHASE_REQUEST_API, GET_SITE_API } from '@env/api_path';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import { isEmpty } from 'lodash';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchaserequest',
  templateUrl: './purchaserequest.component.html',
  styleUrls: ['./purchaserequest.component.css']
})
export class PurchaserequestComponent implements OnInit {

  id: any;
  siteList: any;
  load = false;
  items: FormArray;
  constructor(
    private router: Router,
    private httpService: RequestService,
    private snack: SnackbarService,
    private formBuilder: FormBuilder
  ) { }

  purchaseRequestForm = new FormGroup({
    requestTitle: new FormControl('', Validators.required),
    requestDate: new FormControl(moment().format('DD-MM-YYYY'), Validators.required),
    requiredBy: new FormControl(moment().add(1, 'days').format('DD-MM-YYYY'), Validators.required),
    purchaseRequestNumber: new FormControl(''),
    siteName: new FormControl('', Validators.required),
    localPurchase: new FormControl('yes', Validators.required),
    remarks: new FormControl(''),
    items: this.formBuilder.array([this.createItemArrayForm(), this.createItemArrayForm(), this.createItemArrayForm()]),
  });



  createItemArrayForm() {
    return new FormGroup({
      itemId: new FormControl('', Validators.required),
      qty: new FormControl('', Validators.required),
      // intendedUse: new FormControl('', Validators.required),
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

  addItem(): void {
    this.items = this.purchaseRequestForm.get('items') as FormArray;
    this.items.push(this.createItem());
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      itemId: new FormControl('', Validators.required),
      qty: new FormControl('', Validators.required),
      // intendedUse: new FormControl('', Validators.required),
      attachment: new FormControl(''),
      remark: new FormControl('', Validators.required),
      uom: new FormControl('', Validators.required),

    });
  }

  ngOnInit(): void {
    this.getSiteList();
  }

}
