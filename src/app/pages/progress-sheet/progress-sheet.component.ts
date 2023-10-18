import { Component, OnInit, HostListener } from '@angular/core';
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
import { ConfirmationPopupComponent } from '@component/project/confirmation-popup/confirmation-popup.component';
import * as moment from 'moment';
import { ElementRef, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
declare var $: any;

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
  elem: any; isFullScreen: boolean;
  currentDate: any;
  project: any;
  permissions: any
  progressPermissionsView: any;
  progressPermissionsEdit: any
  recentActivities: any
  projectsList: any;
  remarksPermissions: any;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private httpService: RequestService,
    private snack: SnackbarService,
    private activeRoute: ActivatedRoute, private toast: ToastService, private router: Router, private projectService: AddProjectService, private _fb: FormBuilder, private recentActivityService: RecentActivityService, private _dialog: MatDialog, private progressSheetService: ProgressSheetService, private taskService: TaskService, public dialog: MatDialog, private dataAnalysis: DataAnalysisService, private renderer: Renderer2, private el: ElementRef) {
    this.currentDate = moment().startOf('day');
  }

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
    this.chkScreenMode();
    this.elem = this.document.getElementsByTagName('body')[0];
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
      // console.log(status.data);

      if (status && status.type && status.type == 1) {
        this.projectLocationsList[locationIndex];
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



  addremarks(activity): void {
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
      data: { id: activity._id }
    });

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

      if (result && result['option'] === 1) {
        this.projectLocationsList = [...this.projectLocationsList, ...result.data.locations];
        this.updateRecords();
      }
    });
  }

  deleteLocation(locationIndex) {
    const dialogPopup = this.dialog.open(ConfirmationPopupComponent, {
    });
    dialogPopup.afterClosed().subscribe((result: any) => {

      if (result && result['option'] === 1) {
        this.projectLocationsList.splice(locationIndex, 1);
        console.log(this.projectLocationsList);
        this.updateRecords();
      }
    });


  }

  addStructure(locationIndex) {
    const dialogPopup = this.dialog.open(LocationPopupComponent, {
      data: {
        type: 'structure',
        currentRecords: this.projectLocationsList[locationIndex].structures
      }
    });

    dialogPopup.afterClosed().subscribe((result: any) => {

      if (result && result['option'] === 1) {
        this.projectLocationsList[locationIndex].structures = [...this.projectLocationsList[locationIndex].structures, ...result.data.structures];
        this.updateRecords();
      }
    });
  }


  deleteStructure(locationIndex, structureIndex) {
    const dialogPopup = this.dialog.open(ConfirmationPopupComponent, {
    });
    dialogPopup.afterClosed().subscribe((result: any) => {

      if (result && result['option'] === 1) {
        this.projectLocationsList[locationIndex].structures.splice(structureIndex, 1);
        console.log(this.projectLocationsList);
        this.updateRecords();
      }
    });

  }

  addActivity(locationIndex, structureIndex) {
    const dialogPopup = this.dialog.open(LocationPopupComponent, {
      data: {
        type: 'activity',
        currentRecords: this.projectLocationsList[locationIndex].structures[structureIndex].activities
      }
    });
    dialogPopup.afterClosed().subscribe((result: any) => {

      if (result && result['option'] === 1) {
        this.projectLocationsList[locationIndex].structures[structureIndex].activities = [... this.projectLocationsList[locationIndex].structures[structureIndex].activities, ...result.data.activities];
        this.updateRecords();
      }
    });
  }

  deleteActivity(locationIndex, structureIndex, activityIndex) {
    const dialogPopup = this.dialog.open(ConfirmationPopupComponent, {
    });
    dialogPopup.afterClosed().subscribe((result: any) => {

      if (result && result['option'] === 1) {
        this.projectLocationsList[locationIndex].structures[structureIndex].activities.splice(activityIndex, 1);
        console.log(this.projectLocationsList);
        this.updateRecords();
      }
    });

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



  toggleActivity(id) {

    if ($(`#location-${id}`).hasClass('collapsed')) {
      $(`#location-${id}`).removeClass('collapsed');
      $(`.location-${id}`).removeClass('cl-hide');
      $(`.toggle-structure`).removeClass('collapsed');

    } else {
      $(`#location-${id}`).addClass('collapsed');
      $(`.location-${id}`).addClass('cl-hide');
    }
  }

  toggleStructure(id) {

    if ($(`#structure-${id}`).hasClass('collapsed')) {
      $(`#structure-${id}`).removeClass('collapsed');
      $(`.structure-${id}`).removeClass('cl-hide');
    } else {
      $(`#structure-${id}`).addClass('collapsed');
      $(`.structure-${id}`).addClass('cl-hide');
    }
  }
  CurrentDailyAskingRate(activityItem) {
    if (activityItem?.base_line_start_date == null)
      return;

    if (activityItem?.dailyCumulativeTotal >= activityItem?.quantity)
      return 0;

    let temp: any;
    let Startdate: any;
    let previousDate: any;
    previousDate = this.currentDate.clone().subtract(1, 'days');
    previousDate = moment(previousDate).startOf('day');
    Startdate = moment(activityItem?.base_line_start_date).startOf('day');

    if (activityItem?.actual_revised_start_date != null) {
      Startdate = moment(activityItem?.actual_revised_start_date).startOf('day');
    }
    let base_line_end_date = moment(activityItem?.base_line_end_date).startOf('day');
    if (activityItem.addRevisesDates.length <= 0) {
      if (previousDate >= base_line_end_date) {
        temp = activityItem?.quantity - activityItem?.dailyCumulativeTotal;
      } else if (Startdate > previousDate) {
        temp = 0;
      } else {
        temp = Math.ceil((activityItem?.quantity - activityItem?.dailyCumulativeTotal) / (moment(base_line_end_date).diff(previousDate, 'days')));
      }
    } else {
      let R_end_date = moment(activityItem?.addRevisesDates[activityItem.addRevisesDates.length - 1]['revisedDate']).startOf('day');

      if (previousDate >= R_end_date) {
        temp = activityItem?.quantity - activityItem?.dailyCumulativeTotal;
      } else if (Startdate > previousDate) {
        temp = 0;
      } else {
        temp = Math.ceil((activityItem?.quantity - activityItem?.dailyCumulativeTotal) / (moment(R_end_date).diff(previousDate, 'days')))
      }
    }
    return temp;
  }
  NoOfDaysBalanceAsPerBaseline(activityItem) {
    if (activityItem?.base_line_start_date == null)
      return;

    let noofDaysBalanceasperbaseLine: any;
    let diffValuebaseLine = moment(activityItem.base_line_end_date).diff(moment(activityItem.base_line_start_date), 'days')
    let baseLineWorkingDays = diffValuebaseLine + 1;

    if (moment(activityItem.base_line_start_date).startOf('day') >= moment(this.currentDate).startOf('day')) {
      noofDaysBalanceasperbaseLine = baseLineWorkingDays;
    } else if (moment(activityItem.base_line_end_date).startOf('day') >= moment(this.currentDate).startOf('day')) {
      noofDaysBalanceasperbaseLine = moment(activityItem.base_line_end_date).diff(moment(this.currentDate).startOf('day'), 'days') + 1;
    } else {
      noofDaysBalanceasperbaseLine = 0;
    }
    return noofDaysBalanceasperbaseLine;
  }
  NoOfDaysBalanceAsPerRevisedDates(activityItem) {
    if (activityItem.addRevisesDates == null || activityItem.addRevisesDates.length == 0)
      return;
    let startDate = activityItem.base_line_start_date;
    if (activityItem.actual_revised_start_date != null)
      startDate = activityItem.actual_revised_start_date;
    let noofDaysBalanceasperrevisedEnddate: any;
    let diffValuenoofDaysBalance = Math.abs(moment(activityItem.addRevisesDates.slice(-1)[0].revisedDate).diff(moment(this.currentDate), 'days'))
    if (moment(startDate).startOf('day') >= moment(this.currentDate).startOf('day')) {
      noofDaysBalanceasperrevisedEnddate = moment(activityItem.addRevisesDates.slice(-1)[0].revisedDate).diff(moment(startDate), 'days') + 1;
    } else if (moment(activityItem.addRevisesDates.slice(-1)[0].revisedDate).startOf('day') >= moment(this.currentDate).startOf('day')) {
      noofDaysBalanceasperrevisedEnddate = diffValuenoofDaysBalance + 1;
    } else {
      noofDaysBalanceasperrevisedEnddate = 0;
    }
    return noofDaysBalanceasperrevisedEnddate;
  }
  TargetTillDateAsPerBaseline(activityItem) {
    if (activityItem?.base_line_start_date == null)
      return;
    let previousDate = this.currentDate.clone().subtract(1, 'days');
    previousDate = moment(previousDate).startOf('day');
    let temp: any;
    let base_line_start_date = moment(activityItem?.base_line_start_date).startOf('day');
    let base_line_end_date = moment(activityItem?.base_line_end_date).startOf('day');

    if (activityItem?.dailyCumulativeTotal == activityItem?.quantity)
      temp = "Completed";
    else if (previousDate < base_line_start_date) {
      temp = 0;
    } else if (previousDate >= base_line_end_date)
      temp = activityItem?.quantity;
    else if (previousDate >= base_line_start_date) {
      var baseLineWorkingDays = moment(this.currentDate).diff(base_line_start_date, 'days');
      temp = Math.ceil((activityItem.quantity * baseLineWorkingDays) / activityItem.baseLineWorkingDays);
    }
    return temp;
  }

  TargetTillDateAsPerRevisedEndDate(activityItem) {
    if (activityItem.addRevisesDates.length <= 0)
      return;
    let StartDate = activityItem?.base_line_start_date;
    if (activityItem?.actual_revised_start_date != null)
      StartDate = activityItem?.actual_revised_start_date;
    let temp: any;
    let Revisedbase_line_start_date = moment(StartDate).startOf('day');
    let R_end_date = moment(activityItem?.addRevisesDates[activityItem.addRevisesDates.length - 1]['revisedDate']).startOf('day');
    let previousDate = this.currentDate.clone().subtract(1, 'days');
    previousDate = moment(previousDate).startOf('day');
    if (activityItem?.dailyCumulativeTotal == activityItem?.quantity)
      temp = "Completed";
    else if (previousDate < Revisedbase_line_start_date) {
      temp = 0;
    } else if (previousDate >= R_end_date)
      temp = activityItem?.quantity;
    else if (previousDate >= Revisedbase_line_start_date) {
      var RevisedLineWorkingDays = moment(this.currentDate).diff(Revisedbase_line_start_date, 'days');
      temp = Math.ceil((activityItem.quantity * RevisedLineWorkingDays) / activityItem.workingDaysRevised);
    }
    return temp;
  }

  //Progress Monitoring Sheets full screen view
  @HostListener('document:fullscreenchange', ['$event'])
  @HostListener('document:webkitfullscreenchange', ['$event'])
  @HostListener('document:mozfullscreenchange', ['$event'])
  @HostListener('document:MSFullscreenChange', ['$event'])
  fullscreenmodes(event) {
    this.chkScreenMode();
  }
  chkScreenMode() {
    if (document.fullscreenElement) {
      //fullscreen
      this.isFullScreen = true;
    } else {
      //not in full screen
      this.isFullScreen = false;
    }
  }
  openFullscreen() {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
  }
}
