import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from '@services/task.service';
import { FormGroup, FormBuilder, Validators, AbstractControl, NgForm } from '@angular/forms';
import { ToastService } from '@services/toast.service';
@Component({
  selector: 'app-add-sub-tasks',
  templateUrl: './add-sub-tasks.component.html',
  styleUrls: ['./add-sub-tasks.component.css']
})
export class AddSubTasksComponent implements OnInit {

  subTaskForm: FormGroup = this._fb.group({
    
    subTaskName: [null, [Validators.required, Validators.pattern('.*\\S.*[a-zA-Z ]')]]
    


  });
  constructor(
    private dialogRef: MatDialogRef<AddSubTasksComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskService: TaskService,
    private _fb: FormBuilder,
    private toast: ToastService
   // private toast: ToastService
  ) { }

  ngOnInit(): void {
  }

  closeDialog(status: string) {
    this.dialogRef.close(status)
    // this.dialogRef.close(status);
    // document.getElementsByClassName("animate__animated")[0].classList.remove("animate__fadeInDown")
    // document.getElementsByClassName("animate__animated")[0].classList.add("animate__fadeOutUp"); 
    //setTimeout(() => { this.dialogRef.close(status); }, 1000);
  }

  addTask(){
    if (this.subTaskForm.invalid) {
      // this.toast.openSnackBar(
      //   'Enter Valid Details'
      // );
      //this.clearForm = true;
      //this.clearForm = true;
      this.subTaskForm.markAllAsTouched();
      return;
    }
    this.subTaskForm.value.taskId = this.data
    this.taskService.addSubTask(this.subTaskForm.value).subscribe(

      {
        next: (data: any) =>  {
          console.log(data)
          this.toast.openSnackBar("Sub Activity Added Successfully");
      this.closeDialog('yes');
          // this.spinner.hide()
          // this.router.navigate(['/usersList']);
          // this.toast.openSnackBar('User Added Successfully');
          
        },
        error: (err) => {
          this.toast.openSnackBar("Something went wrong. Unable to Add Sub Activity");

          // this.spinner.hide()
          // this.toast.openSnackBar('Something went wrong, please try again later');
          // console.log(err) 
  
          // this.errorData = err
  
          
  
        }
      }
  
    )
  }

 

  updateSupply(){
    // this.supplyService.updateSuppliesByPk(this.data.id,
    // {
    //   status: 'PENDING_APPROVAL',
    //   status_changed_at: "now()"
    // }).
    // subscribe(success=>{
    //   this.toast.openSnackBar("This product is sent for approval");
    //   this.closeDialog('yes');
    // },failure => {
    //   this.toast.openSnackBar("Unable to send for approval");
    // })
  }

  get subTaskName(): AbstractControl {
    return this.subTaskForm.get('subTaskName');
  }

}
