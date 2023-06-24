import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddProjectService } from '@services/add-project.service';
import { TaskService } from '@services/task.service';
import { ToastService } from '@services/toast.service';
import { UsersService } from '@services/users.service';

@Component({
  selector: 'app-project-delete-popup',
  templateUrl: './project-delete-popup.component.html',
  styleUrls: ['./project-delete-popup.component.css']
})
export class ProjectDeletePopupComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ProjectDeletePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService:UsersService,
    private toast: ToastService,
    private taskService:TaskService,
    private projectService:AddProjectService
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

  deleteProject(){






    this.projectService.deleteProject(this.data).subscribe(
  
      {
        next: (data: any) =>  {
          console.log(data)
          this.toast.openSnackBar("Project deleted Successfully");
          this.closeDialog('yes');
          
        },
        error: (err) => {
          this.toast.openSnackBar("Something went wrong. Unable to delete project");
          
  
          
  
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
