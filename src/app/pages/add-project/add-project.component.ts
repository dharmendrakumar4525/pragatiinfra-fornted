import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {


  memberShipForm: FormGroup = this._fb.group({
    membershipType: [null, [Validators.required]],
   // membership: [null],
    membershipPlan: [null, [Validators.required]],
    firstName: [null, [Validators.required, Validators.pattern('.*\\S.*[a-zA-Z ]')]],
    lastName: [null, [Validators.required, Validators.pattern('.*\\S.*[a-zA-Z ]')]],
    speciality: [null, [Validators.required, Validators.pattern('.*\\S.*[a-zA-Z ]')]],
    password: [null, [Validators.required, Validators.minLength(6)]],
    confPassword: [null, [Validators.required]],
  //  address: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.pattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)]],
    phone: [null, [Validators.required, Validators.pattern(/^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/)]],
    profileUrl: [null],
    studentDetails:[null],
    addressLineOne:[null,[Validators.required]],
    addressLineTwo:[null,[Validators.required]],
    city:[null,[Validators.required]],
    state:[null,[Validators.required]],
    postalCode:[null,[Validators.required]]


  });
  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
  }

  

}
