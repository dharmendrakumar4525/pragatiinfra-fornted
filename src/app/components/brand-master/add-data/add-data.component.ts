import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router, } from '@angular/router';
import { LOCATION_API } from '@env/api_path';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import { isEmpty } from 'lodash';
@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss']
})
export class BrandAddDataComponent implements OnInit {
  addForm = new FormGroup({
    brand_name: new FormControl('',{
      validators: [Validators.required],
      asyncValidators: [this.brandNameExists.bind(this)],
      updateOn: 'blur', // Validate on blur, or you can use 'change'
    }),
    _id: new FormControl(''),
  });

  constructor(public dialogRef: MatDialogRef<BrandAddDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private router: Router,
    private httpService: RequestService,
    private snack: SnackbarService) {
    if (data && data.id) {
      this.httpService.GET('/brand/detail', { _id: data.id }).subscribe((res: any) => {
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
     // Add value transformation for brand_name control
     this.addForm.get('brand_name')?.valueChanges.subscribe((value) => {
      this.addForm.patchValue({
        brand_name: value.toUpperCase(),
      }, { emitEvent: false });

      // Update value and trigger validation
      this.addForm.get('brand_name')?.updateValueAndValidity({ emitEvent: false });
    });

  }
  brandNameExists(control: FormControl) {
    return new Promise<any>((resolve) => {
      const brandName = control.value;
      if (this.data.list.some(item => item.brand_name === brandName)) {
        resolve({ brandNameExists: true }); // Validation failed
      } else {
        resolve(null); // Validation passed
      }
    });
  }
  patchValue(data: any) {
    this.addForm.patchValue({
      brand_name: data.brand_name,
      _id: data._id

    })
  }

  onYesClick() {
    if (this.addForm.valid) {
      this.httpService.POST('/brand', { brand_name: this.addForm.value.brand_name }).subscribe(res => {
        this.snack.notify(" Brand has been add sucessfully.", 1);
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
      this.httpService.PUT('/brand', this.addForm.value).subscribe(res => {
        this.snack.notify("Data has been updated sucessfully.", 1);
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
