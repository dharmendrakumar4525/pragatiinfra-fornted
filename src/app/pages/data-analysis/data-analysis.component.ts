import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Chart, registerables } from 'chart.js';
import { AddProjectService } from '@services/add-project.service';
import { DataAnalysisService } from '@services/data-analysis.service';
import { RecentActivityService } from '@services/recent-activity.service';
import * as moment from 'moment';
import { ProgressSheetService } from '@services/progress-sheet.service';
import { NoPermissionsComponent } from '../no-permissions/no-permissions.component';
import { AboutUsComponent } from '../about-us/about-us.component';
import { InnerAddMemberComponent } from '../inner-add-member/inner-add-member.component';
import { ToastService } from '@services/toast.service';
import { ProjectDeletePopupComponent } from '../project-delete-popup/project-delete-popup.component';

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
  activesData: any;
  dateFilter: (date: Date | null) => boolean =
    (date: Date | null) => {
      if (!date) {
        return false;
      }
      const day = date.getDay();
      return day == 1; // 1 means monday, 0 means sunday, etc.
    };
  tiles: Tile[] = [
    { text: 'One', cols: 3, rows: 3, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 6, color: 'lightgreen' },
    { text: 'Three', cols: 3, rows: 3, color: 'lightpink' },

  ];
  projectId: any
  project: any = {};
  projects: any;
  members = [];
  recentActivities: any;
  showDefaultFirst: any = {};
  recentActivitiesLen: any;
  memberAddPermissions: any;
  permissions: any;
  about: any;
  aboutUs: any;
  aboutUsLen: any;
  graphData = []
  projectsList: any;
  lineGraph: any;
  xAxis = [];
  totalMat: any;
  xReqData = []
  myChart: any;
  month: any;
  day: any;
  projectsDeletePermissions: any;
  projectNameForm: FormGroup = this._fb.group({
    _id: [null],
  });
  constructor(private activeRoute: ActivatedRoute, private toast: ToastService, private router: Router, private _fb: FormBuilder, private progressSheetService: ProgressSheetService, private recentActivityService: RecentActivityService, private _dialog: MatDialog, private projectService: AddProjectService, private dataAnalysis: DataAnalysisService) { }

  ngOnInit(): void {
    this.permissions = JSON.parse(localStorage.getItem('loginData'))
    //console.log(this.permissions)
    //this.projectsViewPermissions = this.permissions.permissions[0].ParentChildchecklist[0].childList[1]
    this.memberAddPermissions = this.permissions.permissions[0]?.ParentChildchecklist[5]?.childList[0]
    this.projectsDeletePermissions = this.permissions.permissions[0]?.ParentChildchecklist[0]?.childList[3]
    this.month = new Date().toLocaleString('default', { month: 'short' });
    ///let year = new Date(single.date).getFullYear()
    this.day = new Date().getDate()
    this.projectService.getProjects().subscribe(data => {
      //this.spinner.hide()
      this.projects = data
      // console.log(this.projects)
      // for(let single of this.projects){
      //   this.members.push(...single.members)
      // }
      // console.log(this.members)
    })

    this.activeRoute.params.subscribe((params: any) => {
      console.log(params.id)
      this.projectId = params.id


      this.progressSheetService.getActivitiesByProjectId(this.projectId).subscribe(data => {
        this.activesData = data
        console.log(this.activesData)
        this.totalMat = this.activesData.map(item => item.total).reduce((prev, curr) => prev + curr, 0);
        // for(let one of this.activesData){
        //   this.graphData.push(one.dailyCumulativeTotal)
        // }
        // console.log(this.graphData)
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

        this.showDefaultFirst = this.projectsData[0] ? this.projectsData[0] : {}
        console.log(this.showDefaultFirst);


        if(this.showDefaultFirst && this.showDefaultFirst.result){
          for (let data of this.showDefaultFirst?.result) {
            if (data.dailyCumulativeTotal && data.total) {
              data.cpPercentage = ((100 * data.dailyCumulativeTotal) / data.total).toFixed(0)
            } else {
              data.cpPercentage = 0
            }

          }
        }

        console.log(this.showDefaultFirst)



      })

      this.dataAnalysis.getProjectById(this.projectId).subscribe(data => {
        this.project = data
        this.projectNameForm.patchValue({
          _id: this.project._id
        })
        this.members = this.project.members
        console.log(this.project)
      })

      this.dataAnalysis.getLineGraph(this.projectId).subscribe(data => {
        //this.spinner.hide()
        this.lineGraph = data
        for (let single of this.lineGraph) {
          let month = new Date(single.date).toLocaleString('default', { month: 'short' });
          let year = new Date(single.date).getFullYear()
          let day = new Date(single.date).getDate()
          single.reqDate = `${month} ${day},${year}`
        }

        this.lineGraph.forEach(obj => {

          const arr = this.graphData.filter(ele => ele['name'] === obj['reqDate']);
          if (arr.length === 0) {
            this.graphData.push(
              { 'name': obj['reqDate'] });
          }
        });

        this.graphData.forEach(obj => {
          const uniqData = this.lineGraph.filter(ele => ele['reqDate'] === obj['name']);
          obj['data'] = uniqData;

        });
        console.log(this.graphData);

        let total = 0

        for (let single of this.graphData) {

          this.xAxis.push(single.name)

          for (let one of single.data) {

            total = total + one.value



          }

          let totData = ((100 * total) / this.totalMat).toFixed(0)

          this.xReqData.push(totData)



          //console.log(total)

          //this.cum

        }

        this.myChart = new Chart('overviewChart', {
          type: 'line',
          data: {
            labels: this.xAxis,
            datasets: [
              {
                label: 'Completed Project in (%)',
                data: this.xReqData,
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

        //console.log(this.lineGraph)

      });

    });










    this.recentActivityService.getRecentAtivities().subscribe(data => {
      this.recentActivities = data
      for (let single of this.recentActivities) {
        single.time = moment(single.createdAt).fromNow()
      }
      this.recentActivitiesLen = this.recentActivities.length

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

  onChange(ev) {
    console.log(ev.target.value)

    let selectedBar = this.projectsData.filter((project) => {

      return project.name == ev.target.value;

    });
    console.log(this.showDefaultFirst)


    this.showDefaultFirst = selectedBar[0]


    for (let data of this.showDefaultFirst.result) {
      if (data.dailyCumulativeTotal && data.total) {
        data.cpPercentage = ((100 * data.dailyCumulativeTotal) / data.total).toFixed(1)
      } else {
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

  onChangeProject(ev) {
    this.router.navigate(['/view-project/data-analysis', ev.target.value]);
  }


  filterFrom(ev) {
    console.log(ev.value)

    this.month = new Date(ev.value).toLocaleString('default', { month: 'short' });
    ///let year = new Date(single.date).getFullYear()
    this.day = new Date(ev.value).getDate()


    this.dataAnalysis.calenderFilter(ev.value, this.projectId).subscribe(

      {
        next: (data: any) => {
          console.log(data)
          this.graphData = []
          this.xAxis = []
          this.xReqData = []
          this.lineGraph = data
          for (let single of this.lineGraph) {
            let month = new Date(single.date).toLocaleString('default', { month: 'short' });
            let year = new Date(single.date).getFullYear()
            let day = new Date(single.date).getDate()
            single.reqDate = `${month} ${day},${year}`
          }

          this.lineGraph.forEach(obj => {

            const arr = this.graphData.filter(ele => ele['name'] === obj['reqDate']);
            if (arr.length === 0) {
              this.graphData.push(
                { 'name': obj['reqDate'] });
            }
          });

          this.graphData.forEach(obj => {
            const uniqData = this.lineGraph.filter(ele => ele['reqDate'] === obj['name']);
            obj['data'] = uniqData;

          });
          console.log(this.graphData);

          let total = 0

          for (let single of this.graphData) {

            this.xAxis.push(single.name)

            for (let one of single.data) {

              total = total + one.value



            }

            let totData = ((100 * total) / this.totalMat).toFixed(0)

            this.xReqData.push(totData)



            //console.log(total)

            //this.cum

          }

          // new Chart()

          this.myChart.destroy();

          this.myChart = new Chart('overviewChart', {
            type: 'line',
            data: {
              labels: this.xAxis,
              datasets: [
                {
                  label: 'Completed Task',
                  data: this.xReqData,
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


        },
        error: (err) => {
          this.toast.openSnackBar("Something went wrong. Unable to Show graph");




        }
      }

    )
  }


  deleteProject(id) {

    if (!this.projectsDeletePermissions?.isSelected) {
      const dialogRef = this._dialog.open(NoPermissionsComponent, {
        width: '30%',
        panelClass: ['custom-modal', 'animate__animated', 'animate__fadeInDown'],
        data: "you don't have permissions to Delete project"
        //data: supply
      });
      return;
    }
    // if(!this.userPermissionsDelete?.isSelected){
    //   const dialogRef = this._dialog.open(NoPermissionsComponent, {
    //     width: '30%',
    //     panelClass: ['custom-modal', 'animate__animated', 'animate__fadeInDown'],
    //     data: "you don't have permissions to delete user"
    //     //data: supply
    //   });
    //   return;
    // }


    const dialogRef = this._dialog.open(ProjectDeletePopupComponent, {
      width: '30%',
      panelClass: ['custom-modal', 'animate__animated', 'animate__fadeInDown'],
      data: id
    });
    dialogRef.afterClosed().subscribe(status => {
      console.log(status);
      if (status === 'yes') {

        this.router.navigate(['/']);
      }
      if (status === 'no') {
      }
    })


  }

}
