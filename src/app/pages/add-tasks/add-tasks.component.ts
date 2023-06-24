import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from '@services/task.service';
import { FormGroup, FormBuilder, Validators, AbstractControl, NgForm } from '@angular/forms';
import { ToastService } from '@services/toast.service';


@Component({
  selector: 'app-add-tasks',
  templateUrl: './add-tasks.component.html',
  styleUrls: ['./add-tasks.component.css']
})
export class AddTasksComponent implements OnInit {

taskForm: FormGroup = this._fb.group({
    
    taskName: [null, [Validators.required, Validators.pattern('.*\\S.*[a-zA-Z ]')]],
    


  });
  constructor(
    private dialogRef: MatDialogRef<AddTasksComponent>,
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
    if (this.taskForm.invalid) {
      // this.toast.openSnackBar(
      //   'Enter Valid Details'
      // );
      //this.clearForm = true;
      //this.clearForm = true;
      this.taskForm.markAllAsTouched();  
      return;
    }
    this.taskService.addTask(this.taskForm.value).subscribe(

      {
        next: (data: any) =>  {
          console.log(data)
          this.toast.openSnackBar("Activity Added Successfully");
      this.closeDialog('yes');
          // this.spinner.hide()
          // this.router.navigate(['/usersList']);
          // this.toast.openSnackBar('User Added Successfully');
          
        },
        error: (err) => {
          //console.log(err)
          this.toast.openSnackBar("this activity is already exits");
          // this.spinner.hide()
          // this.toast.openSnackBar('Something went wrong, please try again later');
          // console.log(err) 
  
          // this.errorData = err
  
          
  
        }
      }
  
    )
  }

  get taskName(): AbstractControl {
    return this.taskForm.get('taskName');
  }


}
