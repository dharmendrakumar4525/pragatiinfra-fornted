import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ToastService } from 'src/app/services/toast.service';
import { UsersService } from 'src/app/services/users.service';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { UsersDeleteMultipleComponent } from '../users-delete-multiple/users-delete-multiple.component';
import { MatDialog } from '@angular/material/dialog';
import { RecentActivityService } from 'src/app/services/recent-activity.service';
import * as moment from 'moment';
import { NoPermissionsComponent } from '../no-permissions/no-permissions.component';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';

export interface PeriodicElement {
  SelectAll: string;
  No: string;
  Name: string;
  Email: string;
  Roles:string;
  Action:string;

}

@Component({
  selector: 'app-masteruser',
  templateUrl: './masteruser.component.html',
  styleUrls: ['./masteruser.component.css']
})
export class MasteruserComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  checked = false;
  displayedColumns = ['SelectAll', 'No', 'name', 'email', 'role',
  'Action']
  dataSource = null;
  users:any
  usersLen:any;
  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  hidePageSize = false;
  showPageSizeOptions = false;
  showFirstLastButtons = true;
  disabled = false;
  pageEvent: PageEvent;
  selection = new SelectionModel<any>(true, []);
  userPermissionsAdd:any;
  userPermissionsEdit:any;
  userPermissionsDelete:any;
  userPermissionsDeleteMul:any;
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }
  recentActivities:any;
  recentActivitiesLen:any;
  permissions:any;
  constructor(private userService:UsersService, private router:Router, private recentActivityService:RecentActivityService, private toast:ToastService,private _dialog: MatDialog,) { }

  ngOnInit(): void {


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

  }
}