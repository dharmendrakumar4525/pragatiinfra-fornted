import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { Chart, registerables } from 'chart.js';
import { AddProjectService } from 'src/app/services/add-project.service';
import { DataAnalysisService } from 'src/app/services/data-analysis.service';
import { RecentActivityService } from 'src/app/services/recent-activity.service';
import { AddMemberComponent } from '../add-member/add-member.component';
import * as moment from 'moment';
import { ProgressSheetService } from 'src/app/services/progress-sheet.service';
import { NoPermissionsComponent } from '../no-permissions/no-permissions.component';
import { AboutUsComponent } from '../about-us/about-us.component';

Chart.register(...registerables);
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  
}


@Component({
  selector: 'app-data-analysis',
  templateUrl: './data-analysis.component.html',
  styleUrls: ['./data-analysis.component.css']
})
export class DataAnalysisComponent implements OnInit {
  projectsData = [];
    activesData:any;
  dateFilter: (date: Date | null) => boolean =
  (date: Date | null) => {
    if (!date) {
      return false;
    }
    const day = date.getDay();
    return day == 1; // 1 means monday, 0 means sunday, etc.
  };
  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 3, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 6, color: 'lightgreen' },
    {text: 'Three', cols: 3, rows: 3, color: 'lightpink'},
   
  ];
  projectId:any
  project:any;
  projects:any;
  members = [];
  recentActivities:any;
  showDefaultFirst:any;
  recentActivitiesLen:any;
  memberAddPermissions:any;
  permissions:any;
  about:any;
  aboutUs:any;
  aboutUsLen:any;
  graphData = []
  constructor(private activeRoute: ActivatedRoute, private progressSheetService:ProgressSheetService, private recentActivityService:RecentActivityService, private _dialog: MatDialog,private projectService: AddProjectService, private dataAnalysis:DataAnalysisService) { }

  ngOnInit(): void {

    this.permissions = JSON.parse(localStorage.getItem('loginData'))
    //console.log(this.permissions)
    //this.projectsViewPermissions = this.permissions.permissions[0].ParentChildchecklist[0].childList[1]
    this.memberAddPermissions = this.permissions.permissions[0].ParentChildchecklist[5].childList[0]

    this.projectService.getProjects().subscribe(data=>{
      //this.spinner.hide()
      this.projects = data
      console.log(this.projects)
      for(let single of this.projects){
        this.members.push(...single.members)
      }
      console.log(this.members)
    })

    this.activeRoute.params.subscribe((params:any) => {
      console.log(params.id)
      this.projectId = params.id


      this.progressSheetService.getActivitiesByProjectId(this.projectId).subscribe(data=>{
        this.activesData = data
    console.log(this.activesData)
    for(let one of this.activesData){
      this.graphData.push(one.dailyCumulativeTotal)
    }
    console.log(this.graphData)
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

    this.showDefaultFirst = this.projectsData[0]

   
    for(let data of this.showDefaultFirst.result){
      if(data.dailyCumulativeTotal && data.total){
        data.cpPercentage =  ((100 * data.dailyCumulativeTotal) / data.total).toFixed(1)
      }else{
        data.cpPercentage = 0
      }
      
    }

    console.log(this.showDefaultFirst)

  

    })

      this.dataAnalysis.getProjectById(this.projectId).subscribe(data=>{
        this.project = data
    console.log(this.project)
    })

    });







    
    var myChart = new Chart('overviewChart', {
      type: 'line',
      data: {
          labels: ['jan', 'feb', 'mar', 'april', 'may', 'june'],
          datasets: [
            {
              label: 'Remaining Task',
              data: this.graphData,
               backgroundColor: '#267ADC',
              borderColor: '#267ADC',
              borderWidth: 1
          },
        //   {
        //     label: 'Completed Task',
        //     data: [20, 50, 90, 10, 70, 3],
        //      backgroundColor: 'black',
        //     borderColor: 'black',
        //     borderWidth: 1
        // }
        
        
        
        ]
      },
      options: {
        scales: {
            y: {
                suggestedMin: 0,
                suggestedMax: 100
            }
        }
    }
  });

  this.recentActivityService.getRecentAtivities().subscribe(data=>{
    this.recentActivities = data
    for(let single of this.recentActivities){
      single.time = moment(single.createdAt).fromNow()
    }
    this.recentActivitiesLen = this.recentActivities.length
    
  });

  this.projectService.getAboutUs().subscribe(data=>{
    //this.spinner.hide()
    this.about = data
    this.aboutUs = this.about[0]

     this.aboutUsLen = this.aboutUs.length
    // if(this.aboutUsLen){
    //   this.aboutUsForm.patchValue(this.aboutUs[0])
    // }
    // console.log(this.aboutUsLen)
  });
  }


  addMember(){
    if(!this.memberAddPermissions.isSelected){
      const dialogRef = this._dialog.open(NoPermissionsComponent, {
        width: '30%',
        panelClass: ['custom-modal', 'animate__animated', 'animate__fadeInDown'],
        data: "you don't have permissions to add member"
        //data: supply
      });
      return;
    }
    const dialogRef = this._dialog.open(AddMemberComponent, {
      width: '30%',
      panelClass: ['custom-modal', 'animate__animated', 'animate__fadeInDown'],
      data: this.projects
    });
    dialogRef.afterClosed().subscribe(status => {
      console.log(status);
      if (status === 'yes') {
        this.projectService.getProjects().subscribe(data=>{
          //this.spinner.hide()
          this.projects = data
          console.log(this.projects)
          for(let single of this.projects){
            this.members.push(...single.members)
          }
          console.log(this.members)
        })
       // this.filterSubject.next(this.filterForm.value);
      }
      if (status === 'no') {
      }
    })
  }

  onChange(ev){
    console.log(ev.target.value)

    let selectedBar = this.projectsData.filter((project) => {
      
        return project.name == ev.target.value;
      
    });
    console.log(this.showDefaultFirst)


    this.showDefaultFirst = selectedBar[0]
    

    for(let data of this.showDefaultFirst.result){
      if(data.dailyCumulativeTotal && data.total){
        data.cpPercentage =  ((100 * data.dailyCumulativeTotal) / data.total).toFixed(1)
      }else{
        data.cpPercentage = 0
      }
      
    }

    console.log(this.showDefaultFirst)

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

           this.aboutUsLen = this.aboutUs.length
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
}
