import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-createnewpassword',
  templateUrl: './createnewpassword.component.html',
  styleUrls: ['./createnewpassword.component.css']
})
export class CreatenewpasswordComponent implements OnInit {

  
  confirmpassword : string ="";
password : string ="";
show: boolean= false;
submit(){
console.log("emailid is " + this.confirmpassword)
console.log("emailid is " + this.password)
this.clear();
}
clear(){
this.confirmpassword ="";
this.password ="";


}
  constructor() { }

  ngOnInit(): void {
  }

}
