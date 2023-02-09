 import { Component, OnInit } from '@angular/core';
import { FormControl, FormArray, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CalenderService } from 'src/app/services/calender.service';
import { ProgressSheetService } from 'src/app/services/progress-sheet.service';
import { ToastService } from 'src/app/services/toast.service';
//import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import { NoPermissionsComponent } from '../no-permissions/no-permissions.component';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { RecentActivityService } from 'src/app/services/recent-activity.service';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { AddProjectService } from 'src/app/services/add-project.service';
import { AboutUsComponent } from '../about-us/about-us.component';
import { InnerAddMemberComponent } from '../inner-add-member/inner-add-member.component';
import { DataAnalysisService } from 'src/app/services/data-analysis.service';



  
@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth'
  };
  // calendarPlugins = [dayGridPlugin];

  // handleDateClick(arg) { // handler method
  //   alert(arg.dateStr);
  // }
  // calendarOptions: CalendarOptions = {
  //   plugins: [dayGridPlugin],
  //   initialView: 'dayGridMonth',
  //   weekends: false,
  //   events: [
  //     { title: 'Meeting', start: new Date() }
  //   ]
  // };
  // calendarOptions: CalendarOptions = {
  //   initialView: 'dayGridMonth',
  //   dateClick: this.handleDateClick.bind(this)
  // };
  // eventsPromise: Promise<EventInput>;

  // handleDateClick(arg) {
  //   alert('date click! ' + arg.dateStr);
  // }
  // calendarOptions: CalendarOptions = {
  //   initialView: 'dayGridMonth',
  //   plugins: [dayGridPlugin]
  // };
  selectedDate: Date = new Date();
  projectId:any;
  projectsData = [];
  activesData:any;
  project:any;
  about:any;
  aboutUs:any;
  aboutUsLen:any;
  members:any;
  projectsList:any;
  valueAddedDate:any;
  projectNameForm: FormGroup = this._fb.group({
    _id: [null],
   });
//  projectsData = [
//   {
//       "_id": "63c6aa45a1593c88fae7b09b",
//       "taskName": "Boundarywall",
//       "projectId": "63c6aa44a1593c88fae7b099",
//       "taskId": "63be3548941e8f5b1b1f0928",
//       "createdAt": "2023-01-17T14:01:41.032Z",
//       "__v": 0,
//       "result": [
//           {
//               "_id": "63c6aa45a1593c88fae7b09e",
//               "subTaskName": "cement",
//               "taskId": "63be3548941e8f5b1b1f0928",
//               "__v": 0
//           },
//           {
//               "_id": "63c6aa45a1593c88fae7b09f",
//               "subTaskName": "evacuation",
//               "taskId": "63be3548941e8f5b1b1f0928",
//               "__v": 0
//           }
//       ]
//   },
//   {
//       "_id": "63c6aa45a1593c88fae7b09c",
//       "taskName": "Warehouse",
//       "projectId": "63c6aa44a1593c88fae7b099",
//       "taskId": "63be66c7e2063a320960a7ec",
//       "createdAt": "2023-01-17T14:01:41.032Z",
//       "__v": 0,
//       "result": [
//           {
//               "_id": "63c6aa45a1593c88fae7b0a0",
//               "subTaskName": "Iron",
//               "taskId": "63be66c7e2063a320960a7ec",
//               "__v": 0
//           },
//           {
//               "_id": "63c6aa45a1593c88fae7b0a1",
//               "subTaskName": "tiebeam",
//               "taskId": "63be66c7e2063a320960a7ec",
//               "__v": 0
//           }
//       ]
//   },
//   {
//     "_id": "63c6aa45a1593c88fae7b09b",
//     "taskName": "Boundarywall",
//     "projectId": "63c6aa44a1593c88fae7b099",
//     "taskId": "63be3548941e8f5b1b1f0928",
//     "createdAt": "2023-01-17T14:01:41.032Z",
//     "__v": 0,
//     "result": [
//         {
//             "_id": "63c6aa45a1593c88fae7b09e",
//             "subTaskName": "cement",
//             "taskId": "63be3548941e8f5b1b1f0928",
//             "__v": 0
//         },
//         {
//             "_id": "63c6aa45a1593c88fae7b09f",
//             "subTaskName": "evacuation",
//             "taskId": "63be3548941e8f5b1b1f0928",
//             "__v": 0
//         }
//     ]
// },
// {
//     "_id": "63c6aa45a1593c88fae7b09c",
//     "taskName": "Warehouse",
//     "projectId": "63c6aa44a1593c88fae7b099",
//     "taskId": "63be66c7e2063a320960a7ec",
//     "createdAt": "2023-01-17T14:01:41.032Z",
//     "__v": 0,
//     "result": [
//         {
//             "_id": "63c6aa45a1593c88fae7b0a0",
//             "subTaskName": "Iron",
//             "taskId": "63be66c7e2063a320960a7ec",
//             "__v": 0
//         },
//         {
//             "_id": "63c6aa45a1593c88fae7b0a1",
//             "subTaskName": "tiebeam",
//             "taskId": "63be66c7e2063a320960a7ec",
//             "__v": 0
//         }
//     ]
// },
// {
//     "_id": "63c6aa45a1593c88fae7b09b",
//     "taskName": "Boundarywall",
//     "projectId": "63c6aa44a1593c88fae7b099",
//     "taskId": "63be3548941e8f5b1b1f0928",
//     "createdAt": "2023-01-17T14:01:41.032Z",
//     "__v": 0,
//     "result": [
//         {
//             "_id": "63c6aa45a1593c88fae7b09e",
//             "subTaskName": "cement",
//             "taskId": "63be3548941e8f5b1b1f0928",
//             "__v": 0
//         },
//         {
//             "_id": "63c6aa45a1593c88fae7b09f",
//             "subTaskName": "evacuation",
//             "taskId": "63be3548941e8f5b1b1f0928",
//             "__v": 0
//         }
//     ]
// },
// {
//     "_id": "63c6aa45a1593c88fae7b09c",
//     "taskName": "Warehouse",
//     "projectId": "63c6aa44a1593c88fae7b099",
//     "taskId": "63be66c7e2063a320960a7ec",
//     "createdAt": "2023-01-17T14:01:41.032Z",
//     "__v": 0,
//     "result": [
//         {
//             "_id": "63c6aa45a1593c88fae7b0a0",
//             "subTaskName": "Iron",
//             "taskId": "63be66c7e2063a320960a7ec",
//             "__v": 0
//         },
//         {
//             "_id": "63c6aa45a1593c88fae7b0a1",
//             "subTaskName": "tiebeam",
//             "taskId": "63be66c7e2063a320960a7ec",
//             "__v": 0
//         }
//     ]
// }
// ] 
permissions:any;
calenderPermissions:any;
recentActivities:any;
datas = []
showCalData:boolean = false
selectedDateNew: any;
getWeekName:any;
getMonth:any;
getYear:any;
getDay:any;
memberAddPermissions:any;
  constructor(private activeRoute: ActivatedRoute, private router:Router, private _fb: FormBuilder, private dataAnalysis:DataAnalysisService, private projectService: AddProjectService, private recentActivityService:RecentActivityService, private _dialog: MatDialog, private progressSheetService:ProgressSheetService, private toast:ToastService, private calenderService:CalenderService) { }

  ngOnInit(): void {
    
    this.permissions = JSON.parse(localStorage.getItem('loginData'))
    //console.log(this.permissions)
    //this.projectsViewPermissions = this.permissions.permissions[0].ParentChildchecklist[0].childList[1]
    this.memberAddPermissions = this.permissions.permissions[0]?.ParentChildchecklist[5]?.childList[0]
 
    //this.getDay = new Date().getMonth()

    

 
    this.permissions = JSON.parse(localStorage.getItem('loginData'))
    console.log(this.permissions)
    this.calenderPermissions = this.permissions.permissions[0]?.ParentChildchecklist[2]?.childList[0]

    
    this.activeRoute.params.subscribe((params:any) => {
        console.log(params.id)
        this.projectId = params.id

        this.calenderService.getProjectById(this.projectId).subscribe(data=>{
            this.project = data
            this.projectNameForm.patchValue({
              _id:this.project._id
            })
            this.members = this.project.members
            
        console.log(this.project)
        })

        this.progressSheetService.getActivitiesByProjectId(this.projectId).subscribe(data=>{
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
  
      });

      this.recentActivityService.getRecentAtivities().subscribe(data=>{
        this.recentActivities = data
        for(let single of this.recentActivities){
          single.time = moment(single.createdAt).fromNow()
        }
        
      });
      this.projectService.getAboutUs().subscribe(data=>{
        //this.spinner.hide()
        this.about = data
        this.aboutUs = this.about[0]
    
         //this.aboutUsLen = this.aboutUs.length
        // if(this.aboutUsLen){
        //   this.aboutUsForm.patchValue(this.aboutUs[0])
        // }
        // console.log(this.aboutUsLen)
      });
      this.projectService.getProjects().subscribe(data=>{
        //this.spinner.hide()
        this.projectsList = data;
      });
  }

  backToCalender(){
    this.showCalData = false
  }

  onSelect(event){
    this.showCalData = true
    console.log(event)
    this.valueAddedDate = event
    this.getWeekName = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"][new Date(this.valueAddedDate).getDay()]
    this.getMonth = new Date(this.valueAddedDate).toLocaleString('default', { month: 'short' });
    this.getYear = new Date(this.valueAddedDate).getFullYear()
    this.getDay = new Date(this.valueAddedDate).getDate()
  }

  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      const highlightDate = this.datas.map(strDate => new Date(strDate))
        .some(d => d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear());
      return highlightDate ? 'special-date' : '';
    };
  }

  onBid(e,player,value,id) {
    
    if(!this.calenderPermissions?.isSelected){
      const dialogRef = this._dialog.open(NoPermissionsComponent, {
        width: '30%',
        panelClass: ['custom-modal', 'animate__animated', 'animate__fadeInDown'],
        data: "you don't have permissions to add data throught calender"
      });
      return;
    }
    player.cumTotal=value; //<-----this will add new property to your existing object with input value.
    console.log(player);
    player.addedDate = this.valueAddedDate
    player.projectId = this.projectId
    console.log(id);
    this.calenderService.cumutaleTotalData(player,id).subscribe(

        {
          next: (data: any) =>  {
            console.log(data)
           
            this.toast.openSnackBar('Data updated successfully');
            player.value=null
             //this.router.navigate(['/users']);
             
            
          },
          error: (err) => {
            this.toast.openSnackBar("Something went wrong. Unable to Update");
            
    
            
    
          }
        }
    
      )
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

      this.projectService.getAboutUs().subscribe(data=>{
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
addMember(){
  if(!this.memberAddPermissions?.isSelected){
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
      this.dataAnalysis.getProjectById(this.projectId).subscribe(data=>{
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
onChangeProject(ev){
  this.router.navigate(['/view-project/calender',ev.target.value]);
}
}
