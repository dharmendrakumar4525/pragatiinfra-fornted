import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RolesService } from '@services/roles.service';
import { ToastService } from '@services/toast.service';
import { FormGroup, Validators, AbstractControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.css']
})
export class RoleEditComponent implements OnInit {

  roleForm: FormGroup = this._fb.group({
    
    role: [null, [Validators.required, Validators.pattern('.*\\S.*[a-zA-Z ]')]],
    


  });

  constructor(private dialogRef: MatDialogRef<RoleEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roleService: RolesService,
    private _fb: FormBuilder,
    private toast: ToastService
    
  ) { }

  ngOnInit(): void {
    this.roleForm.patchValue({
      role:this.data.role

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

  editRole(){
    if (this.roleForm.invalid) {
      this.toast.openSnackBar(
        'Please Enter Role'
      );
      //this.clearForm = true;
      //this.clearForm = true;
      this.roleForm.markAllAsTouched();
      return;
    }
    this.roleService.editRole(this.roleForm.value,this.data._id).subscribe(

      {
        next: (data: any) =>  {
          console.log(data)
          this.toast.openSnackBar("Role updated Successfully");
      this.closeDialog('yes');
          // this.spinner.hide()
          // this.router.navigate(['/usersList']);
          // this.toast.openSnackBar('User Added Successfully');
          
        },
        error: (err) => {
          this.toast.openSnackBar("Something went wrong. Unable to Update Role");
          // this.spinner.hide()
          // this.toast.openSnackBar('Something went wrong, please try again later');
          // console.log(err) 
  
          // this.errorData = err
  
          
  
        }
      }
  
    )
  }

}
