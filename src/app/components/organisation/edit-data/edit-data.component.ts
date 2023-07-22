import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ORG_REQUEST_API } from '@env/api_path';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import { isEmpty } from 'lodash';
@Component({
  selector: 'app-edit-data',
  templateUrl: './edit-data.component.html',
  styleUrls: ['./edit-data.component.scss']
})
export class EditDataComponent implements OnInit {


  orgmasterForm = new FormGroup({
    location: new FormControl('', Validators.required),
    contact_person: new FormControl("", Validators.required),
    designation: new FormControl("", Validators.required),
    dialcode: new FormControl('+91'),
    phone_number: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
    gst_number: new FormControl('', Validators.required),
    pan_number: new FormControl(''),
    attachments: new FormControl(''),
    address: new FormGroup({
      street_address: new FormControl('', Validators.required),
      street_address2: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      zip_code: new FormControl('', [Validators.required, Validators.maxLength(6), Validators.minLength(6)]),
      country: new FormControl('', Validators.required),
    }),
    email: new FormControl('', [Validators.email, Validators.required]),
    _id: new FormControl()
  });
  constructor(
    private router: Router,
    private httpService: RequestService,
    private snack: SnackbarService,
    private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(params['id']);
      if (params['id']) {
        this.httpService.GET(`${ORG_REQUEST_API}/detail`, { _id: params['id'] }).subscribe((res: any) => {
          console.log(res);
          if (res) {
            this.patchValue(res.data);
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
    this.orgmasterForm.patchValue({
      location: data.location,
      contact_person: data.contact_person,
      designation: data.designation,
      dialcode: data.dialcode,
      phone_number: data.phone_number,
      gst_number: data.gst_number,
      pan_number: data.pan_number,
      attachments: data.attachments,
      address: {
        street_address: data.address.street_address,
        street_address2: data.address.street_address2,
        state: data.address.state,
        city: data.address.city,
        zip_code: data.address.zip_code,
        country: data.address.country,
      },
      email: data.email,
      _id: data._id

    })
  }

  saveData() {
    if (this.orgmasterForm.valid) {
      this.httpService.PUT(ORG_REQUEST_API, this.orgmasterForm.value).subscribe(res => {
        this.snack.notify("Organisation data has been saved sucessfully.", 1);
        this.router.navigate(['organisation']);
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
      this.orgmasterForm.markAllAsTouched();
    }


  }

  list() {
    this.router.navigate(['organisation']);
  }

  ngOnInit(): void {
  }
}
