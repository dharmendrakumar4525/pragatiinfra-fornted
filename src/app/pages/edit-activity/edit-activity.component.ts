import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RolesService } from '@services/roles.service';
import { ToastService } from '@services/toast.service';
import { FormGroup, Validators, AbstractControl, NgForm } from '@angular/forms';
import { TaskService } from '@services/task.service';

@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.component.html',
  styleUrls: ['./edit-activity.component.css']
})
export class EditActivityComponent implements OnInit {

  taskForm: FormGroup = this._fb.group({
    
    taskName: [null, [Validators.required, Validators.pattern('.*\\S.*[a-zA-Z ]')]],
    


  });

  constructor(private dialogRef: MatDialogRef<EditActivityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roleService: RolesService,
    private _fb: FormBuilder,
    private toast: ToastService,
    private taskService:TaskService
    
  ) { }

  ngOnInit(): void {
    this.taskForm.patchValue({
      taskName:this.data.taskName

    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  closeDialog(status: string) {
    this.dialogRef.close(status)
    // this.dialogRef.close(status);
    // document.getElementsByClassName("animate__animated")[0].classList.remove("animate__fadeInDown")
    // document.getElementsByClassName("animate__animated")[0].classList.add("animate__fadeOutUp"); 
    //setTimeout(() => { this.dialogRef.close(status); }, 1000);
  }

  editActivity(){
    if (this.taskForm.invalid) {
      this.toast.openSnackBar(
        'Please Enter task name'
      );
      //this.clearForm = true;
      //this.clearForm = true;
      this.taskForm.markAllAsTouched();
      return;
    }
    this.taskService.editActivity(this.taskForm.value,this.data._id).subscribe(

      {
        next: (data: any) =>  {
          console.log(data)
          this.toast.openSnackBar("Activity updated Successfully");
      this.closeDialog('yes');
          // this.spinner.hide()
          // this.router.navigate(['/usersList']);
          // this.toast.openSnackBar('User Added Successfully');
          
        },
        error: (err) => {
          this.toast.openSnackBar("this activity already exits");
          // this.spinner.hide()
          // this.toast.openSnackBar('Something went wrong, please try again later');
          // console.log(err) 
  
          // this.errorData = err
  
          
  
        }
      }
  
    )
  }

}
