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
import { PROJECT_API } from '@env/api_path';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import {isEmpty} from 'lodash';


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
 
  project: any;
  permissions: any
  progressPermissionsView: any;
  progressPermissionsEdit: any
  recentActivities: any
  projectsList: any;
  remarksPermissions: any;
  constructor(
    private httpService: RequestService,
    private snack: SnackbarService,
    private activeRoute: ActivatedRoute, private toast: ToastService, private router: Router, private projectService: AddProjectService, private _fb: FormBuilder, private recentActivityService: RecentActivityService, private _dialog: MatDialog, private progressSheetService: ProgressSheetService, private taskService: TaskService, public dialog: MatDialog, private dataAnalysis: DataAnalysisService,) { }

  projectLocationsList: Array<any> = [];

  ngOnInit(): void {
    this.permissions = JSON.parse(localStorage.getItem('loginData'))
    this.progressPermissionsView = this.permissions.permissions[0]?.ParentChildchecklist[1]?.childList[1];
    this.progressPermissionsEdit = this.permissions.permissions[0]?.ParentChildchecklist[1]?.childList[0];
    this.remarksPermissions = this.permissions.permissions[0]?.ParentChildchecklist[2]?.childList[2];
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


  addData(subTask, locationIndex, structureIndex, activityIndex) {
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
      // width: '60%',
      panelClass: ['custom-modal', 'animate__animated', 'animate__fadeInDown'],
      data: subTask
    });
    dialogRef.afterClosed().subscribe(status => {
      console.log(status);

      this.projectLocationsList[locationIndex];

      console.log(this.projectLocationsList[locationIndex].structures[structureIndex].activities[activityIndex]);

      this.projectLocationsList[locationIndex].structures[structureIndex].activities[activityIndex].dailyCumulativeTotal = this.projectLocationsList[locationIndex].structures[structureIndex].activities[activityIndex].dailyCumulativeTotal ? this.projectLocationsList[locationIndex].structures[structureIndex].activities[activityIndex].dailyCumulativeTotal : 0;
      this.projectLocationsList[locationIndex].structures[structureIndex].activities[activityIndex] = { ...this.projectLocationsList[locationIndex].structures[structureIndex].activities[activityIndex], ...status };




      console.log('this.projectLocationsList',this.projectLocationsList )

      let requestedData:any = {
        _id:this.project._id,
        locations:this.projectLocationsList
      }

      this.httpService.PUT(PROJECT_API, requestedData).subscribe((res:any) => {
        this.snack.notify("Data has been saved sucessfully.", 1);
      }, (err) => {
        if (err.errors && !isEmpty(err.errors)) {
          let errMessage = '<ul>';
          for (let e in err.errors) {
            let objData = err.errors[e];
            errMessage += `<li>${objData[0]}</li>`;
          }
          errMessage += '</ul>';
          this.snack.notifyHtml(errMessage, 2);
        } else {
          this.snack.notify(err.message, 2);
        }
      })


      // let activityName = this.projectLocationsList[locationIndex].structures[structureIndex].activities[activityIndex].activity_name;

      // let activityID = this.projectLocationsList[locationIndex].structures[structureIndex].activities[activityIndex].activity_name;
      // let id = this.projectLocationsList[locationIndex].structures[structureIndex].activities[activityIndex].activity_name;

      // status._id=id;
      // status.


      // if (status === 'yes') {
      //   this.progressSheetService.getActivitiesByProjectId(this.projectId).subscribe(data => {
      //     this.activesData = data
      //     console.log(this.activesData)
      //     this.activesData.forEach(obj => {
      //       //this.grandTotal += obj['discAmount'];
      //       //obj['Appt_Date_Time__c'] = this.commonService.getUsrDtStrFrmDBStr(obj['Appt_Date_Time__c'])[0];
      //       //console.log(this.grandTotal);
      //       const arr = this.projectsData.filter(ele => ele['name'] === obj['taskName']);
      //       if (arr.length === 0) {
      //         this.projectsData.push(
      //           { 'name': obj['taskName'] });
      //       }
      //     });

      //     this.projectsData.forEach(obj => {
      //       const uniqData = this.activesData.filter(ele => ele['taskName'] === obj['name']);
      //       obj['result'] = uniqData;

      //     });
      //     console.log(this.projectsData);





      //   })
      // }
      // if (status === 'no') {
      // }
    })
  }

  addMember() {
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
          })

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

        },
        error: (err) => {
          this.toast.openSnackBar("Something went wrong. Unable to delete Activity");
        }
      }

    )
  }

  addLocation() {
    this.project._id;

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
