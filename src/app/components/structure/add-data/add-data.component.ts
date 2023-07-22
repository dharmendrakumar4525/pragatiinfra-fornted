import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router, } from '@angular/router';
import { STRUCTURE_API } from '@env/api_path';
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
    structure_name: new FormControl('', Validators.required),
    _id: new FormControl(''),
  });

  constructor(public dialogRef: MatDialogRef<AddDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private router: Router,
    private httpService: RequestService,
    private snack: SnackbarService) {
    if (data && data.id) {
      this.httpService.GET(`${STRUCTURE_API}/detail`, { _id: data.id }).subscribe((res: any) => {
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

  }

  patchValue(data: any) {
    this.addForm.patchValue({
      structure_name: data.structure_name,
      _id: data._id

    })
  }

  onYesClick() {
    if (this.addForm.valid) {
      this.httpService.POST(STRUCTURE_API, { structure_name: this.addForm.value.structure_name }).subscribe(res => {
        this.snack.notify(" Data has been saved sucessfully.", 1);
        this.dialogRef.close({ option: 1, data: this.data });

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

  onUpdateClick() {
    if (this.addForm.valid) {
      this.httpService.PUT(STRUCTURE_API, this.addForm.value).subscribe(res => {
        this.snack.notify("Data has been saved sucessfully.", 1);
        this.dialogRef.close({ option: 1, data: this.data });
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

  onNoClick(): void {
    this.dialogRef.close({ option: 2, data: this.data });
  }


  ngOnInit(): void {
  }

}
