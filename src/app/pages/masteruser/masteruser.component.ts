import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ToastService } from '@services/toast.service';
import { UsersService } from '@services/users.service';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { UsersDeleteMultipleComponent } from '../users-delete-multiple/users-delete-multiple.component';
import { MatDialog } from '@angular/material/dialog';
import { RecentActivityService } from '@services/recent-activity.service';
import * as moment from 'moment';
import { NoPermissionsComponent } from '../no-permissions/no-permissions.component';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import { MasterCreateuserComponent } from '../master-createuser/master-createuser.component';
import { AddTasksComponent } from '../add-tasks/add-tasks.component';
import { TaskService } from '@services/task.service';
import { EditActivityComponent } from '../edit-activity/edit-activity.component';
import { TaskDeleteMulActivityComponent } from '../task-delete-mul-activity/task-delete-mul-activity.component';

export interface PeriodicElement {
  SelectAll: string;
  No: string;
  taskName: string;
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
  displayedColumns = ['SelectAll', 'No', 'taskName',
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
  rolesPermissionsAdd:any;
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }
  recentActivities:any;
  recentActivitiesLen:any;
  permissions:any;
  tasks:any;
  tasksPermissionsAdd:any;
  tasksPermissionsEdit:any;
  tasksPermissionsDelete:any;
  tasksPermissionsDeleteMul:any;
  taskLen:any;
  constructor(public dialog: MatDialog,private userService:UsersService, private taskService:TaskService, private router:Router, private recentActivityService:RecentActivityService, private toast:ToastService,private _dialog: MatDialog,) { }

  ngOnInit(): void {

    this.permissions = JSON.parse(localStorage.getItem('loginData'))
    console.log(this.permissions)
    this.tasksPermissionsAdd = this.permissions.permissions[0]?.ParentChildchecklist[6]?.childList[0]
    this.tasksPermissionsEdit = this.permissions.permissions[0]?.ParentChildchecklist[6]?.childList[1]
    this.tasksPermissionsDelete = this.permissions.permissions[0]?.ParentChildchecklist[6]?.childList[2]
    //this.tasksPermissionsDeleteMul = this.permissions.permissions[0]?.ParentChildchecklist[6]?.childList[3]
    //this.rolesPermissionsEdit = this.permissions.permissions[0].ParentChildchecklist[3].childList[1]

    //console.log(this.progressPermissionsView)
    //console.log(this.progressPermissionsEdit)

    this.taskService.getAllTasks().subscribe(data=>{
      //this.spinner.hide()
      this.tasks = data
      this.taskLen = this.tasks.length
      this.dataSource = new MatTableDataSource(this.tasks);
      this.dataSource.paginator = this.paginator;
      console.log(this.tasks)
    });
    this.recentActivityService.getRecentAtivities().subscribe(data=>{
      this.recentActivities = data
      for(let single of this.recentActivities){
        single.time = moment(single.createdAt).fromNow()
      }
      this.recentActivitiesLen = this.recentActivities.length
      
    });
  }
  
  //dataSource = ELEMENT_DATA;


  deleteActivity(id){

    if(!this.tasksPermissionsDelete?.isSelected){
      const dialogRef = this._dialog.open(NoPermissionsComponent, {
        width: '30%',
        panelClass: ['custom-modal', 'animate__animated', 'animate__fadeInDown'],
        data: "you don't have permissions to delete activity"
        //data: supply
      });
      return;
    }

  this.taskService.deleteTask(id).subscribe(

    {
      next: (data: any) =>  {
        console.log(data)
        this.toast.openSnackBar("Activity deleted Successfully");
        this.taskService.getAllTasks().subscribe(data=>{
          //this.spinner.hide()
          this.tasks = data
          this.dataSource = new MatTableDataSource(this.tasks);
          this.dataSource.paginator = this.paginator;
          console.log(this.tasks)
        })
        
      },
      error: (err) => {
        this.toast.openSnackBar("Something went wrong. Unable to delete Activity");
        

        

      }
    }

  )
}

editActivity(ele){

  if(!this.tasksPermissionsEdit?.isSelected){
    const dialogRef = this._dialog.open(NoPermissionsComponent, {
      width: '30%',
      panelClass: ['custom-modal', 'animate__animated', 'animate__fadeInDown'],
      data: "you don't have permissions to edit activity"
      //data: supply
    });
    return;
  }

  const dialogRef = this._dialog.open(EditActivityComponent, {
    width: '30%',
    panelClass: ['custom-modal', 'animate__animated', 'animate__fadeInDown'],
    data: ele
  });
  dialogRef.afterClosed().subscribe(status => {
    console.log(status);
    if (status === 'yes') {
      this.taskService.getAllTasks().subscribe(data=>{
        //this.spinner.hide()
        this.tasks = data
        this.dataSource = new MatTableDataSource(this.tasks);
        this.dataSource.paginator = this.paginator;
        console.log(this.tasks)
      })
     // this.filterSubject.next(this.filterForm.value);
    }
    if (status === 'no') {
    }
  })

}

applyFilter(filterValue: any) {
  filterValue = filterValue.target.value.trim(); // Remove whitespace
  filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
  this.dataSource.filter = filterValue;
}

isAllSelected() {
  if (this.dataSource) {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  } else {
    return false;
  }
}
/** Selects all rows if they are not all selected; otherwise clear selection. */
masterToggle() {
  if (this.dataSource) {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
  }
}

checkboxLabel(row?: any): string {
  if (!row) {
    return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  }
  return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row`;
}

deleteMultipleDialog() {

  // if(!this.tasksPermissionsDeleteMul?.isSelected){
  //   const dialogRef = this._dialog.open(NoPermissionsComponent, {
  //     width: '30%',
  //     panelClass: ['custom-modal', 'animate__animated', 'animate__fadeInDown'],
  //     data: "you don't have permissions to delete multiple activities"
  //     //data: supply
  //   });
  //   return;
  // }

  if (this.selection.selected.length === 0) {
    this.toast.openSnackBar("Please select activities to delete");
    return;
  }
  const idArray = this.selection.selected.map(single => single._id);
  console.log(idArray)
  const dialogRef = this._dialog.open(TaskDeleteMulActivityComponent, {
    width: '30%',
    panelClass: ['custom-modal', 'animate__animated', 'animate__fadeInDown'],
    data: idArray
  });
  dialogRef.afterClosed().subscribe(status => {
    console.log(status);
    if (status === 'yes') {
      this.selection.clear();
      this.taskService.getAllTasks().subscribe(data=>{
        //this.spinner.hide()
        this.tasks = data
        this.dataSource = new MatTableDataSource(this.tasks);
        this.dataSource.paginator = this.paginator;
        console.log(this.tasks)
      })
    }
    if (status === 'no') {
    }
  })
}


  addActivity() {
    if(!this.tasksPermissionsAdd?.isSelected){
      const dialogRef = this._dialog.open(NoPermissionsComponent, {
        width: '30%',
        panelClass: ['custom-modal', 'animate__animated', 'animate__fadeInDown'],
        data: "you don't have permissions to add activity"
        //data: supply
      });
      return;
    }
    const dialogRef = this._dialog.open(AddTasksComponent, {
      width: '30%',
      panelClass: ['custom-modal', 'animate__animated', 'animate__fadeInDown']
      //data: supply
    });
    dialogRef.afterClosed().subscribe(status => {
      console.log(status);
      if (status === 'yes') {
        this.taskService.getAllTasks().subscribe(data=>{
          //this.spinner.hide()
          this.tasks = data
          this.dataSource = new MatTableDataSource(this.tasks);
          this.dataSource.paginator = this.paginator;
          console.log(this.tasks)
        })
       // this.filterSubject.next(this.filterForm.value);
      }
      if (status === 'no') {
      }
    })
  }
}