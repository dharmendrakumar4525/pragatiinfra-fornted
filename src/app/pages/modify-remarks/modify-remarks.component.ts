import { isEmpty } from 'lodash';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from '@services/task.service';
import { FormGroup, FormBuilder, Validators, AbstractControl, NgForm } from '@angular/forms';
import { RequestService } from '@services/https/request.service';
import { PROJECT_ACTIVITY_DATA_API, PROJECT_ACTIVITY_REMARK_DATA_API } from '@env/api_path';
import { SnackbarService } from '@services/snackbar/snackbar.service';

@Component({
  selector: 'app-modify-remarks',
  templateUrl: './modify-remarks.component.html',
  styleUrls: ['./modify-remarks.component.css']
})
export class ModifyRemarksComponent implements OnInit {

  remarkForm: FormGroup = this._fb.group({

    remark: [null, [Validators.required]],
    date: [null],



  });
  constructor(
    private dialogRef: MatDialogRef<ModifyRemarksComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskService: TaskService,

    private snack: SnackbarService,
    private httpService: RequestService,
    private _fb: FormBuilder,
    // private toast: ToastService
  ) { }

  ngOnInit(): void {
    this.remarkForm.patchValue({
      remark: this.data.selectedData.remark,
      date: this.data.selectedData.date,

    })
  }

  closeDialog(status: string) {
    this.dialogRef.close({ data: {}, type: 2 })

  }

  addTask() {
    this.httpService.PUT(PROJECT_ACTIVITY_DATA_API, { _id: this.data.selectedData._id, remark: this.remarkForm.value.remark }).subscribe({
      next: (res: any) => {
        console.log("res", res);

        this.dialogRef.close({ data: res.data, type: 1 });
      }, error: (err) => {
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
      }
    })
  }

  get remark(): AbstractControl {
    return this.remarkForm.get('remark');
  }


}
