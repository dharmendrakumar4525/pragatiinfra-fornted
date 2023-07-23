import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, NgForm, FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatDialog } from '@angular/material/dialog';
import { AddTasksComponent } from '../add-tasks/add-tasks.component';
import { TaskService } from '@services/task.service';
import { AddSubTasksComponent } from '../add-sub-tasks/add-sub-tasks.component';
import { AddProjectService } from '@services/add-project.service';
import { ToastService } from '@services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NoPermissionsComponent } from '../no-permissions/no-permissions.component';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { UsersService } from '@services/users.service';
import { DataAnalysisService } from '@services/data-analysis.service';
import { LocationPopupComponent } from '@component/project/location-popup/location-popup.component'
export interface Fruit {
  name: string;
}
export interface MatchData {
  id: string
}
@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {
  @HostListener('document:click', ['$event'])
  documentClick(event: any): void {
    if (!this.projectsPermissions?.isSelected) {
      this.router.navigate(['/'])
    }
  }
  showMaster: boolean = false
  showAddProject: boolean = true
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  selection: any[] = [];
  imageUrl = null
  subTaskName = [];
  aa: boolean = false;
  users: any;
  projectNameVal: any;
  addPro: boolean = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];


  projectForm: FormGroup = this._fb.group({
    projectName: [null, [Validators.required]],
    projectDate: [null, [Validators.required]],
    location: [null, [Validators.required]],
    r0Date: [null],
    r1Date: [null],
    r2Date: [null],
    members: [[]]


  });
  tasks: any;
  projectId: any;
  tasksData: any;
  permissions: any;
  projectsPermissions: any
  fruitCtrl = new FormControl();
  filteredFruits: Observable<any>;
  @ViewChild('fruitInput', { static: false }) fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;
  project: any;

  locationsList: Array<any> = []

  constructor(
    private _fb: FormBuilder,
    private dialog: MatDialog,
    private dataAnalysis: DataAnalysisService, private toast: ToastService, private _dialog: MatDialog, private taskService: TaskService,
    private projectService: AddProjectService, private userService: UsersService, private activeRoute: ActivatedRoute, private router: Router) { }


  get courseIds() {
    return this.projectForm.get('courseIds');
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.projectForm.controls['members'].setValue([...this.projectForm.controls['members'].value, value.trim()]);
      this.projectForm.controls['members'].updateValueAndValidity();
    }
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


  addTask() {
    const dialogRef = this._dialog.open(AddTasksComponent, {
      width: '30%',
      panelClass: ['custom-modal', 'animate__animated', 'animate__fadeInDown']
      //data: supply
    });
    dialogRef.afterClosed().subscribe(status => {
      console.log(status);
      if (status === 'yes') {
        this.taskService.getTasks().subscribe(data => {
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

  addSubTask(taskId: any) {
    const dialogRef = this._dialog.open(AddSubTasksComponent, {
      width: '30%',
      panelClass: ['custom-modal', 'animate__animated', 'animate__fadeInDown'],
      data: taskId
    });
    dialogRef.afterClosed().subscribe(status => {
      console.log(status);
      if (status === 'yes') {
        this.taskService.getTasks().subscribe(data => {
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
  getSelection(item: any, task: any) {
    return this.selection.findIndex(s => s._id === item._id) !== -1;
  }

  changeHandler(item: any, task: any) {
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

  addProject() {

    if (!this.projectsPermissions?.isSelected) {
      const dialogRef = this._dialog.open(NoPermissionsComponent, {
        width: '30%',
        panelClass: ['custom-modal', 'animate__animated', 'animate__fadeInDown'],
        data: "you don't have permissions to add project"
      });
      return;
    }

    //let hh = []
    if (!this.projectId) {
      if (this.projectForm.invalid) {
        this.toast.openSnackBar(
          'Enter Valid Details'
        );
        this.projectForm.markAllAsTouched();
        return;
      }
      this.projectForm.value.sections = this.selection
      this.projectForm.value.imageUrl = this.imageUrl
      this.projectForm.value['locations'] = this.locationsList
      this.projectService.addProject(this.projectForm.value).subscribe(

        {
          next: (data: any) => {
            console.log(data)
            // this.spinner.hide()

            this.toast.openSnackBar('Project Added Successfully');
            this.router.navigate(['/view-project/data-analysis', data._id]);

          },
          error: (err) => {
            this.toast.openSnackBar('Something went wrong, please try again later');



          }
        }

      )
    } else {
      let selSectionsData = this.selection
      this.projectService.updateActivitiesToProject(selSectionsData, this.projectId).subscribe(

        {
          next: (data: any) => {
            console.log(data)
            // this.spinner.hide()

            this.toast.openSnackBar(' Updated Successfully');
            this.router.navigate(['/view-project/progress-sheet', this.projectId]);

          },
          error: (err) => {
            this.toast.openSnackBar('Something went wrong, please try again later');
          }
        }
      )
    }


  }


  editProject() {
    if (this.projectForm.invalid) {
      this.toast.openSnackBar(
        'Enter Valid Details'
      );
      this.projectForm.markAllAsTouched();
      return;
    }
    this.projectForm.value.imageUrl = this.imageUrl;
    this.projectService.updateProject(this.projectForm.value, this.projectId).subscribe(

      {
        next: (data: any) => {
          console.log(data)
          this.toast.openSnackBar('Project Updated Successfully');
          this.router.navigate([`/view-project/data-analysis/${data._id}`]);

        },
        error: (err) => {
          this.toast.openSnackBar('Something went wrong, please try again later');
        }
      }

    )
  }

  uploadFile(event: any) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result;
      }
    }
  }
  displayMater() {
    this.showMaster = true;
    this.showAddProject = false
  }
  dispalyProject() {
    this.showMaster = false;
    this.showAddProject = true
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


  onKeyUp(ev, id) {

    console.log(ev.target.value, id)

    let dataMatched = this.tasks.filter((product) => {
      return product.result.some((prod) => {
        return prod.subtaskName == ev.target.value;
      });
    });

    console.log(dataMatched)

    //this.tasks = dataMatched

  }

  setIndex(ii) {
    this.aa = ii;
    console.log
  }
  selected(event: MatAutocompleteSelectedEvent): void {

    const value = event.option.viewValue;

    if ((value || '').trim()) {
      this.projectForm.controls['members'].setValue([...this.projectForm.controls['members'].value, value.trim()]);
      this.projectForm.controls['members'].updateValueAndValidity();
    }

    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.users.filter(fruit => fruit.email.toLowerCase().indexOf(filterValue) === 0);
  }




  addLocations(type, locationObj, structuresObj) {
    console.log(locationObj, structuresObj);
    let array = [];
    if (type == 'location') {
      array = this.locationsList;
    }
    if (type == 'structure') {
      array = locationObj.structures;
    }
    if (type == 'activity') {
      array = structuresObj.activities;
    }

    const dialogPopup = this.dialog.open(LocationPopupComponent, {
      data: {
        type: type,
        currentRecords: array
      }
    });
    dialogPopup.afterClosed().subscribe((result: any) => {
      console.log('result', result)

      if (result && result['option'] === 1) {
        if (type == 'location') {
          this.locationsList = [...this.locationsList, ...result.data.locations];
        }

        if (type == 'structure') {
          this.locationsList = this.locationsList.map((o: any) => {
            if (o.location_id == locationObj.location_id) {
              if (!o.structures) {
                o.structures = [];
              }
              o.structures = [...o.structures, ...result.data.structures];
            }
            return o;
          })
        }

        if (type == 'activity') {
          this.locationsList = this.locationsList.map((o: any) => {
            if (o.location_id == locationObj.location_id) {

              o.structures = o.structures.map((childObj: any) => {
                if (childObj.structure_id == structuresObj.structure_id) {
                  if (!childObj.activities) {
                    childObj.activities = [];
                  }
                  childObj.activities = [...childObj.activities, ...result.data.activities];
                }
                return childObj;
              })
            }
            return o;
          })
        }


        console.log('this.locationsList ', this.locationsList)

      }
    });
  }



  deleteLocations(type, locationObj, structuresObj, activityObj) {
    if (type == 'location') {
      this.locationsList = this.locationsList.filter((o: any) => o.location_id != locationObj.location_id);
    }

    if (type == 'structure') {
      this.locationsList = this.locationsList.map((o: any) => {
        if (o.location_id == locationObj.location_id) {
          o.structures = o.structures.filter((childObj: any) => childObj.structure_id != structuresObj.structure_id);
        }
        return o;
      })
    }

    if (type == 'activity') {
      this.locationsList = this.locationsList.map((o: any) => {
        if (o.location_id == locationObj.location_id) {
          o.structures = o.structures.map((childObj: any) => {
            if (childObj.structure_id == structuresObj.structure_id) {
              childObj.activities = childObj.activities.filter((aObj: any) => aObj.activity_id != activityObj.activity_id);
            }
            return childObj;
          })
        }
        return o;
      })
    }
  }




  ngOnInit(): void {
    this.permissions = JSON.parse(localStorage.getItem('loginData'))

    this.projectsPermissions = this.permissions.permissions[0]?.ParentChildchecklist[0]?.childList[0]

    if (!this.projectsPermissions?.isSelected) {
      const dialogRef = this._dialog.open(NoPermissionsComponent, {
        width: '30%',
        panelClass: ['custom-modal', 'animate__animated', 'animate__fadeInDown'],
        data: "you don't have permissions to add project"
      });
    }
    this.activeRoute.params.subscribe((params: any) => {
      console.log(params.id)
      this.projectId = params.id
      this.projectNameVal = params.name

      if (this.projectId == undefined) {
        this.projectId = null
      }
      if (this.projectName == undefined) {
        this.projectNameVal = null
      }

      if (this.projectId && this.projectNameVal) {
        this.dataAnalysis.getProjectById(this.projectId).subscribe(data => {
          this.project = data;
          console.log("data", data);

          this.projectForm.patchValue(this.project)
          if (this.project.imageUrl) {
            this.imageUrl = this.project.imageUrl
          } else {
            this.imageUrl = null
          }
        })
        this.showMaster = false;
        this.showAddProject = true;
        this.addPro = false;
      } else if (this.projectId) {
        this.showMaster = true;
        this.showAddProject = false;
      }
    });

    // this.taskService.getTasks().subscribe(data => {
    //   //this.spinner.hide()
    //   this.tasks = data
    //   console.log(this.tasks)
    // })

    // this.taskService.getOnlyTasks().subscribe(data => {
    //   this.tasksData = data
    //   console.log(this.tasksData)
    // })

    this.userService.getUserss().subscribe(data => {
      this.users = data
      console.log(this.users)
      this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
        startWith(null),
        map((fruit: any | null) => fruit ? this._filter(fruit) : this.users.slice()));
      //console.log(this.tasksData)
    })



  }
}
