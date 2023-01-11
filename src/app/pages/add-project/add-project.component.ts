import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, NgForm } from '@angular/forms';
import { MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatDialog } from '@angular/material/dialog';
import { AddTasksComponent } from '../add-tasks/add-tasks.component';
import { TaskService } from 'src/app/services/task.service';
import { AddSubTasksComponent } from '../add-sub-tasks/add-sub-tasks.component';

export interface Fruit {
  name: string;
}
@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: Fruit[] = [
    {name: 'Lemon'},
    {name: 'Lime'},
    {name: 'Apple'},
  ];

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
  tasks:any;
  constructor(private _fb: FormBuilder, private _dialog: MatDialog,private taskService: TaskService,) { }

  ngOnInit(): void {
  
      this.taskService.getTasks().subscribe(data=>{
        //this.spinner.hide()
        this.tasks = data
        console.log(this.tasks)
      })
    
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  addTask() {
    const dialogRef = this._dialog.open(AddTasksComponent, {
      width: '30%',
      panelClass: ['custom-modal', 'animate__animated', 'animate__fadeInDown']
      //data: supply
    });
    dialogRef.afterClosed().subscribe(status => {
      console.log(status);
      if (status === 'yes') {
       // this.filterSubject.next(this.filterForm.value);
      }
      if (status === 'no') {
      }
    })
  }

  addSubTask(taskId:any){
    const dialogRef = this._dialog.open(AddSubTasksComponent, {
      width: '30%',
      panelClass: ['custom-modal', 'animate__animated', 'animate__fadeInDown'],
      data: taskId
    });
    dialogRef.afterClosed().subscribe(status => {
      console.log(status);
      if (status === 'yes') {
       // this.filterSubject.next(this.filterForm.value);
      }
      if (status === 'no') {
      }
    })
  }
}
