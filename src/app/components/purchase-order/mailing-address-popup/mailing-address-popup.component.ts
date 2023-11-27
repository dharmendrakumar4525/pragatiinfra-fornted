import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-mailing-address-popup',
  templateUrl: './mailing-address-popup.component.html',
  styleUrls: ['./mailing-address-popup.component.scss']
})
export class MailingAddressPopupComponent implements OnInit {

  addForm = new FormGroup({
    address: new FormGroup({
      street_address: new FormControl('', Validators.required),
      street_address2: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      zip_code: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
    })
  });
  constructor() { }

  ngOnInit(): void {
  }

}
