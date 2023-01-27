import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AddDataComponent } from 'src/app/pages/add-data/add-data.component';
import { ProgressSheetService } from 'src/app/services/progress-sheet.service';
import { RecentActivityService } from 'src/app/services/recent-activity.service';
import { TaskService } from 'src/app/services/task.service';
import { NoPermissionsComponent } from '../no-permissions/no-permissions.component';
import * as moment from 'moment';

export interface PeriodicElement {
  Description: string;
  R2EndDate: string;
  R1EndDate: string;
  WorkingdaysRevised: string;
  BaselineStartDate:string;
  BaselineEndDate:string;
  UOM:string;
  Total:string
}
export interface GroupBy {
  initial: string;
  isGroupBy: boolean;
}

@Component({
  selector: 'app-progress-sheet',
  templateUrl: './progress-sheet.component.html',
  styleUrls: ['./progress-sheet.component.css']
})
export class ProgressSheetComponent implements OnInit {
    projectId:any
    progressData:any;
   // projectsData:any
    tasks:any
    projectsData = [];
    activesData:any;
    recentActivitiesLen:any
//   projectsData = [
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
   project:any;
   permissions:any
   progressPermissionsView:any;
   progressPermissionsEdit:any
   recentActivities:any
  constructor(private activeRoute: ActivatedRoute, private recentActivityService:RecentActivityService, private _dialog: MatDialog, private progressSheetService:ProgressSheetService, private taskService:TaskService) { }

  ngOnInit(): void {
    this.permissions = JSON.parse(localStorage.getItem('loginData'))
    console.log(this.permissions)
    this.progressPermissionsView = this.permissions.permissions[0].ParentChildchecklist[1].childList[1]
    this.progressPermissionsEdit = this.permissions.permissions[0].ParentChildchecklist[1].childList[0]
    console.log(this.progressPermissionsView)
    console.log(this.progressPermissionsEdit)
    this.activeRoute.params.subscribe((params:any) => {
        console.log(params.id)
        this.projectId = params.id
        this.progressSheetService.getProjectById(this.projectId).subscribe(data=>{
            this.project = data
        console.log(this.project)
        })
    //     this.progressSheetService.getTasksById(this.projectId).subscribe(data=>{
    //   //      this.projectsData = data
    //     console.log(this.projectsData)
    //     })

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
        this.recentActivitiesLen = this.recentActivities.length
        
      });
     
  }
  displayedColumns = ['Description', 'R2EndDate', 'R1EndDate', 'WorkingdaysRevised', 'BaselineStartDate',
  'BaselineEndDate', 'UOM','Total'];
  dataSource = ELEMENT_DATA;

  isGroup(index, item): boolean{
    return item.isGroupBy;
  }

  addData(subTask){
    if(!this.progressPermissionsEdit.isSelected){
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
        }
        if (status === 'no') {
        }
      })
  }
}



const ELEMENT_DATA: (PeriodicElement | GroupBy)[] = [

  {initial: 'Boundarywall', isGroupBy: true},
  {Description:'Cement' , R2EndDate: 'jan 16', R1EndDate: 'feb 1', WorkingdaysRevised: 'mar1',BaselineStartDate:'mar2',
  BaselineEndDate:'mar 3', UOM:'sqm', Total:'100'},
  {Description:'Evacuation' , R2EndDate: 'jan 16', R1EndDate: 'feb 1', WorkingdaysRevised: 'mar1',BaselineStartDate:'mar2',
  BaselineEndDate:'mar 3', UOM:'sqm', Total:'100'},
  {Description:'Cement' , R2EndDate: 'jan 16', R1EndDate: 'feb 1', WorkingdaysRevised: 'mar1',BaselineStartDate:'mar2',
  BaselineEndDate:'mar 3', UOM:'sqm', Total:'100'},
  {initial: 'Warehouse', isGroupBy: true},
  {Description:'ironrod' , R2EndDate: 'jan 16', R1EndDate: 'feb 1', WorkingdaysRevised: 'mar1',BaselineStartDate:'mar2',
  BaselineEndDate:'mar 3', UOM:'sqm', Total:'100'},
  {Description:'ironrod' , R2EndDate: 'jan 16', R1EndDate: 'feb 1', WorkingdaysRevised: 'mar1',BaselineStartDate:'mar2',
  BaselineEndDate:'mar 3', UOM:'sqm', Total:'100'},
  {Description:'floorbeam' , R2EndDate: 'jan 16', R1EndDate: 'feb 1', WorkingdaysRevised: 'mar1',BaselineStartDate:'mar2',
  BaselineEndDate:'mar 3', UOM:'sqm', Total:'100'},
  {initial: 'watertank', isGroupBy: true},
  {Description:'iron ' , R2EndDate: 'jan 16', R1EndDate: 'feb 1', WorkingdaysRevised: 'mar1',BaselineStartDate:'mar2',
  BaselineEndDate:'mar 3', UOM:'sqm', Total:'100'},
  {Description:'iron' , R2EndDate: 'jan 16', R1EndDate: 'feb 1', WorkingdaysRevised: 'mar1',BaselineStartDate:'mar2',
  BaselineEndDate:'mar 3', UOM:'sqm', Total:'100'},
  
];