import { Component, OnInit } from '@angular/core';
export interface PeriodicElement {
  SelectAll: string;
  No: string;
  Name: string;
  Email: string;
  Roles:string;
  Action:string;

}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  checked = false;
  constructor() { }

  ngOnInit(): void {
  }
  displayedColumns = ['SelectAll', 'No', 'Name', 'Email', 'Roles',
  'Action'];
  dataSource = ELEMENT_DATA;

}
 
const ELEMENT_DATA: PeriodicElement [] = [


  {SelectAll:'' , No: '1', Name: 'Safiya', Email: 'abc@gmail.com',Roles:'develop',
  Action:'', },
  {SelectAll:'' , No: '2', Name: 'Safiya', Email: 'abc@gmail.com',Roles:'develop',
  Action:'', },
  {SelectAll:'' , No: '3', Name: 'Safiya', Email: 'abc@gmail.com',Roles:'develop',
  Action:'', },

  {SelectAll:'' , No: '4', Name: 'Safiya', Email: 'abc@gmail.com',Roles:'develop',
  Action:'', },
  {SelectAll:'' , No: '4', Name: 'Safiya', Email: 'abc@gmail.com',Roles:'develop',
  Action:'', },
  {SelectAll:'' , No: '4', Name: 'Safiya', Email: 'abc@gmail.com',Roles:'develop',
  Action:'', },
  {SelectAll:'' , No: '4', Name: 'Safiya', Email: 'abc@gmail.com',Roles:'develop',
  Action:'', },





];

