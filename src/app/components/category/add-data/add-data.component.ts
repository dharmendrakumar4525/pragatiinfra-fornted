import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CATEGORY_API } from '@env/api_path';
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
    name: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required),
  });

  constructor(
    private router: Router,
    private httpService: RequestService,
    private snack: SnackbarService) { }

  saveData() {
    if (this.addForm.valid) {
      this.httpService.POST(CATEGORY_API, this.addForm.value).subscribe(res => {
        this.snack.notify(" Data has been saved sucessfully.", 1);
        this.router.navigate(['category']);
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
    this.router.navigate(['category']);
  }

  ngOnInit(): void {
  }

}
