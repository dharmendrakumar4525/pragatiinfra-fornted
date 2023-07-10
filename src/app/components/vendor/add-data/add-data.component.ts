import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ORG_REQUEST_API, PURCHASE_REQUEST_API } from '@env/api_path';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import * as moment from 'moment';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss']
})
export class AddDataComponent implements OnInit {


  orgmasterForm = new FormGroup({
    location: new FormControl('', Validators.required),
    contact_person: new FormControl("", Validators.required),
    designation: new FormControl("", Validators.required),
    dialcode: new FormControl('+91'),
    phone_number: new FormControl('', Validators.required),
    gst_number: new FormControl('', Validators.required),
    pan_number: new FormControl(''),
    attachments: new FormControl(''),
    address: new FormGroup({
      street_address: new FormControl('', Validators.required),
      street_address2: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      zip_code: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
    }),
    email: new FormControl('', [Validators.email, Validators.required]),

  });
  constructor(
    private router: Router,
    private httpService: RequestService,
    private snack: SnackbarService,
    private route: ActivatedRoute) { }

  saveData() {
    if (this.orgmasterForm.valid) {
      this.httpService.POST(ORG_REQUEST_API, this.orgmasterForm.value).subscribe(res => {
        this.snack.notify("Organisation data has been saved sucessfully.", 1);
        this.router.navigate(['organisation']);
      })
    }
    else{
      this.orgmasterForm.markAllAsTouched();
    }

  }

  list() {
    this.router.navigate(['organisation']);
  }

  ngOnInit(): void {
  }

}
