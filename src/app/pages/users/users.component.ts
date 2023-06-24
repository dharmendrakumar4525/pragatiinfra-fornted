import { Component, OnInit, ViewChild } from '@angular/core';
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
    this.permissions = JSON.parse(localStorage.getItem('loginData'))
    console.log(this.permissions)
    this.userPermissionsAdd = this.permissions.permissions[0]?.ParentChildchecklist[4]?.childList[0]
    this.userPermissionsEdit = this.permissions.permissions[0]?.ParentChildchecklist[4]?.childList[1]
    this.userPermissionsDelete = this.permissions.permissions[0]?.ParentChildchecklist[4]?.childList[2]
    //this.userPermissionsDeleteMul = this.permissions.permissions[0]?.ParentChildchecklist[4]?.childList[3]
    this.userService.getUserss().subscribe(data=>{
      //this.spinner.hide()
      this.users = data
      this.usersLen = this.users.length
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      //console.log(this.roles)
    });
    this.recentActivityService.getRecentAtivities().subscribe(data=>{
      this.recentActivities = data
      for(let single of this.recentActivities){
        single.time = moment(single.createdAt).fromNow()
      }
      this.recentActivitiesLen = this.recentActivities.length
      
    });
  }

  deleteUser(id){
    if(!this.userPermissionsDelete?.isSelected){
      const dialogRef = this._dialog.open(NoPermissionsComponent, {
        width: '30%',
        panelClass: ['custom-modal', 'animate__animated', 'animate__fadeInDown'],
        data: "you don't have permissions to delete user"
        //data: supply
      });
      return;
    }
    this.userService.deleteUser(id).subscribe(
  
      {
        next: (data: any) =>  {
          console.log(data)
          this.toast.openSnackBar("User deleted Successfully");
          this.userService.getUserss().subscribe(data=>{
            //this.spinner.hide()
            this.users = data
            this.usersLen = this.users.length
            this.dataSource = new MatTableDataSource(this.users);
            this.dataSource.paginator = this.paginator;
            //console.log(this.roles)
          })
          
        },
        error: (err) => {
          this.toast.openSnackBar("Something went wrong. Unable to delete Use");
          
  
          
  
        }
      }
  
    )
  }

  // displayedColumns = ['SelectAll', 'No', 'name', 'email', 'role',
  // 'Action'];
  //dataSource = ELEMENT_DATA;
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
  // if(!this.userPermissionsDeleteMul?.isSelected){
  //   const dialogRef = this._dialog.open(NoPermissionsComponent, {
  //     width: '30%',
  //     panelClass: ['custom-modal', 'animate__animated', 'animate__fadeInDown'],
  //     data: "you don't have permissions to delete users"
  //     //data: supply
  //   });
  //   return;
  // }
  if (this.selection.selected.length === 0) {
    this.toast.openSnackBar("Please select users to delete");
    return;
  }
  const idArray = this.selection.selected.map(single => single._id);
  console.log(idArray)
  const dialogRef = this._dialog.open(UsersDeleteMultipleComponent, {
    width: '30%',
    panelClass: ['custom-modal', 'animate__animated', 'animate__fadeInDown'],
    data: idArray
  });
  dialogRef.afterClosed().subscribe(status => {
    console.log(status);
    if (status === 'yes') {
      this.selection.clear();
      this.userService.getUserss().subscribe(data=>{
        //this.spinner.hide()
        this.users = data
        this.usersLen = this.users.length
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
        //console.log(this.roles)
      })
    }
    if (status === 'no') {
    }
  })
}
editUser(element){
  if(!this.userPermissionsEdit?.isSelected){
    const dialogRef = this._dialog.open(NoPermissionsComponent, {
      width: '30%',
      panelClass: ['custom-modal', 'animate__animated', 'animate__fadeInDown'],
      data: "you don't have permissions to edit users"
      //data: supply
    });
    return;
  }
  this.router.navigate(['/edit-user',element._id]);
}

addUser(){
  if(!this.userPermissionsAdd?.isSelected){
    const dialogRef = this._dialog.open(NoPermissionsComponent, {
      width: '30%',
      panelClass: ['custom-modal', 'animate__animated', 'animate__fadeInDown'],
      data: "you don't have permissions to add users"
      //data: supply
    });
    return;
  }
  this.router.navigate(['/add-user']);
}
 
}


// const ELEMENT_DATA: PeriodicElement [] = [


//   {SelectAll:'' , No: '1', Name: 'Safiya', Email: 'abc@gmail.com',Roles:'develop',
//   Action:'', },
//   {SelectAll:'' , No: '2', Name: 'Safiya', Email: 'abc@gmail.com',Roles:'develop',
//   Action:'', },
//   {SelectAll:'' , No: '3', Name: 'Safiya', Email: 'abc@gmail.com',Roles:'develop',
//   Action:'', },

//   {SelectAll:'' , No: '4', Name: 'Safiya', Email: 'abc@gmail.com',Roles:'develop',
//   Action:'', },
//   {SelectAll:'' , No: '4', Name: 'Safiya', Email: 'abc@gmail.com',Roles:'develop',
//   Action:'', },
//   {SelectAll:'' , No: '4', Name: 'Safiya', Email: 'abc@gmail.com',Roles:'develop',
//   Action:'', },
//   {SelectAll:'' , No: '4', Name: 'Safiya', Email: 'abc@gmail.com',Roles:'develop',
//   Action:'', },





// ];

