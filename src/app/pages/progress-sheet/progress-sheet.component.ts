import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AddDataComponent } from 'app/pages/add-data/add-data.component';
import { ProgressSheetService } from '@services/progress-sheet.service';
import { DataAnalysisService } from '@services/data-analysis.service';
import { RecentActivityService } from '@services/recent-activity.service';
import { TaskService } from '@services/task.service';
import { NoPermissionsComponent } from '../no-permissions/no-permissions.component';
import * as moment from 'moment';
//import { FormBuilder } from '@angular/forms';
import { FormControl, FormArray, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AddProjectService } from '@services/add-project.service';
import { AddRemarksComponent } from '../add-remarks/add-remarks.component';
import { ToastService } from '@services/toast.service';
import { InnerAddMemberComponent } from '../inner-add-member/inner-add-member.component';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';


export interface PeriodicElement {
  Description: string;
  R2EndDate: string;
  R1EndDate: string;
  WorkingdaysRevised: string;
  BaselineStartDate: string;
  BaselineEndDate: string;
  baseLineWorkingDays: string;
  UOM: string;
  Total: string
}
export interface GroupBy {
  initial: string;
  isGroupBy: boolean;
}

@Component({
  selector: 'app-progress-sheet',
  templateUrl: './progress-sheet.component.html',
  styleUrls: ['./progress-sheet.component.css'],

})
export class ProgressSheetComponent implements OnInit {
  projectId: any
  progressData: any;
  // projectsData:any
  tasks: any
  projectsData = [];
  members = [];
  memberAddPermissions: any;
  activesData: any;
  recentActivitiesLen: any
  projectNameForm: FormGroup = this._fb.group({
    _id: [null],
  });
  //     {
  //         "_id": "63c6aa45a1593c88fae7b09b",
  //         "taskName": "Boundarywall",
  //         "projectId": "63c6aa44a1593c88fae7b099",
  //         "taskId": "63be3548941e8f5b1b1f0928",
  //         "createdAt": "2023-01-17T14:01:41.032Z",
  //         "__v": 0,
  //         "result": [
  //             {
  //                 "_id": "63c6aa45a1593c88fae7b09e",
  //                 "subTaskName": "cement",
  //                 "taskId": "63be3548941e8f5b1b1f0928",
  //                 "__v": 0
  //             },
  //             {
  //                 "_id": "63c6aa45a1593c88fae7b09f",
  //                 "subTaskName": "evacuation",
  //                 "taskId": "63be3548941e8f5b1b1f0928",
  //                 "__v": 0
  //             }
  //         ]
  //     },
  // //     {
  // //         "_id": "63c6aa45a1593c88fae7b09c",
  // //         "taskName": "Warehouse",
  // //         "projectId": "63c6aa44a1593c88fae7b099",
  // //         "taskId": "63be66c7e2063a320960a7ec",
  // //         "createdAt": "2023-01-17T14:01:41.032Z",
  // //         "__v": 0,
  // //         "result": [
  // //             {
  // //                 "_id": "63c6aa45a1593c88fae7b0a0",
  // //                 "subTaskName": "Iron",
  // //                 "taskId": "63be66c7e2063a320960a7ec",
  // //                 "__v": 0
  // //             },
  // //             {
  // //                 "_id": "63c6aa45a1593c88fae7b0a1",
  // //                 "subTaskName": "tiebeam",
  // //                 "taskId": "63be66c7e2063a320960a7ec",
  // //                 "__v": 0
  // //             }
  // //         ]
  // //     },
  // //     {
  // //       "_id": "63c6aa45a1593c88fae7b09b",
  // //       "taskName": "Boundarywall",
  // //       "projectId": "63c6aa44a1593c88fae7b099",
  // //       "taskId": "63be3548941e8f5b1b1f0928",
  // //       "createdAt": "2023-01-17T14:01:41.032Z",
  // //       "__v": 0,
  // //       "result": [
  // //           {
  // //               "_id": "63c6aa45a1593c88fae7b09e",
  // //               "subTaskName": "cement",
  // //               "taskId": "63be3548941e8f5b1b1f0928",
  // //               "__v": 0
  // //           },
  // //           {
  // //               "_id": "63c6aa45a1593c88fae7b09f",
  // //               "subTaskName": "evacuation",
  // //               "taskId": "63be3548941e8f5b1b1f0928",
  // //               "__v": 0
  // //           }
  // //       ]
  // //   },
  // //   {
  // //       "_id": "63c6aa45a1593c88fae7b09c",
  // //       "taskName": "Warehouse",
  // //       "projectId": "63c6aa44a1593c88fae7b099",
  // //       "taskId": "63be66c7e2063a320960a7ec",
  // //       "createdAt": "2023-01-17T14:01:41.032Z",
  // //       "__v": 0,
  // //       "result": [
  // //           {
  // //               "_id": "63c6aa45a1593c88fae7b0a0",
  // //               "subTaskName": "Iron",
  // //               "taskId": "63be66c7e2063a320960a7ec",
  // //               "__v": 0
  // //           },
  // //           {
  // //               "_id": "63c6aa45a1593c88fae7b0a1",
  // //               "subTaskName": "tiebeam",
  // //               "taskId": "63be66c7e2063a320960a7ec",
  // //               "__v": 0
  // //           }
  // //       ]
  // //   },
  // //   {
  // //       "_id": "63c6aa45a1593c88fae7b09b",
  // //       "taskName": "Boundarywall",
  // //       "projectId": "63c6aa44a1593c88fae7b099",
  // //       "taskId": "63be3548941e8f5b1b1f0928",
  // //       "createdAt": "2023-01-17T14:01:41.032Z",
  // //       "__v": 0,
  // //       "result": [
  // //           {
  // //               "_id": "63c6aa45a1593c88fae7b09e",
  // //               "subTaskName": "cement",
  // //               "taskId": "63be3548941e8f5b1b1f0928",
  // //               "__v": 0
  // //           },
  // //           {
  // //               "_id": "63c6aa45a1593c88fae7b09f",
  // //               "subTaskName": "evacuation",
  // //               "taskId": "63be3548941e8f5b1b1f0928",
  // //               "__v": 0
  // //           }
  // //       ]
  // //   },
  // //   {
  // //       "_id": "63c6aa45a1593c88fae7b09c",
  // //       "taskName": "Warehouse",
  // //       "projectId": "63c6aa44a1593c88fae7b099",
  // //       "taskId": "63be66c7e2063a320960a7ec",
  // //       "createdAt": "2023-01-17T14:01:41.032Z",
  // //       "__v": 0,
  // //       "result": [
  // //           {
  // //               "_id": "63c6aa45a1593c88fae7b0a0",
  // //               "subTaskName": "Iron",
  // //               "taskId": "63be66c7e2063a320960a7ec",
  // //               "__v": 0
  // //           },
  // //           {
  // //               "_id": "63c6aa45a1593c88fae7b0a1",
  // //               "subTaskName": "tiebeam",
  // //               "taskId": "63be66c7e2063a320960a7ec",
  // //               "__v": 0
  // //           }
  // //       ]
  // //   } 
  //    ] 
  project: any;
  permissions: any
  progressPermissionsView: any;
  progressPermissionsEdit: any
  recentActivities: any
  projectsList: any;
  remarksPermissions: any;
  constructor(private activeRoute: ActivatedRoute, private toast: ToastService, private router: Router, private projectService: AddProjectService, private _fb: FormBuilder, private recentActivityService: RecentActivityService, private _dialog: MatDialog, private progressSheetService: ProgressSheetService, private taskService: TaskService, public dialog: MatDialog, private dataAnalysis: DataAnalysisService,) { }

  projectLocationsList: Array<any> = [];

  ngOnInit(): void {
    this.permissions = JSON.parse(localStorage.getItem('loginData'))
    console.log(this.permissions)
    this.progressPermissionsView = this.permissions.permissions[0]?.ParentChildchecklist[1]?.childList[1]
    this.progressPermissionsEdit = this.permissions.permissions[0]?.ParentChildchecklist[1]?.childList[0]
    this.remarksPermissions = this.permissions.permissions[0]?.ParentChildchecklist[2]?.childList[2]
    console.log(this.progressPermissionsView)
    console.log(this.progressPermissionsEdit)
    this.activeRoute.params.subscribe((params: any) => {
      console.log(params.id)
      this.projectId = params.id
      this.progressSheetService.getProjectById(this.projectId).subscribe(data => {
        this.project = data
        this.projectNameForm.patchValue({
          _id: this.project._id
        })
        console.log(this.project)

        this.projectLocationsList = this.project.locations;
      })
    
      // this.progressSheetService.getActivitiesByProjectId(this.projectId).subscribe(data => {
      //   this.activesData = data
      //   console.log(this.activesData)
      //   this.activesData.forEach(obj => {
      //     const arr = this.projectsData.filter(ele => ele['name'] === obj['taskName']);
      //     if (arr.length === 0) {
      //       this.projectsData.push(
      //         { 'name': obj['taskName'] });
      //     }
      //   });

      //   this.projectsData.forEach(obj => {
      //     const uniqData = this.activesData.filter(ele => ele['taskName'] === obj['name']);
      //     obj['result'] = uniqData;

      //   });
      //   console.log(this.projectsData);
      // })


    });

    // this.recentActivityService.getRecentAtivities().subscribe(data => {
    //   this.recentActivities = data
    //   for (let single of this.recentActivities) {
    //     single.time = moment(single.createdAt).fromNow()
    //   }
    //   this.recentActivitiesLen = this.recentActivities.length

    // });

    // this.projectService.getProjects().subscribe(data => {

    //   this.projectsList = data;
    // });

  }


  displayedColumns = ['Description', 'R2EndDate', 'R1EndDate', 'WorkingdaysRevised', 'BaselineStartDate',
    'BaselineEndDate', 'UOM', 'Total'];
  dataSource = ELEMENT_DATA;

  isGroup(index, item): boolean {
    return item.isGroupBy;
  }


  addData(subTask) {
    if (!this.progressPermissionsEdit?.isSelected) {
      const dialogRef = this._dialog.open(NoPermissionsComponent, {
        width: '30%',
        panelClass: ['custom-modal', 'animate__animated', 'animate__fadeInDown'],
        data: "you don't have permissions to update sheet"
        //data: supply
      });
      return;
    }
    const dialogRef = this._dialog.open(AddDataComponent, {
      width: '60%',
      panelClass: ['custom-modal', 'animate__animated', 'animate__fadeInDown'],
      data: subTask
    });
    dialogRef.afterClosed().subscribe(status => {
      console.log(status);
      if (status === 'yes') {
        this.progressSheetService.getActivitiesByProjectId(this.projectId).subscribe(data => {
          this.activesData = data
          console.log(this.activesData)
          this.activesData.forEach(obj => {
            //this.grandTotal += obj['discAmount'];
            //obj['Appt_Date_Time__c'] = this.commonService.getUsrDtStrFrmDBStr(obj['Appt_Date_Time__c'])[0];
            //console.log(this.grandTotal);
            const arr = this.projectsData.filter(ele => ele['name'] === obj['taskName']);
            if (arr.length === 0) {
              this.projectsData.push(
                { 'name': obj['taskName'] });
            }
          });

          this.projectsData.forEach(obj => {
            const uniqData = this.activesData.filter(ele => ele['taskName'] === obj['name']);
            obj['result'] = uniqData;

          });
          console.log(this.projectsData);





        })
      }
      if (status === 'no') {
      }
    })
  }
  addMember() {
    if (!this.memberAddPermissions?.isSelected) {
      // const dialogRef = this._dialog.open(NoPermissionsComponent, {
      //   width: '30%',
      //   panelClass: ['custom-modal', 'animate__animated', 'animate__fadeInDown'],
      //   data: "you don't have permissions to add member"
      //   //data: supply
      // });
      // return;
    }
    const dialogRef = this._dialog.open(InnerAddMemberComponent, {
      width: '30%',
      panelClass: ['custom-modal', 'animate__animated', 'animate__fadeInDown'],
      data: this.projectId
    });
    dialogRef.afterClosed().subscribe(status => {
      console.log(status);
      if (status === 'yes') {
        this.dataAnalysis.getProjectById(this.projectId).subscribe(data => {
          this.project = data
          this.members = this.project.members
          console.log(this.project)
        })
        // this.projectService.getProjects().subscribe(data=>{
        //   //this.spinner.hide()
        //   this.projects = data
        //   console.log(this.projects)
        //   for(let single of this.projects){
        //     this.members.push(...single.members)
        //   }
        //   console.log(this.members)
        // })
        // this.filterSubject.next(this.filterForm.value);
      }
      if (status === 'no') {
      }
    })
  }
  onChangeProject(ev) {
    this.router.navigate(['/view-project/progress-sheet', ev.target.value]);
  }


  addremarks(subTask): void {
    if (!this.remarksPermissions?.isSelected) {
      const dialogRef = this._dialog.open(NoPermissionsComponent, {
        width: '30%',
        panelClass: ['custom-modal', 'animate__animated', 'animate__fadeInDown'],
        data: "you don't have permissions to add remarks calender"
      });
      return;
    }
    const dialogRef = this.dialog.open(AddRemarksComponent, {
      width: '500px',
      data: { reDate: subTask.remarks, id: subTask._id }
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   // this.animal = result;
    // });
  }



  delete(subTask) {
    this.progressSheetService.deleteSubTask(subTask._id).subscribe(

      {
        next: (data: any) => {
          console.log(data)
          this.toast.openSnackBar("sub activity deleted Successfully");

          this.progressSheetService.getActivitiesByProjectId(this.projectId).subscribe(data => {
            this.activesData = data
            console.log(this.activesData)
            this.activesData.forEach(obj => {
              //this.grandTotal += obj['discAmount'];
              //obj['Appt_Date_Time__c'] = this.commonService.getUsrDtStrFrmDBStr(obj['Appt_Date_Time__c'])[0];
              //console.log(this.grandTotal);
              const arr = this.projectsData.filter(ele => ele['name'] === obj['taskName']);
              if (arr.length === 0) {
                this.projectsData.push(
                  { 'name': obj['taskName'] });
              }
            });

            this.projectsData.forEach(obj => {
              const uniqData = this.activesData.filter(ele => ele['taskName'] === obj['name']);
              obj['result'] = uniqData;

            });
            console.log(this.projectsData);



          })
          // this.userService.getUserss().subscribe(data=>{
          //   //this.spinner.hide()
          //   this.users = data
          //   this.usersLen = this.users.length
          //   this.dataSource = new MatTableDataSource(this.users);
          //   this.dataSource.paginator = this.paginator;
          //   //console.log(this.roles)
          // })

        },
        error: (err) => {
          this.toast.openSnackBar("Something went wrong. Unable to delete SubActivity");




        }
      }

    )
  }

  deleteTask(task) {
    this.progressSheetService.deleteTaskName(task.name).subscribe(

      {
        next: (data: any) => {
          console.log(data)
          this.toast.openSnackBar("activity deleted Successfully");
          window.location.reload();
          // this.router.routeReuseStrategy.shouldReuseRoute = () => false
          // this.router.navigate([this.router.url])


          // this.userService.getUserss().subscribe(data=>{
          //   //this.spinner.hide()
          //   this.users = data
          //   this.usersLen = this.users.length
          //   this.dataSource = new MatTableDataSource(this.users);
          //   this.dataSource.paginator = this.paginator;
          //   //console.log(this.roles)
          // })

        },
        error: (err) => {
          this.toast.openSnackBar("Something went wrong. Unable to delete Activity");




        }
      }

    )
  }
}



const ELEMENT_DATA: (PeriodicElement | GroupBy)[] = [

  { initial: 'Boundarywall', isGroupBy: true },
  {
    Description: 'Cement', R2EndDate: 'jan 16', R1EndDate: 'feb 1', WorkingdaysRevised: 'mar1', BaselineStartDate: 'mar2',
    BaselineEndDate: 'mar 3', baseLineWorkingDays: 'mar 3', UOM: 'sqm', Total: '100'
  },
  {
    Description: 'Evacuation', R2EndDate: 'jan 16', R1EndDate: 'feb 1', WorkingdaysRevised: 'mar1', BaselineStartDate: 'mar2',
    BaselineEndDate: 'mar 3', baseLineWorkingDays: 'mar 3', UOM: 'sqm', Total: '100'
  },
  {
    Description: 'Cement', R2EndDate: 'jan 16', R1EndDate: 'feb 1', WorkingdaysRevised: 'mar1', BaselineStartDate: 'mar2',
    BaselineEndDate: 'mar 3', baseLineWorkingDays: 'mar 3', UOM: 'sqm', Total: '100'
  },
  { initial: 'Warehouse', isGroupBy: true },
  {
    Description: 'ironrod', R2EndDate: 'jan 16', R1EndDate: 'feb 1', WorkingdaysRevised: 'mar1', BaselineStartDate: 'mar2',
    BaselineEndDate: 'mar 3', baseLineWorkingDays: 'mar 3', UOM: 'sqm', Total: '100'
  },
  {
    Description: 'ironrod', R2EndDate: 'jan 16', R1EndDate: 'feb 1', WorkingdaysRevised: 'mar1', BaselineStartDate: 'mar2',
    BaselineEndDate: 'mar 3', baseLineWorkingDays: 'mar 3', UOM: 'sqm', Total: '100'
  },
  {
    Description: 'floorbeam', R2EndDate: 'jan 16', R1EndDate: 'feb 1', WorkingdaysRevised: 'mar1', BaselineStartDate: 'mar2',
    BaselineEndDate: 'mar 3', baseLineWorkingDays: 'mar 3', UOM: 'sqm', Total: '100'
  },
  { initial: 'watertank', isGroupBy: true },
  {
    Description: 'iron ', R2EndDate: 'jan 16', R1EndDate: 'feb 1', WorkingdaysRevised: 'mar1', BaselineStartDate: 'mar2',
    BaselineEndDate: 'mar 3', baseLineWorkingDays: 'mar 3', UOM: 'sqm', Total: '100'
  },
  {
    Description: 'iron', R2EndDate: 'jan 16', R1EndDate: 'feb 1', WorkingdaysRevised: 'mar1', BaselineStartDate: 'mar2',
    BaselineEndDate: 'mar 3', baseLineWorkingDays: 'mar 3', UOM: 'sqm', Total: '100'
  },

];