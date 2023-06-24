import { Component, OnInit,Inject } from '@angular/core';
//import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
//import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from '@services/task.service';
import { FormGroup, FormBuilder, Validators, AbstractControl, NgForm } from '@angular/forms';
import { ToastService } from '@services/toast.service';
import { RolesService } from '@services/roles.service';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-new-role',
  templateUrl: './new-role.component.html',
  styleUrls: ['./new-role.component.css']
})
export class NewRoleComponent implements OnInit {

  roleForm: FormGroup = this._fb.group({
    
    role: [null, [Validators.required, Validators.pattern('.*\\S.*[a-zA-Z ]')]],
    


  });

  constructor(private dialogRef: MatDialogRef<NewRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roleService: RolesService,
    private _fb: FormBuilder,
    private toast: ToastService
    
  ) { }
 

  ngOnInit(): void {
    
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

  addRole(){
    if (this.roleForm.invalid) {
      this.toast.openSnackBar(
        'Please Enter Role'
      );
      //this.clearForm = true;
      //this.clearForm = true;
      this.roleForm.markAllAsTouched();
      return;
    }
    this.roleService.addRole(this.roleForm.value).subscribe(

      {
        next: (data: any) =>  {
          console.log(data)
          this.toast.openSnackBar("Role Added Successfully");
      this.closeDialog('yes');
          // this.spinner.hide()
          // this.router.navigate(['/usersList']);
          // this.toast.openSnackBar('User Added Successfully');
          
        },
        error: (err) => {
          this.toast.openSnackBar("Something went wrong. Unable to Add Role");
          // this.spinner.hide()
          // this.toast.openSnackBar('Something went wrong, please try again later');
          // console.log(err) 
  
          // this.errorData = err
  
          
  
        }
      }
  
    )
  }

}
