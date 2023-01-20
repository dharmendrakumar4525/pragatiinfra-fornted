import { Component, OnInit } from '@angular/core';
import { FormControl, FormArray, FormGroup, Validators } from '@angular/forms';




  
@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {
  selectedDate: Date = new Date();

 projectsData = [
  {
      "_id": "63c6aa45a1593c88fae7b09b",
      "taskName": "Boundarywall",
      "projectId": "63c6aa44a1593c88fae7b099",
      "taskId": "63be3548941e8f5b1b1f0928",
      "createdAt": "2023-01-17T14:01:41.032Z",
      "__v": 0,
      "result": [
          {
              "_id": "63c6aa45a1593c88fae7b09e",
              "subTaskName": "cement",
              "taskId": "63be3548941e8f5b1b1f0928",
              "__v": 0
          },
          {
              "_id": "63c6aa45a1593c88fae7b09f",
              "subTaskName": "evacuation",
              "taskId": "63be3548941e8f5b1b1f0928",
              "__v": 0
          }
      ]
  },
  {
      "_id": "63c6aa45a1593c88fae7b09c",
      "taskName": "Warehouse",
      "projectId": "63c6aa44a1593c88fae7b099",
      "taskId": "63be66c7e2063a320960a7ec",
      "createdAt": "2023-01-17T14:01:41.032Z",
      "__v": 0,
      "result": [
          {
              "_id": "63c6aa45a1593c88fae7b0a0",
              "subTaskName": "Iron",
              "taskId": "63be66c7e2063a320960a7ec",
              "__v": 0
          },
          {
              "_id": "63c6aa45a1593c88fae7b0a1",
              "subTaskName": "tiebeam",
              "taskId": "63be66c7e2063a320960a7ec",
              "__v": 0
          }
      ]
  },
  {
    "_id": "63c6aa45a1593c88fae7b09b",
    "taskName": "Boundarywall",
    "projectId": "63c6aa44a1593c88fae7b099",
    "taskId": "63be3548941e8f5b1b1f0928",
    "createdAt": "2023-01-17T14:01:41.032Z",
    "__v": 0,
    "result": [
        {
            "_id": "63c6aa45a1593c88fae7b09e",
            "subTaskName": "cement",
            "taskId": "63be3548941e8f5b1b1f0928",
            "__v": 0
        },
        {
            "_id": "63c6aa45a1593c88fae7b09f",
            "subTaskName": "evacuation",
            "taskId": "63be3548941e8f5b1b1f0928",
            "__v": 0
        }
    ]
},
{
    "_id": "63c6aa45a1593c88fae7b09c",
    "taskName": "Warehouse",
    "projectId": "63c6aa44a1593c88fae7b099",
    "taskId": "63be66c7e2063a320960a7ec",
    "createdAt": "2023-01-17T14:01:41.032Z",
    "__v": 0,
    "result": [
        {
            "_id": "63c6aa45a1593c88fae7b0a0",
            "subTaskName": "Iron",
            "taskId": "63be66c7e2063a320960a7ec",
            "__v": 0
        },
        {
            "_id": "63c6aa45a1593c88fae7b0a1",
            "subTaskName": "tiebeam",
            "taskId": "63be66c7e2063a320960a7ec",
            "__v": 0
        }
    ]
},
{
    "_id": "63c6aa45a1593c88fae7b09b",
    "taskName": "Boundarywall",
    "projectId": "63c6aa44a1593c88fae7b099",
    "taskId": "63be3548941e8f5b1b1f0928",
    "createdAt": "2023-01-17T14:01:41.032Z",
    "__v": 0,
    "result": [
        {
            "_id": "63c6aa45a1593c88fae7b09e",
            "subTaskName": "cement",
            "taskId": "63be3548941e8f5b1b1f0928",
            "__v": 0
        },
        {
            "_id": "63c6aa45a1593c88fae7b09f",
            "subTaskName": "evacuation",
            "taskId": "63be3548941e8f5b1b1f0928",
            "__v": 0
        }
    ]
},
{
    "_id": "63c6aa45a1593c88fae7b09c",
    "taskName": "Warehouse",
    "projectId": "63c6aa44a1593c88fae7b099",
    "taskId": "63be66c7e2063a320960a7ec",
    "createdAt": "2023-01-17T14:01:41.032Z",
    "__v": 0,
    "result": [
        {
            "_id": "63c6aa45a1593c88fae7b0a0",
            "subTaskName": "Iron",
            "taskId": "63be66c7e2063a320960a7ec",
            "__v": 0
        },
        {
            "_id": "63c6aa45a1593c88fae7b0a1",
            "subTaskName": "tiebeam",
            "taskId": "63be66c7e2063a320960a7ec",
            "__v": 0
        }
    ]
}
] 
  constructor() { }

  ngOnInit(): void {
  }

}
