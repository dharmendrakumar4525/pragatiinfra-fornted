import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RolesService } from '@services/roles.service';
import { TaskService } from '@services/task.service';
import { ToastService } from '@services/toast.service';
import { UsersService } from '@services/users.service';

@Component({
  selector: 'app-task-delete-mul-activity',
  templateUrl: './task-delete-mul-activity.component.html',
  styleUrls: ['./task-delete-mul-activity.component.css']
})
export class TaskDeleteMulActivityComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<TaskDeleteMulActivityComponent>,
    @Inject(MAT_DIALOG_DATA) public idArray: string[],
    private roleService:RolesService,
    private toast: ToastService,
    private taskService:TaskService
  ) { }

/* ---------------------------- Life cycle hooks ---------------------------- */

  ngOnInit(): void {
  }

/* ------------------------------ Close Dialog ------------------------------ */

  closeDialog(status: string) {
    // this.dialogRef.close(status);
    document.getElementsByClassName("animate__animated")[0].classList.remove("animate__fadeInDown")
    document.getElementsByClassName("animate__animated")[0].classList.add("animate__fadeOutUp"); 
    setTimeout(() => { this.dialogRef.close(status); }, 200);
  }

  deleteMultiple(){
    this.taskService.deleteMultipleActivities(this.idArray).subscribe(

      {
        next: (data: any) =>  {
          console.log(data)
          this.toast.openSnackBar("Activities deleted Successfully");
      this.closeDialog('yes');
          // this.spinner.hide()
          // this.router.navigate(['/usersList']);
          // this.toast.openSnackBar('User Added Successfully');
          
        },
        error: (err) => {
          this.toast.openSnackBar("Something went wrong. Unable to delete Activities");
          // this.spinner.hide()
          // this.toast.openSnackBar('Something went wrong, please try again later');
          // console.log(err) 
  
          // this.errorData = err
  
          
  
        }
      }
  
    )
    // this.userService.deleteMultipleUsers(this.idArray).
    // subscribe(success=>{
    //   this.toast.openSnackBar("This product is deleted successfully");
    //   this.closeDialog('yes');
    // },failure => {
    //   this.toast.openSnackBar("Unable to send for approval");
    // })
  }

}
