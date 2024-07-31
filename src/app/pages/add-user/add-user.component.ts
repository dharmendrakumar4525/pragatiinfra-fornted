import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { GET_SITE_API } from '@env/api_path';
import { RolesService } from '@services/roles.service';
import { ToastService } from '@services/toast.service';
import { UsersService } from '@services/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  hide = true;
  addUserForm: FormGroup;
  emailRegex = new RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );
  siteList: any[] = [];
  roles: any[] = [];
  phoneRegex = new RegExp(/^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private userService: UsersService,
    private toast: ToastService,
    private roleService: RolesService
  ) {}

  ngOnInit(): void {
    // Fetch roles
    this.roleService.getRoles().subscribe(data => {
      this.roles = data;
    });

    // Fetch sites
    this.http.get<any>(`${environment.api_path}${GET_SITE_API}`).subscribe(res => {
      this.siteList = res.data;
    });

    // Initialize form
    this.addUserForm = this.fb.group({
      name: [null, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      email: [null, [Validators.required, Validators.pattern(this.emailRegex)]],
      phone: [null, [Validators.required, Validators.pattern(this.phoneRegex)]],
      role: [null, [Validators.required]],
      sites: [[], Validators.required],  // Initialize as an empty array
      password: [null, [Validators.required, Validators.minLength(6)]],
      cPassword: [null, [Validators.required]]
    });
  }

  get name(): AbstractControl {
    return this.addUserForm.get('name');
  }
  get email(): AbstractControl {
    return this.addUserForm.get('email');
  }
  get phone(): AbstractControl {
    return this.addUserForm.get('phone');
  }
  get role(): AbstractControl {
    return this.addUserForm.get('role');
  }
  get password(): AbstractControl {
    return this.addUserForm.get('password');
  }
  get cPassword(): AbstractControl {
    return this.addUserForm.get('cPassword');
  }

  addUser() {
    if (this.addUserForm.invalid) {
      this.toast.openSnackBar('Enter Valid Details');
      this.addUserForm.markAllAsTouched();
      return;
    }
console.log(this.addUserForm);
    if (this.addUserForm.value.password !== this.addUserForm.value.cPassword) {
      this.toast.openSnackBar('Password and Confirm password should be same');
      this.addUserForm.markAllAsTouched();
      return;
    }

    delete this.addUserForm.value.cPassword;

    this.userService.addUser(this.addUserForm.value).subscribe({
      next: (data: any) => {
        console.log(data);
        this.toast.openSnackBar('User Created Successfully');
        this.router.navigate(['/users']);
      },
      error: (err) => {
        this.toast.openSnackBar('Something went wrong. Unable to Create User');
      }
    });
  }
}
