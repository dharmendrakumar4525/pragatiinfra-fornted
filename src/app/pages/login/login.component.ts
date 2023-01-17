import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  email : string ="";
password : string ="";
show: boolean= false;
submit(){
console.log("emailid is " + this.email)
this.clear();
}
clear(){
this.email ="";
this.password = "";

}
  constructor() { }

  ngOnInit(): void {

    
  }
  

}
