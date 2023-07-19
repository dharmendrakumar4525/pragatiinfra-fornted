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

  constructor(private activeRoute: ActivatedRoute, private router: Router, private _fb: FormBuilder, private dataAnalysis: DataAnalysisService, private projectService: AddProjectService, private recentActivityService: RecentActivityService, private _dialog: MatDialog, private progressSheetService: ProgressSheetService, private toast: ToastService, private calenderService: CalenderService) { }



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

  }

  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      const highlightDate = this.datas.map(strDate => new Date(strDate))
        .some(d => d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear());
      return highlightDate ? 'special-date' : '';
    };
  }

  onBid(e, player, value, id) {

    console.log(player)

    if (player.total <= 0) {
      this.toast.openSnackBar('Please add total in progress sheet');
      return;
    }

    if ((player.dailyCumulativeTotal + Number(value)) > player.total) {
      if (player.dateStr == this.dateForTotal) {

        if (((player.dailyCumulativeTotal - Number(player.previousValue)) + Number(value)) > player.total) {
          this.toast.openSnackBar('Value should not be greater then total');
          return;
        }

      } else {
        this.toast.openSnackBar('Value should not be greater then total');
        return;
      }

    }

    if (!this.calenderPermissions?.isSelected) {
      const dialogRef = this._dialog.open(NoPermissionsComponent, {
        width: '30%',
        panelClass: ['custom-modal', 'animate__animated', 'animate__fadeInDown'],
        data: "you don't have permissions to add data throught calender"
      });
      return;
    }

    let selDateForTotal = moment(this.valueAddedDate).format('D MMM, YYYY')
    this.dateForTotal = selDateForTotal
    //for(let one of player.remarks){

    let tDate = moment(player.totalDate).format('D MMM, YYYY')
    //}

    console.log(player.remarks)
    //console.log(selDate)

    player.cumTotal = value; //<-----this will add new property to your existing object with input value.
    console.log(player);
    player.addedDate = this.valueAddedDate
    player.dateStr = selDateForTotal
    player.projectId = this.projectId
    console.log(id);

    if (selDateForTotal == tDate) {
      this.calenderService.cumutaleTotalUpdate(player, id).subscribe(

        {
          next: (data: any) => {
            console.log(data)

            this.toast.openSnackBar('Data updated successfully');
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
            //player.value=null
            //this.router.navigate(['/users']);


          },
          error: (err) => {
            this.toast.openSnackBar("Something went wrong. Unable to Update");




          }
        }

      )
      //this.toast.openSnackBar('You already added total on this date ');
      //return;
    } else {
      this.calenderService.cumutaleTotalData(player, id).subscribe(

        {
          next: (data: any) => {
            console.log(data)

            this.toast.openSnackBar('Data updated successfully');
            this.progressSheetService.getActivitiesByProjectId(this.projectId).subscribe(data => {
              this.activesData = data

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
            //player.value=null
            //this.router.navigate(['/users']);


          },
          error: (err) => {
            this.toast.openSnackBar("Something went wrong. Unable to Update");




          }
        }

      )
    }



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
          //this.spinner.hide()
          this.about = data
          this.aboutUs = this.about[0]

          //this.aboutUsLen = this.aboutUs.length
          // if(this.aboutUsLen){
          //   this.aboutUsForm.patchValue(this.aboutUs[0])
          // }
          // console.log(this.aboutUsLen)
        });
        // this.taskService.getTasks().subscribe(data=>{
        //   //this.spinner.hide()
        //   this.tasks = data
        //   console.log(this.tasks)
        // })
        // this.filterSubject.next(this.filterForm.value);
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
    this.router.navigate(['/view-project/calender', ev.target.value]);
  }
  remarksData(e, player, remark, id) {

    if (!this.remarksPermissions?.isSelected) {
      const dialogRef = this._dialog.open(NoPermissionsComponent, {
        width: '30%',
        panelClass: ['custom-modal', 'animate__animated', 'animate__fadeInDown'],
        data: "you don't have permissions to add remarks calender"
      });
      return;
    }
    var selDate = moment(this.valueAddedDate).format('D MMM, YYYY')
    for (let one of player.remarks) {

      one.dateFormat = moment(one.date).format('D MMM, YYYY')
    }

    console.log(player.remarks)
    console.log(selDate)

    let matchedData = player.remarks.filter(ele => {
      return ele.dateFormat == selDate
    })

    if (!matchedData.length) {
      let remarkObj = { remark: remark, date: this.valueAddedDate }
      player.remarks.push(remarkObj);
    } else {
      this.toast.openSnackBar('You already added remarks on this date ');
      return;
    }

    //<-----this will add new property to your existing object with input value.
    console.log(player);
    player.addedDate = this.valueAddedDate
    player.projectId = this.projectId
    console.log(id);
    this.calenderService.addRemarks(player, id).subscribe(

      {
        next: (data: any) => {
          console.log(data)

          this.toast.openSnackBar('Remark updated successfully');
          //.value=null
          // this.remarkValue = ''
          //this.router.navigate(['/users']);


        },
        error: (err) => {
          this.toast.openSnackBar("Something went wrong. Unable to Update");

        }
      }

    )
  }

  onSelectDate(event) {
    //this.showCalData = true
    console.log(event);
    this.valueAddedDate = event
    this.getWeekName = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"][new Date(this.valueAddedDate).getDay()]
    this.getMonth = new Date(this.valueAddedDate).toLocaleString('default', { month: 'short' });
    this.getYear = new Date(this.valueAddedDate).getFullYear()
    this.getDay = new Date(this.valueAddedDate).getDate()

    this.dateForTotal = moment(this.valueAddedDate).format('D MMM, YYYY')
    console.log(this.dateForTotal)

    //this.dateForTotal = selDateForTotal
  }



  ngOnInit(): void {

    this.permissions = JSON.parse(localStorage.getItem('loginData'))
    //console.log(this.permissions)
    //this.projectsViewPermissions = this.permissions.permissions[0].ParentChildchecklist[0].childList[1]
    this.memberAddPermissions = this.permissions.permissions[0]?.ParentChildchecklist[5]?.childList[0]

    //this.getDay = new Date().getMonth()




    this.permissions = JSON.parse(localStorage.getItem('loginData'))
    console.log(this.permissions)
    this.calenderPermissions = this.permissions.permissions[0]?.ParentChildchecklist[2]?.childList[0]
    this.remarksPermissions = this.permissions.permissions[0]?.ParentChildchecklist[2]?.childList[2]



    this.activeRoute.params.subscribe((params: any) => {
      console.log(params.id)
      this.projectId = params.id

      this.calenderService.getProjectById(this.projectId).subscribe(data => {
        this.project = data
        this.projectNameForm.patchValue({
          _id: this.project._id
        })
        this.members = this.project.members

       this.projectLocationsList = this.project.locations;
      })

      // this.progressSheetService.getActivitiesByProjectId(this.projectId).subscribe(data => {
      //   this.activesData = data
      //   console.log(this.activesData)
      //   this.activesData.forEach(obj => {
      //     //this.grandTotal += obj['discAmount'];
      //     //obj['Appt_Date_Time__c'] = this.commonService.getUsrDtStrFrmDBStr(obj['Appt_Date_Time__c'])[0];
      //     //console.log(this.grandTotal);
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

    this.recentActivityService.getRecentAtivities().subscribe(data => {
      this.recentActivities = data
      for (let single of this.recentActivities) {
        single.time = moment(single.createdAt).fromNow()
      }

    });
    this.projectService.getAboutUs().subscribe(data => {
      //this.spinner.hide()
      this.about = data
      this.aboutUs = this.about[0]

      //this.aboutUsLen = this.aboutUs.length
      // if(this.aboutUsLen){
      //   this.aboutUsForm.patchValue(this.aboutUs[0])
      // }
      // console.log(this.aboutUsLen)
    });
    this.projectService.getProjects().subscribe(data => {
      //this.spinner.hide()
      this.projectsList = data;
    });
  }
}
