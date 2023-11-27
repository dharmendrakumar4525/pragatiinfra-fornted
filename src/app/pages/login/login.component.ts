import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '@services/toast.service';
import { UsersService } from '@services/users.service';
import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  emailRegex = new RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );
  loginForm: FormGroup;
  hide = true;
show: boolean= false;

  constructor(
    private _fb: FormBuilder,private router: Router,
    private userService:UsersService,private toast:ToastService,
    private auth: AuthService
    ) { }

  ngOnInit(): void {

    this.loginForm = this._fb.group({

      email: [null, [Validators.required, Validators.pattern(this.emailRegex)]],
      password: [null, [Validators.required, Validators.minLength(6)]],



    });


  }


  get email(): AbstractControl {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }


  async login():Promise<void>{

    if (this.loginForm.invalid) {
      this.toast.openSnackBar(
        'Enter Valid Details'
      );

      this.loginForm.markAllAsTouched();
      return;
    }

    const login = this.loginForm.value

    this.userService.loginWithEmailPassword(login).subscribe(

      {
        next: (data: any) =>  {
          console.log(data)

          this.toast.openSnackBar('You logged in Successfully');
          this.afterSuccessLogin(data, login);

          this.auth.setToken(data['token']);
          this.auth.setUser(data['user']);
          this.auth.setPermission(data['module_permissions']);
          this.auth.setModules(data['modules']);

          this.userService.updateDashboard('dashboard');
           this.router.navigate(['/dpr']);


        },
        error: (err) => {
          this.toast.openSnackBar('Invalid Credentials');
        }
      }

    )
    // try {
    //   const login = this.loginForm.value
    //   //const loginType = this.loginType.value;
    //   const response =  await this.userService.loginWithEmailPassword(login)
    //   this.afterSuccessLogin(response, login);
    // } catch (error) {
    //   console.log(error);
    //   this.toast.openSnackBar('Invalid Credentials');
    // }

  }

  afterSuccessLogin(response: any, login): void {
    //console.log(response);

      localStorage.setItem('loginData', JSON.stringify(response));

    this.router.navigate(['/dpr']);
  }


}
