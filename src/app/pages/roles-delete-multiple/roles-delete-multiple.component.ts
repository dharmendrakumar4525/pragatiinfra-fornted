import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RolesService } from '@services/roles.service';
import { ToastService } from '@services/toast.service';
import { UsersService } from '@services/users.service';
@Component({
  selector: 'app-roles-delete-multiple',
  templateUrl: './roles-delete-multiple.component.html',
  styleUrls: ['./roles-delete-multiple.component.css']
})
export class RolesDeleteMultipleComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<RolesDeleteMultipleComponent>,
    @Inject(MAT_DIALOG_DATA) public idArray: string[],
    private roleService:RolesService,
    private toast: ToastService
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
    this.roleService.deleteMultipleRoles(this.idArray).subscribe(

      {
        next: (data: any) =>  {
          console.log(data)
          this.toast.openSnackBar("Roles deleted Successfully");
      this.closeDialog('yes');
          // this.spinner.hide()
          // this.router.navigate(['/usersList']);
          // this.toast.openSnackBar('User Added Successfully');
          
        },
        error: (err) => {
          this.toast.openSnackBar("Something went wrong. Unable to delete Roles");
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
