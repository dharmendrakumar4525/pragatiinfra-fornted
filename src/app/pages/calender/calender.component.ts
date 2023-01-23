import { Component, OnInit } from '@angular/core';
import { FormControl, FormArray, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CalenderService } from 'src/app/services/calender.service';
import { ProgressSheetService } from 'src/app/services/progress-sheet.service';
import { ToastService } from 'src/app/services/toast.service';





  
@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {
  selectedDate: Date = new Date();
  projectId:any;
  projectsData:any;
  project:any;
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
  constructor(private activeRoute: ActivatedRoute, private progressSheetService:ProgressSheetService, private toast:ToastService, private calenderService:CalenderService) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params:any) => {
        console.log(params.id)
        this.projectId = params.id

        this.calenderService.getProjectById(this.projectId).subscribe(data=>{
            this.project = data
        console.log(this.project)
        })

        this.progressSheetService.getTasksById(this.projectId).subscribe(data=>{
                  this.projectsData = data
              console.log(this.projectsData)
              })
  
      });
  }

  onBid(e,player,value,id) {
    player.cumTotal=value; //<-----this will add new property to your existing object with input value.
    console.log(player);
    console.log(id);
    this.calenderService.cumutaleTotalData(player,id).subscribe(

        {
          next: (data: any) =>  {
            console.log(data)
           
            this.toast.openSnackBar('Data updated successfully');
             //this.router.navigate(['/users']);
             
            
          },
          error: (err) => {
            this.toast.openSnackBar("Something went wrong. Unable to Update");
            
    
            
    
          }
        }
    
      )
 }
}
