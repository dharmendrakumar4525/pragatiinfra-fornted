import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RolesService } from '@services/roles.service';
import { ToastService } from '@services/toast.service';
import { UsersService } from '@services/users.service';
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  hide = true;
  editUserForm: FormGroup;

  emailRegex = new RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );
  roles:any
  user:any;
  phoneRegex = new RegExp(/^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/);
  constructor( private activeRoute: ActivatedRoute,private _fb: FormBuilder,private router: Router,private userService:UsersService,private toast:ToastService, private roleService:RolesService) { }

  ngOnInit(): void {

    this.activeRoute.params.subscribe((params:any) => {


      this.userService.getUserById(params.id).subscribe(data=>{
        this.user = data

        this.editUserForm.patchValue({
          name:this.user.name,
            email:this.user.email,
            role:this.user.role,
            phone:this.user.phone,
        })

    console.log(this.user)
    })

    });

    this.roleService.getRoles().subscribe(data=>{
      this.roles = data
      
    })

    this.editUserForm = this._fb.group({
      name: [null, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      email: [null, [Validators.required, Validators.pattern(this.emailRegex)]],
      phone: [null, [Validators.required, Validators.pattern(this.phoneRegex)]],
      role: [null, [Validators.required]],
      password: [null]
      

      
    });
  }

  get name(): AbstractControl {
    return this.editUserForm.get('name');
  }
  get email(): AbstractControl {
    return this.editUserForm.get('email');
  }
  get phone(): AbstractControl {
    return this.editUserForm.get('phone');
  }
  get role(): AbstractControl {
    return this.editUserForm.get('role');
  }
  // get password(): AbstractControl {
  //   return this.addUserForm.get('password');
  // }
  // get cPassword(): AbstractControl {
  //   return this.addUserForm.get('cPassword');
  // }

  updateUser(){
    if (this.editUserForm.invalid) {
      this.toast.openSnackBar(
        'Enter Valid Details'
      );
      //this.clearForm = true;
      //this.clearForm = true;
      this.editUserForm.markAllAsTouched();
      return;
    }



    this.userService.editUser(this.editUserForm.value,this.user._id).subscribe(

      {
        next: (data: any) =>  {
          console.log(data)
         
          this.toast.openSnackBar('User Updated Successfully');
           this.router.navigate(['/users']);
           
          
        },
        error: (err) => {
          this.toast.openSnackBar("Something went wrong. Unable to Update User");
          
  
          
  
        }
      }
  
    )
  }

}
