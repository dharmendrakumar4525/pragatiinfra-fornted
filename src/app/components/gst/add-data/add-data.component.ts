import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GST_API } from '@env/api_path';
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
    gst_name: new FormControl('', Validators.required),
    gst_percentage: new FormControl('', [Validators.required, Validators.max(33), Validators.min(0)]),
  });

  constructor(
    private router: Router,
    private httpService: RequestService,
    private snack: SnackbarService) { }

  saveData() {
    if (this.addForm.valid) {
      this.httpService.POST(GST_API, this.addForm.value).subscribe(res => {
        this.snack.notify(" Data has been saved sucessfully.", 1);
        this.router.navigate(['gst']);
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
    this.router.navigate(['gst']);
  }

  ngOnInit(): void {
  }

}
