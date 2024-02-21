import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import { isEmpty } from 'lodash';
import { ORG_REQUEST_API } from '@env/api_path';
@Component({
  selector: 'app-billing-address-popup',
  templateUrl: './billing-address-popup.component.html',
  styleUrls: ['./billing-address-popup.component.scss']
})
export class BillingAddressPopupComponent implements OnInit {
  addForm = new FormGroup({
    address: new FormGroup({
      company_name: new FormControl('', Validators.required),
      gst_number: new FormControl({value: '', disabled: true}),
      pan_card: new FormControl({value: '', disabled: true}),
      street_address: new FormControl({value: '', disabled: true}, Validators.required),
      street_address2: new FormControl({value: '', disabled: true}, Validators.required),
      state: new FormControl({value: '', disabled: true}, Validators.required),
      city: new FormControl({value: '', disabled: true}, Validators.required),
      zip_code: new FormControl({value: '', disabled: true}, Validators.required),
      country: new FormControl({value: '', disabled: true}, Validators.required),
      contactPerson: new FormControl({value: '', disabled: true}, Validators.required),
      phoneNumber: new FormControl({value: '', disabled: true}, Validators.required),
    })
  });
  
  orgList: any;
  sendData:any;
  constructor(
    private dialogRef: MatDialogRef<BillingAddressPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private route: ActivatedRoute,
    private httpService: RequestService,
    private snack: SnackbarService,
  ) { 
    this.getList()
  }

  ngOnInit(): void {
  }

  addAddress() {
    // console.log(this.addForm.value)
    if (this.addForm.valid) {
      this.dialogRef.close({ data: this.sendData, type: 1 });
    }

  }

  closeDialog() {
    this.dialogRef.close({ type: 0, data: "" })
  }
  getList() {
    this.httpService.GET(ORG_REQUEST_API, {}).subscribe(res => {
      if (res && res.data) {
        this.orgList = res.data;
        console.log(this.orgList)
      }
    }, (err) => {
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

    })
  }
  companySelection(item:any)
  {
    // console.log(item);
    this.sendData=item;
    this.patchData(item)
  }
  patchData(data) {
    // console.log("hi",data);
    this.addForm.patchValue({
      address: {
        gst_number:data.gst_number,
        pan_card:data.pan_number ,
        street_address: data.address.street_address,
        street_address2:data.address.street_address2 ,
        state:data.address.state ,
        city:data.address.city,
        zip_code: data.address.zip_code,
        country:data.address.country,
        contactPerson:data.contact_person,
        phoneNumber:data.phone_number,
      }
    });
    console.log(this.addForm)
  }
  
}
