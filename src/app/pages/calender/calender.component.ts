import { Component, OnInit } from '@angular/core';
import { FormControl, FormArray, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {  ViewChild } from '@angular/core';
//import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
//import dayGridPlugin from '@fullcalendar/daygrid';
//import timeGrigPlugin from '@fullcalendar/timegrid';
//import interactionPlugin from '@fullcalendar/interaction'; // for dateClick



  
@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {
    //@ViewChild('calendar') calendarComponent: FullCalendarComponent; // the #calendar in the template

  calendarVisible = true;
  //calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarWeekends = true;
  

  toggleVisible() {
    this.calendarVisible = !this.calendarVisible;
  }

  toggleWeekends() {
    this.calendarWeekends = !this.calendarWeekends;
  }

  gotoPast() {
    //let calendarApi = this.calendarComponent.getApi();
    //calendarApi.gotoDate('2000-01-01'); // call a method on the Calendar object
  }

  handleDateClick(arg) {
    if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
    //   this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
    //     title: 'New Event',
    //     start: arg.date,
    //     allDay: arg.allDay
    //   })
    }
  }
  selectedDate: Date = new Date();
  projectId:any;
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
  constructor(private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params:any) => {
        console.log(params.id)
        this.projectId = params.id
  
      });
  }

}
