import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {


  
  email : string ="";
password : string ="";
show: boolean= false;
submit(){
console.log("emailid is " + this.email)
this.clear();
}
clear(){
this.email ="";


}
  constructor() { }

  ngOnInit(): void {
  }

}
