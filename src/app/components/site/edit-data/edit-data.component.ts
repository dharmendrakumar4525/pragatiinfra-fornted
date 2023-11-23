import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SITE_API } from '@env/api_path';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import { UsersService } from '@services/users.service';
import { isEmpty } from 'lodash';
@Component({
  selector: 'app-edit-data',
  templateUrl: './edit-data.component.html',
  styleUrls: ['./edit-data.component.scss']
})
export class EditDataComponent implements OnInit {


  editForm = new FormGroup({
    location: new FormControl('', Validators.required),
    site_name: new FormControl("", Validators.required),
    code: new FormControl("", Validators.required),
    store_manager: new FormControl("", Validators.required),
    store_manager_phone_number_dialcode: new FormControl('+91'),
    store_manager_phone_number: new FormControl('', Validators.required),
    site_manager_email: new FormControl('', [Validators.email, Validators.required]),
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
  users: any = [];
  constructor(
    private router: Router,
    private httpService: RequestService,
    private snack: SnackbarService,
    private route: ActivatedRoute,
    private userService: UsersService,) {
    this.userService.getUserss().subscribe(data => {
      this.users = data;
      this.getDetails();
    })


  }

  getDetails() {
    this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(params['id']);
      if (params['id']) {
        this.httpService.GET(`${SITE_API}/detail`, { _id: params['id'] }).subscribe((res: any) => {
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
    console.log("this.users", this.users);

    let user = this.users.filter(res => {
      console.log(res);

      if (res.phone == data.store_manager_phone_number) {
        console.log(res);

        return res;
      }
    });
    this.editForm.patchValue({
      location: data.location ? data.location : '',
      site_name: data.site_name ? data.site_name : '',
      code: data.code ? data.code : '',
      store_manager: user[0] && user[0].name ? user[0].name : (data.store_manager ? data.store_manager : ''),
      store_manager_phone_number_dialcode: '+91',
      store_manager_phone_number: data.store_manager_phone_number ? data.store_manager_phone_number : '',
      site_manager_email: data.site_manager_email ? data.site_manager_email : '',
      address: {
        street_address: data.address.street_address ? data.address.street_address : '',
        street_address2: data.address.street_address2 ? data.address.street_address2 : '',
        state: data.address.state ? data.address.state : '',
        city: data.address.city ? data.address.city : '',
        zip_code: data.address.zip_code ? data.address.zip_code : '',
        country: data.address.country ? data.address.country : '',
      },
      _id: data._id

    })
  }

  saveData() {
    if (this.editForm.valid) {
      this.httpService.PUT(SITE_API, this.editForm.value).subscribe(res => {
        this.snack.notify("site data has been saved sucessfully.", 1);
        this.router.navigate(['site']);
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
    this.router.navigate(['site']);
  }

  manageChange(event) {
    let user = this.users.filter(res => res._id == event);
    this.editForm.patchValue({
      store_manager_phone_number: user[0].phone,
      site_manager_email: user[0].email

    })
  }

  ngOnInit(): void {
  }
}
