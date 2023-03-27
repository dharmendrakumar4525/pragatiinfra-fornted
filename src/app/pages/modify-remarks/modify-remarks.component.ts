import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from 'src/app/services/task.service';
import { FormGroup, FormBuilder, Validators, AbstractControl, NgForm } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';

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
    private _fb: FormBuilder,
    private toast: ToastService
   // private toast: ToastService
  ) { }

  ngOnInit(): void {
    this.remarkForm.patchValue({
      remark:this.data.selectedData.remark,
      date:this.data.selectedData.date
    })
  }

  closeDialog(status: string) {
    this.dialogRef.close(status)
    // this.dialogRef.close(status);
    // document.getElementsByClassName("animate__animated")[0].classList.remove("animate__fadeInDown")
    // document.getElementsByClassName("animate__animated")[0].classList.add("animate__fadeOutUp"); 
    //setTimeout(() => { this.dialogRef.close(status); }, 1000);
  }

  addTask(){
    if (this.remarkForm.invalid) {
      // this.toast.openSnackBar(
      //   'Enter Valid Details'
      // );
      //this.clearForm = true;
      //this.clearForm = true;
      this.remarkForm.markAllAsTouched();  
      return;
    }
    console.log(this.remarkForm.value)
    this.data.allData.splice(this.data.index,1,this.remarkForm.value)
    console.log(this.data.allData)
    this.taskService.modityRemarks(this.data.allData,this.data.id).subscribe(

      {
        next: (data: any) =>  {
          console.log(data)
          this.toast.openSnackBar("Remark Updated Successfully");
      this.closeDialog('yes');
          // this.spinner.hide()
          // this.router.navigate(['/usersList']);
          // this.toast.openSnackBar('User Added Successfully');
          
        },
        error: (err) => {
          //console.log(err)
          //this.toast.openSnackBar("this Remark is already exits");
          // this.spinner.hide()
           this.toast.openSnackBar('Something went wrong, please try again later');
          // console.log(err) 
  
          // this.errorData = err
  
          
  
        }
      }
  
    )
  }

  get remark(): AbstractControl {
    return this.remarkForm.get('remark');
  }


}
