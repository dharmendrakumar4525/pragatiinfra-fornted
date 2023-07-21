import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AddDataComponent } from 'app/pages/add-data/add-data.component';
import { ProgressSheetService } from '@services/progress-sheet.service';
import { DataAnalysisService } from '@services/data-analysis.service';
import { RecentActivityService } from '@services/recent-activity.service';
import { TaskService } from '@services/task.service';
import { NoPermissionsComponent } from '../no-permissions/no-permissions.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AddProjectService } from '@services/add-project.service';
import { AddRemarksComponent } from '../add-remarks/add-remarks.component';
import { ToastService } from '@services/toast.service';
import { InnerAddMemberComponent } from '../inner-add-member/inner-add-member.component';
import { PROJECT_API } from '@env/api_path';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import { isEmpty } from 'lodash';
import { LocationPopupComponent } from '@component/project/location-popup/location-popup.component';

@Component({
  selector: 'app-progress-sheet',
  templateUrl: './progress-sheet.component.html',
  styleUrls: ['./progress-sheet.component.scss'],

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


    });
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
      console.log(status.data);

      if (status && status.type && status.type == 1) {
        this.projectLocationsList[locationIndex];

        console.log(this.projectLocationsList[locationIndex].structures[structureIndex].activities[activityIndex]);

        this.projectLocationsList[locationIndex].structures[structureIndex].activities[activityIndex].dailyCumulativeTotal = this.projectLocationsList[locationIndex].structures[structureIndex].activities[activityIndex].dailyCumulativeTotal ? this.projectLocationsList[locationIndex].structures[structureIndex].activities[activityIndex].dailyCumulativeTotal : 0;
        this.projectLocationsList[locationIndex].structures[structureIndex].activities[activityIndex] = { ...this.projectLocationsList[locationIndex].structures[structureIndex].activities[activityIndex], ...status.data };
        let requestedData: any = {
          _id: this.project._id,
          locations: this.projectLocationsList
        }

        this.httpService.PUT(PROJECT_API, requestedData).subscribe((res: any) => {
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
      }

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
    const dialogPopup = this.dialog.open(LocationPopupComponent, {
      data: {
        type: 'location',
        currentRecords: this.projectLocationsList
      }
    });
    dialogPopup.afterClosed().subscribe((result: any) => {
      console.log('result', result)

      if (result && result['option'] === 1) {
        this.projectLocationsList = [...this.projectLocationsList, ...result.data.locations];
        this.updateRecords();
      }
    });
  }

  deleteLocation(locationIndex) {

    this.projectLocationsList = this.projectLocationsList.slice(locationIndex + 1);
    console.log(this.projectLocationsList);
    this.updateRecords();

  }

  addStructure(locationIndex) {
    const dialogPopup = this.dialog.open(LocationPopupComponent, {
      data: {
        type: 'structure',
        currentRecords: this.projectLocationsList[locationIndex].structures
      }
    });

    dialogPopup.afterClosed().subscribe((result: any) => {
      console.log('result', result)

      if (result && result['option'] === 1) {
        this.projectLocationsList[locationIndex].structures = [...this.projectLocationsList[locationIndex].structures, ...result.data.structures];
        this.updateRecords();
      }
    });
  }


  deleteStructure(locationIndex, structureIndex) {
    this.projectLocationsList[locationIndex].structures = this.projectLocationsList[locationIndex].structures.slice(structureIndex + 1);
    console.log(this.projectLocationsList);
    this.updateRecords();
  }

  addActivity(locationIndex, structureIndex) {
    const dialogPopup = this.dialog.open(LocationPopupComponent, {
      data: {
        type: 'activity',
        currentRecords: this.projectLocationsList[locationIndex].structures[structureIndex].activities
      }
    });
    dialogPopup.afterClosed().subscribe((result: any) => {
      console.log('result', result)

      if (result && result['option'] === 1) {
        this.projectLocationsList[locationIndex].structures[structureIndex].activities = [... this.projectLocationsList[locationIndex].structures[structureIndex].activities, ...result.data.activities];
        this.updateRecords();
      }
    });
  }

  deleteActivity(locationIndex, structureIndex, activityIndex) {
    this.projectLocationsList[locationIndex].structures[structureIndex].activities = this.projectLocationsList[locationIndex].structures[structureIndex].activities.slice(activityIndex + 1);
    console.log(this.projectLocationsList);
    this.updateRecords();
  }

  updateRecords() {
    let requestedData: any = {
      _id: this.project._id,
      locations: this.projectLocationsList
    }

    this.httpService.PUT(PROJECT_API, requestedData).subscribe((res: any) => {
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
  }
}
