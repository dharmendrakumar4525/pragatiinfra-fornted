import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastService } from '@services/toast.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {


  emailRegex = new RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );
  forgotPasswordForm: FormGroup;
  showMsg : boolean = false
//   email : string ="";
// password : string ="";
// show: boolean= false;
// submit(){
// console.log("emailid is " + this.email)
// this.clear();
// }
// clear(){
//this.email ="";


//}
  constructor(private _fb: FormBuilder, private toast:ToastService) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this._fb.group({
      
      email: [null, [Validators.required, Validators.pattern(this.emailRegex)]],
      

      
    });
  }

  get email(): AbstractControl {
    return this.forgotPasswordForm.get('email');
  }

  forgotPassword(){

    if (this.forgotPasswordForm.invalid) {
      this.toast.openSnackBar(
        'Enter Email Details'
      );
      //this.clearForm = true;
      //this.clearForm = true;
      this.forgotPasswordForm.markAllAsTouched();
      return;
    }

    this.showMsg = true

  }

}
