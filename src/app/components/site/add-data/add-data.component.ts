import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SITE_API } from '@env/api_path';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import { isEmpty } from 'lodash';
@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss']
})
export class AddDataComponent implements OnInit {


  addForm = new FormGroup({
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
    })
  });
  constructor(
    private router: Router,
    private httpService: RequestService,
    private snack: SnackbarService,
    private route: ActivatedRoute) { }

  saveData() {
    if (this.addForm.valid) {
      this.httpService.POST(SITE_API, this.addForm.value).subscribe(res => {
        this.snack.notify("Organisation data has been saved sucessfully.", 1);
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
      this.addForm.markAllAsTouched();
    }

  }

  list() {
    this.router.navigate(['site']);
  }

  ngOnInit(): void {
  }

}
