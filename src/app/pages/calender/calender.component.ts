import { Component, OnInit } from '@angular/core';
import { FormControl, FormArray, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CalenderService } from '@services/calender.service';
import { ProgressSheetService } from '@services/progress-sheet.service';
import { ToastService } from '@services/toast.service';
//import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import { NoPermissionsComponent } from '../no-permissions/no-permissions.component';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { RecentActivityService } from '@services/recent-activity.service';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { AddProjectService } from '@services/add-project.service';
import { AboutUsComponent } from '../about-us/about-us.component';
import { InnerAddMemberComponent } from '../inner-add-member/inner-add-member.component';
import { DataAnalysisService } from '@services/data-analysis.service';
import { MatCalendar, MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { PROJECT_ACTIVITY_DATA_API, PROJECT_ACTIVITY_DATA_DETAIL_API } from '@env/api_path';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import { isEmpty } from 'lodash';




@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {
  // minDate = new Date();
  // maxDate=new Date();
  formattedStartDate: string;
  //for changing date formate
  formatDate(date: Date): string {
    // Change the date format as per your requirement
    const formattedDate = moment(date).format('yyyy-MM-D');
    return formattedDate;
  }



  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth'
  };

  remarkValue = ''
  dateForTotal: any;

  selectedDate: Date = new Date();
  projectId: any;
  projectsData = [];
  activesData: any;
  project: any;
  about: any;
  aboutUs: any;
  aboutUsLen: any;
  members: any;
  projectsList: any;
  valueAddedDate: any;
  projectNameForm: FormGroup = this._fb.group({
    _id: [null],
  });

  permissions: any;
  calenderPermissions: any;
  recentActivities: any;
  datas = []
  showCalData: boolean = false
  selectedDateNew: any;
  getWeekName: any;
  getMonth: any;
  getYear: any;
  getDay: any;
  memberAddPermissions: any;
  remarksPermissions: any;
  projectLocationsList: Array<any> = [];
  projectActivityAssociatedArray: Array<any> = [];
  activityEnabled: Array<any> = [];



  getAllActivityData: Array<any> = [];

  dataByActivityId: Array<any> = [];

  constructor(
    private httpService: RequestService,
    private snack: SnackbarService, private activeRoute: ActivatedRoute, private router: Router, private _fb: FormBuilder, private dataAnalysis: DataAnalysisService, private projectService: AddProjectService, private recentActivityService: RecentActivityService, private _dialog: MatDialog,  private calenderService: CalenderService) { }



  backToCalender() {
    this.showCalData = false
  }

  onSelect(event) {
    this.showCalData = true
    console.log(event)
    this.valueAddedDate = event
    this.getWeekName = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"][new Date(this.valueAddedDate).getDay()]
    this.getMonth = new Date(this.valueAddedDate).toLocaleString('default', { month: 'short' });
    this.getYear = new Date(this.valueAddedDate).getFullYear()
    this.getDay = new Date(this.valueAddedDate).getDate()
    this.dateForTotal = moment(this.valueAddedDate).format('D MMM, YYYY')
    console.log(this.dateForTotal)

    this.dateForTotal = moment(this.valueAddedDate).format('yyyy-MM-D')

    this.mapActivityById();
    this.dateValidations();

  }

  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      const highlightDate = this.datas.map(strDate => new Date(strDate))
        .some(d => d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear());
      return highlightDate ? 'special-date' : '';
    };
  }
  addAboutUs() {
    const dialogRef = this._dialog.open(AboutUsComponent, {
      width: '30%',
      panelClass: ['custom-modal', 'animate__animated', 'animate__fadeInDown']
      //data: supply
    });
    dialogRef.afterClosed().subscribe(status => {
      console.log(status);
      if (status === 'yes') {

        this.projectService.getAboutUs().subscribe(data => {
          this.about = data
          this.aboutUs = this.about[0]         
        });
       
      }
      if (status === 'no') {
      }
    })
  }

  addMember() {
    if (!this.memberAddPermissions?.isSelected) {
      const dialogRef = this._dialog.open(NoPermissionsComponent, {
        width: '30%',
        panelClass: ['custom-modal', 'animate__animated', 'animate__fadeInDown'],
        data: "you don't have permissions to add member"
        //data: supply
      });
      return;
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
        })
       
      }
      if (status === 'no') {
      }
    })
  }

  onChangeProject(ev) {
    this.router.navigate(['/view-project/calender', ev.target.value]);
  }
 
  onSelectDate(event) {
    console.log(event);
    this.valueAddedDate = event
    this.getWeekName = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"][new Date(this.valueAddedDate).getDay()]
    this.getMonth = new Date(this.valueAddedDate).toLocaleString('default', { month: 'short' });
    this.getYear = new Date(this.valueAddedDate).getFullYear()
    this.getDay = new Date(this.valueAddedDate).getDate()

    this.dateForTotal = moment(this.valueAddedDate).format('D MMM, YYYY')
    this.mapActivityById();
    this.dateValidations();
  }


  getActivityData() {
    let requestedData: any = {
      project_id: this.projectId
    }
    this.httpService.GET(PROJECT_ACTIVITY_DATA_API, requestedData).subscribe((res: any) => {
      this.getAllActivityData = res.data;

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




  mapActivityById() {
    this.dataByActivityId = [];

    if (this.getAllActivityData && this.getAllActivityData.length > 0) {

      this.getAllActivityData.map((o: any) => {

        let incomingDate: any = moment(o.date).format('DD-MM-YYYY');
        let selectedDate: any = moment(this.valueAddedDate).format('DD-MM-YYYY');
     

        if (incomingDate == selectedDate) {
          this.dataByActivityId[o.activity_ref_id] = {
            daily_quantity: o.daily_quantity,
            remark: o.remark
          }
        }
        return o;
      });
      
    }
  }


  dateValidations(){
    if(this.projectActivityAssociatedArray && Object.keys(this.projectActivityAssociatedArray) && Object.keys(this.projectActivityAssociatedArray).length>0){

      Object.keys(this.projectActivityAssociatedArray).map((o:any)=>{

        let activitData = this.projectActivityAssociatedArray[o];

        let startDate:any = moment(activitData.base_line_start_date).set({hour:0,minute:0,second:0,millisecond:0}).valueOf();
        let endDate:any = moment(activitData.base_line_end_date).set({hour:0,minute:0,second:0,millisecond:0}).valueOf();

        if(activitData.actual_revised_start_date){
            startDate = moment(activitData.actual_revised_start_date).set({hour:0,minute:0,second:0,millisecond:0}).valueOf();
        }
        
        /* if r1/r2/r3 */
        if(activitData.addRevisesDates && activitData.addRevisesDates.length > 0){
          endDate = moment(activitData.addRevisesDates[0]['revisedDate']).set({hour:0,minute:0,second:0,millisecond:0}).valueOf();

          let rDates:any = [];

          let r1 = moment(activitData.addRevisesDates[0]['revisedDate']).set({hour:0,minute:0,second:0,millisecond:0}).valueOf();
          rDates.push(r1);

          if(activitData.addRevisesDates[1]){
            let r2 = moment(activitData.addRevisesDates[1]['revisedDate']).set({hour:0,minute:0,second:0,millisecond:0}).valueOf();
            rDates.push(r2);
          }

          if(activitData.addRevisesDates[2]){
            let r3 = moment(activitData.addRevisesDates[2]['revisedDate']).set({hour:0,minute:0,second:0,millisecond:0}).valueOf();
            rDates.push(r3);
          }
          let sortedDate = rDates.sort((a,b)=>b-a);
          endDate = moment(sortedDate[0]).set({hour:0,minute:0,second:0,millisecond:0}).valueOf();
        } 

        let calendarSelectedDate = moment(this.valueAddedDate).set({hour:0,minute:0,second:0,millisecond:0}).valueOf();

        if(startDate <= calendarSelectedDate && calendarSelectedDate <= endDate){
          this.activityEnabled[o] = true;       
        } else {
          this.activityEnabled[o] = false;         
        }
      })
    }
  }




  

  async saveActivityData(activityId: any, activity_ref_id: any, structure_id: any, structure_ref_id: any, location_id: any, location_ref_id: any, quantity: any, remark: any,subTaskObj) {


    if(!this.activityEnabled[activity_ref_id]){
        this.snack.notify("You are not allowed to edit this field",2);
    }

    let requestedData: any = {
      project_id: this.projectId,
      activity_id: activityId,
      activity_ref_id: activity_ref_id,
      structure_id: structure_id,
      structure_ref_id: structure_ref_id,
      location_id: location_id,
      location_ref_id: location_ref_id,
      date: moment(this.valueAddedDate).format('YYYY-MM-DD')
    }

    if (quantity) {  

      // let totalQuantity = ((this.dataByActivityId && this.dataByActivityId[activity_ref_id] && this.dataByActivityId[activity_ref_id]['daily_quantity'])?this.dataByActivityId[activity_ref_id]['daily_quantity']:0) + subTaskObj.quantity - subTaskObj.dailyCumulativeTotal;
      
      // if(quantity>totalQuantity){
      //   this.snack.notify('It cannot be greater than total quantity.',2);
      //   return;
      // }
      requestedData['daily_quantity'] = Number(quantity);
    }

    if (remark) {
      requestedData['remark'] = remark;
    }
    this.httpService.POST(PROJECT_ACTIVITY_DATA_API, requestedData).subscribe((res: any) => {

      this.getProjectsDetail();

      if (quantity) {
        this.snack.notify("Quantity has been updated.",1);
      }
  
      if (remark) {
        this.snack.notify("Remark has been updated.",1);
      }

      this.dataByActivityId[activity_ref_id] = {
        daily_quantity: Number(quantity),
        remark: remark
      }

      if(res && res.data && res.data.type && res.data.type == 'add'){
        this.getAllActivityData.push(res.data.data);   
      }

      if(res && res.data && res.data.type && res.data.type == 'update'){
        this.getAllActivityData = this.getAllActivityData.map((o:any)=>{
          if(o._id == res.data.data._id){
            o.daily_quantity = Number(res.data.data.daily_quantity);
            o.remark = res.data.data.remark;
          }
          return o;
        })
      }

      
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

  getProjectsDetail(){

    this.calenderService.getProjectById(this.projectId).subscribe(data => {
      this.project = data;

      this.projectNameForm.patchValue({
        _id: this.project._id
      })
      this.members = this.project.members

      this.projectLocationsList = this.project.locations;

      this.projectLocationsList.map((o: any) => {
        if (o.structures && o.structures.length > 0) {
          o.structures.map((o1: any) => {
            if (o1.activities && o1.activities.length > 0) {
              o1.activities.map((o2: any) => {
                this.projectActivityAssociatedArray[o2._id] = o2;
              })
            }
          })
        }
      });
    })
  }


  ngOnInit(): void {
    this.permissions = JSON.parse(localStorage.getItem('loginData'))
    this.memberAddPermissions = this.permissions.permissions[0]?.ParentChildchecklist[5]?.childList[0]

    this.permissions = JSON.parse(localStorage.getItem('loginData'))
    this.calenderPermissions = this.permissions.permissions[0]?.ParentChildchecklist[2]?.childList[0]
    this.remarksPermissions = this.permissions.permissions[0]?.ParentChildchecklist[2]?.childList[2]



    this.activeRoute.params.subscribe((params: any) => {

      this.projectId = params.id;
      this.getProjectsDetail();
      this.getActivityData();
    });

    this.recentActivityService.getRecentAtivities().subscribe(data => {
      this.recentActivities = data
      for (let single of this.recentActivities) {
        single.time = moment(single.createdAt).fromNow()
      }

    });
    this.projectService.getAboutUs().subscribe(data => {
      this.about = data
      this.aboutUs = this.about[0];
    });
    this.projectService.getProjects().subscribe(data => {
      this.projectsList = data;
    });
  }
}
