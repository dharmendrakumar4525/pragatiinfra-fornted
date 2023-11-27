import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CATEGORY_API, VENDOR_API } from '@env/api_path';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import { isEmpty } from 'lodash';
@Component({
  selector: 'app-edit-data',
  templateUrl: './edit-data.component.html',
  styleUrls: ['./edit-data.component.scss']
})
export class EditDataComponent implements OnInit {


  editForm = new FormGroup({
    vendor_name: new FormControl("", Validators.required),
    category: new FormControl([], Validators.required),
    contact_person: new FormControl("", Validators.required),
    dialcode: new FormControl('+91'),
    phone_number: new FormControl('', Validators.required),
    gst_number: new FormControl('', Validators.required),
    pan_number: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    payment_terms: new FormControl('', Validators.required),
    terms_condition: new FormControl('', Validators.required),

    address: new FormGroup({
      street_address: new FormControl('', Validators.required),
      street_address2: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      zip_code: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
    }),
    _id: new FormControl()
  });
  categoryList: any;
  constructor(
    private router: Router,
    private httpService: RequestService,
    private snack: SnackbarService,
    private route: ActivatedRoute) {
    this.httpService.GET(CATEGORY_API, {}).subscribe(res => {
      this.categoryList = res.data;
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

    this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(params['id']);
      if (params['id']) {
        this.httpService.GET(`${VENDOR_API}/detail`, { _id: params['id'] }).subscribe((res: any) => {
          console.log(res);
          if (res) {
            this.patchValue(res.data[0]);
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
      else {
        this.list();
      }
    });

  }


  patchValue(data: any) {
    this.editForm.patchValue({
      vendor_name: data.vendor_name,
      category: data.category,
      contact_person: data.contact_person,
      dialcode: data.dialcode,
      gst_number: data.gst_number,
      phone_number: data.phone_number,
      pan_number: data.pan_number,
      email: data.email,
      payment_terms: data.payment_terms,
      terms_condition: data.terms_condition,
      address: {
        street_address: data.address.street_address,
        street_address2: data.address.street_address2,
        state: data.address.state,
        city: data.address.city,
        zip_code: data.address.zip_code,
        country: data.address.country,
      },
      _id: data._id

    })
  }

  saveData() {
    if (this.editForm.valid) {
      this.httpService.PUT(VENDOR_API, this.editForm.value).subscribe(res => {
        this.snack.notify(" data has been saved sucessfully.", 1);
        this.router.navigate(['vendor']);
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
    else {
      this.editForm.markAllAsTouched();
    }


  }

  list() {
    this.router.navigate(['vendor']);
  }

  ngOnInit(): void {
  }
}
