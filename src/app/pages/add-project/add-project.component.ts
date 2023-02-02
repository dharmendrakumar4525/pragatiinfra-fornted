import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, NgForm } from '@angular/forms';
import { MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatDialog } from '@angular/material/dialog';
import { AddTasksComponent } from '../add-tasks/add-tasks.component';
import { TaskService } from 'src/app/services/task.service';
import { AddSubTasksComponent } from '../add-sub-tasks/add-sub-tasks.component';
import { AddProjectService } from 'src/app/services/add-project.service';
import { ToastService } from 'src/app/services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NoPermissionsComponent } from '../no-permissions/no-permissions.component';

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
  showMaster:boolean = false
  showAddProject:boolean = true
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  selection: any[] = [];
  imageUrl = null
  subTaskName = [];
  aa:boolean=false;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  
  
  projectForm: FormGroup = this._fb.group({
   projectName: [null, [Validators.required]],
   projectDate: [null, [Validators.required]],
   location: [null,[Validators.required]],
   r0Date: [null],
   r1Date: [null],
   r2Date: [null],
   members: [[]]
  

  });
  tasks:any;
  projectId:any;
  tasksData:any;
  permissions:any;
  projectsPermissions:any
  constructor(private _fb: FormBuilder, private toast: ToastService, private _dialog: MatDialog,private taskService: TaskService,
    private projectService: AddProjectService,private activeRoute: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.permissions = JSON.parse(localStorage.getItem('loginData'))
    console.log(this.permissions)
    this.projectsPermissions = this.permissions.permissions[0]?.ParentChildchecklist[0]?.childList[0]
    if(!this.projectsPermissions?.isSelected){
      const dialogRef = this._dialog.open(NoPermissionsComponent, {
        width: '30%',
        panelClass: ['custom-modal', 'animate__animated', 'animate__fadeInDown'],
        data: "you don't have permissions to add project"
      });
      //return;
    }
    //this.progressPermissionsEdit = this.permissions.permissions[0].ParentChildchecklist[1].childList[0]
    //console.log(this.progressPermissionsView)
    //console.log(this.progressPermissionsEdit)
    this.activeRoute.params.subscribe((params:any) => {
      console.log(params.id)
      this.projectId = params.id
      
      if(this.projectId == undefined){
        this.projectId = null
      }
      if(this.projectId){
        this.showMaster = true;
    this.showAddProject  = false
      }
    });

      this.taskService.getTasks().subscribe(data=>{
        //this.spinner.hide()
        this.tasks = data
        console.log(this.tasks)
      })
    
      this.taskService.getOnlyTasks().subscribe(data=>{
        this.tasksData = data
        console.log(this.tasksData)
      })
  }

  get courseIds() { 
    return this.projectForm.get('courseIds');
}

addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
     // this.tags.push({name: value.trim()});
      // this.courseIds.value.push(value);
      this.projectForm.controls['members'].setValue([...this.projectForm.controls['members'].value, value.trim()]);
      this.projectForm.controls['members'].updateValueAndValidity();
      // this.courseIds.updateValueAndValidity();
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeTag(tag: string): void {
    const index = this.projectForm.controls['members'].value.indexOf(tag);

    if (index >= 0) {
      this.projectForm.controls['members'].value.splice(index, 1);
      this.projectForm.controls['members'].updateValueAndValidity();
    }
  }
  // remove(fruit: Fruit): void {
  //   const index = this.tags.indexOf(fruit);

  //   if (index >= 0) {
  //     this.tags.splice(index, 1);
  //   }
  // }

  addTask() {
    const dialogRef = this._dialog.open(AddTasksComponent, {
      width: '30%',
      panelClass: ['custom-modal', 'animate__animated', 'animate__fadeInDown']
      //data: supply
    });
    dialogRef.afterClosed().subscribe(status => {
      console.log(status);
      if (status === 'yes') {
        this.taskService.getTasks().subscribe(data=>{
          //this.spinner.hide()
          this.tasks = data
          console.log(this.tasks)
        })
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
        this.taskService.getTasks().subscribe(data=>{
          //this.spinner.hide()
          this.tasks = data
          console.log(this.tasks)
        })
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
    
   // console.log(task)

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

    if(!this.projectsPermissions?.isSelected){
      const dialogRef = this._dialog.open(NoPermissionsComponent, {
        width: '30%',
        panelClass: ['custom-modal', 'animate__animated', 'animate__fadeInDown'],
        data: "you don't have permissions to add project"
      });
      return;
    }

    //let hh = []
    if(!this.projectId){
      if (this.projectForm.invalid) {
        this.toast.openSnackBar(
          'Enter Valid Details'
        );
        //this.clearForm = true;
        //this.clearForm = true;
        this.projectForm.markAllAsTouched();
        return;
      }
      console.log(this.selection);
      console.log(this.projectForm.value);
      this.projectForm.value.sections = this.selection
      this.projectForm.value.imageUrl = this.imageUrl
      if(!this.projectForm.value.imageUrl){
        this.toast.openSnackBar(
          'Please upload project image'
        );
        return;
      }
      this.projectService.addProject(this.projectForm.value).subscribe(
  
        {
          next: (data: any) =>  {
            console.log(data)
            // this.spinner.hide()
             
             this.toast.openSnackBar('Project Added Successfully');
             this.router.navigate(['/dpr']);
            
          },
          error: (err) => {
            // this.spinner.hide()
             this.toast.openSnackBar('Something went wrong, please try again later');
            // console.log(err) 
    
            // this.errorData = err
    
            
    
          }
        }
    
      )
    }else{
      let selSectionsData = this.selection
      this.projectService.updateActivitiesToProject(selSectionsData, this.projectId).subscribe(
  
        {
          next: (data: any) =>  {
            console.log(data)
            // this.spinner.hide()
             
             this.toast.openSnackBar(' Updated Successfully');
             this.router.navigate(['/view-project/progress-sheet',this.projectId]);
            
          },
          error: (err) => {
            // this.spinner.hide()
             this.toast.openSnackBar('Something went wrong, please try again later');
            // console.log(err) 
    
            // this.errorData = err
    
            
    
          }
        }
    
      )
    //  // console.log(this.selection);
    //   //console.log(this.tasksData)
    //   for(let one of this.selection){
    //     //console.log(one)
    //     for(let single of this.tasksData){
    //       if(single.taskId === one.taskId){

    //       }else{
    //         hh.push(one)
            

    //       }
    //     }
    //     console.log(hh)
    //   }
    }
 

  }

  uploadFile(event:any) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        console.log(this.imageUrl)
        // this.registrationForm.patchValue({
        //   file: reader.result
        // });
        //this.editFile = false;
        //this.removeUpload = true;
      }
      // ChangeDetectorRef since file is loading outside the zone
      //this.cd.markForCheck();        
    }
  }
  displayMater(){
    this.showMaster = true;
    this.showAddProject  = false
  }
  dispalyProject(){
    this.showMaster = false;
    this.showAddProject  = true
  }

  get projectName(): AbstractControl {
    return this.projectForm.get('projectName');
  }
  get projectDate(): AbstractControl {
    return this.projectForm.get('projectDate');
  }

  get location(): AbstractControl {
    return this.projectForm.get('location');
  }


  onKeyUp(ev,id){

    console.log(ev.target.value,id)

    let dataMatched = this.tasks.filter((product) => {
      return product.result.some((prod) => {
        return prod.subtaskName == ev.target.value;
      });
    });

    console.log(dataMatched)

    //this.tasks = dataMatched

  }

  setIndex(ii){
    this.aa=ii;
    console.log
  }

}
