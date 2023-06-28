import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { GET_SITE_API } from '@env/api_path';
import { RequestService } from '@services/https/request.service';

import * as moment from 'moment';

@Component({
  selector: 'app-purchaserequest',
  templateUrl: './purchaserequest.component.html',
  styleUrls: ['./purchaserequest.component.css']
})
export class PurchaserequestComponent implements OnInit {

  id: any;


  constructor(
    private formBuilder: FormBuilder,private httpService:RequestService) { }

  purchaseRequestForm = new FormGroup({
    requestTitle: new FormControl('', Validators.required),
    requestDate: new FormControl(moment().format('DD-MM-YYYY'), Validators.required),
    requiredBy: new FormControl(moment().add(1,'days').format('DD-MM-YYYY'), Validators.required),
    purchaseRequestNumber: new FormControl('', Validators.required),
    siteName: new FormControl('', Validators.required),
    localPurchase: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    newRequest: new FormControl('', Validators.required),
    remarks: new FormControl(''),
    items: this.formBuilder.array([this.createItemArrayForm(), this.createItemArrayForm(), this.createItemArrayForm()]),
  });



  createItemArrayForm(designations?) {
    return new FormGroup({
      itemId: new FormControl('', Validators.required),
      qty: new FormControl('', Validators.required),
      intendedUse: new FormControl('', Validators.required),
      attachment: new FormControl('', Validators.required),
      remark: new FormControl('', Validators.required),

    })

  }

  onSubmit() {

  }

  ngOnInit(): void {
    this.getSiteName();
  }

  getSiteName(){
    this.httpService.GET(GET_SITE_API,{}).subscribe(res=>{
      console.log(res);

    })
  }

}
