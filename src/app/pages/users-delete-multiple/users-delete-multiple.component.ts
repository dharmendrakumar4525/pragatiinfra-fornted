import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastService } from '@services/toast.service';
import { UsersService } from '@services/users.service';

@Component({
  selector: 'app-users-delete-multiple',
  templateUrl: './users-delete-multiple.component.html',
  styleUrls: ['./users-delete-multiple.component.css']
})
export class UsersDeleteMultipleComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<UsersDeleteMultipleComponent>,
    @Inject(MAT_DIALOG_DATA) public idArray: string[],
    private userService:UsersService,
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
    this.userService.deleteMultipleUsers(this.idArray).subscribe(

      {
        next: (data: any) =>  {
          console.log(data)
          this.toast.openSnackBar("Users deleted Successfully");
      this.closeDialog('yes');
          // this.spinner.hide()
          // this.router.navigate(['/usersList']);
          // this.toast.openSnackBar('User Added Successfully');
          
        },
        error: (err) => {
          this.toast.openSnackBar("Something went wrong. Unable to delete users");
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
