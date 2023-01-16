import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, NgForm } from '@angular/forms';
import { MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatDialog } from '@angular/material/dialog';
import { AddTasksComponent } from '../add-tasks/add-tasks.component';
import { TaskService } from 'src/app/services/task.service';
import { AddSubTasksComponent } from '../add-sub-tasks/add-sub-tasks.component';
import { AddProjectService } from 'src/app/services/add-project.service';

export interface Fruit {
  name: string;
}
export interface MatchData {
  id:string
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
  selection: any[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: Fruit[] = [
    {name: 'Lemon'},
    {name: 'Lime'},
    {name: 'Apple'},
  ];
  
  projectForm: FormGroup = this._fb.group({
    projectName: [null, [Validators.required]],
   // membership: [null],
   projectDate: [null, [Validators.required]],
   location: [null],
   fruits: this._fb.array(["Lemon", "Lime", "Apple"]),
   r0Date: [null],
   r1Date: [null],
   r2Date: [null],
  //  address: [null, [Validators.required]],

  });
  tasks:any;
  constructor(private _fb: FormBuilder, private _dialog: MatDialog,private taskService: TaskService,
    private projectService: AddProjectService,) { }

  ngOnInit(): void {
  
      this.taskService.getTasks().subscribe(data=>{
        //this.spinner.hide()
        this.tasks = data
        console.log(this.tasks)
      })
    
  }

  get courseIds() { 
    return this.projectForm.get('courseIds');
}

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push({name: value.trim()});
      // this.courseIds.value.push(value);

      // this.courseIds.updateValueAndValidity();
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
  getSelection(item:any,task:any) {
    return this.selection.findIndex(s => s._id === item._id) !== -1;
  }

  changeHandler(item: any, task:any) {
    item.taskName = task.taskName
    const id = item._id;
    
    console.log(task)

    const index = this.selection.findIndex(u => u._id === id);
    if (index === -1) {
      // ADD TO SELECTION
      // this.selection.push(item);
      this.selection = [...this.selection, item];
    } else {
      // REMOVE FROM SELECTION
      this.selection = this.selection.filter(user => user._id !== item._id)
      // this.selection.splice(index, 1)
    }
  }

  save() {
    console.log(this.selection);
  }

  addProject(){
    console.log(this.selection);
    this.projectForm.value.sections = this.selection
    this.projectService.addProject(this.projectForm.value).subscribe(

      {
        next: (data: any) =>  {
          console.log(data)
          // this.spinner.hide()
          // this.router.navigate(['/usersList']);
          // this.toast.openSnackBar('User Added Successfully');
          
        },
        error: (err) => {
          // this.spinner.hide()
          // this.toast.openSnackBar('Something went wrong, please try again later');
          // console.log(err) 
  
          // this.errorData = err
  
          
  
        }
      }
  
    )

  }
}
