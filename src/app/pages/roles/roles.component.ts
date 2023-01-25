import { Component, OnInit } from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import { NewRoleComponent } from '../new-role/new-role.component';
import { MatDialog } from '@angular/material/dialog';
import { NewPermissionComponent } from '../new-permission/new-permission.component';
import { RolesService } from 'src/app/services/roles.service';
import { MatTableDataSource } from '@angular/material/table';
import { ToastService } from 'src/app/services/toast.service';


export interface PeriodicElement {
  SelectAll: string;
  sNo: string;
  role: string;
  Action:string;

}
@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  animal: string;
  name: string;
  roles:any;
  checked = false;
  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = false;
  showFirstLastButtons = true;
  disabled = false;
  displayedColumns = ['SelectAll', 'sNo', 'role', 'Action'];
  dataSource = null;
  pageEvent: PageEvent;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
  constructor(public dialog: MatDialog,private _dialog: MatDialog, private roleService:RolesService, private toast:ToastService) { }
  addRole() {
    const dialogRef = this._dialog.open(NewRoleComponent, {
      width: '30%',
      panelClass: ['custom-modal', 'animate__animated', 'animate__fadeInDown']
      //data: supply
    });
    dialogRef.afterClosed().subscribe(status => {
      console.log(status);
      if (status === 'yes') {
        this.roleService.getRoles().subscribe(data=>{
          //this.spinner.hide()
          this.roles = data
          this.dataSource = new MatTableDataSource(this.roles);
          console.log(this.roles)
        })
       // this.filterSubject.next(this.filterForm.value);
      }
      if (status === 'no') {
      }
    })
  }


  ngOnInit(): void {
    this.roleService.getRoles().subscribe(data=>{
      //this.spinner.hide()
      this.roles = data
      this.dataSource = new MatTableDataSource(this.roles);
      console.log(this.roles)
    })
  }
  
  //dataSource = ELEMENT_DATA;


  deleteRole(id){

  this.roleService.deleteRole(id).subscribe(

    {
      next: (data: any) =>  {
        console.log(data)
        this.toast.openSnackBar("Role deleted Successfully");
        this.roleService.getRoles().subscribe(data=>{
          //this.spinner.hide()
          this.roles = data
          this.dataSource = new MatTableDataSource(this.roles);
          console.log(this.roles)
        })
        
      },
      error: (err) => {
        this.toast.openSnackBar("Something went wrong. Unable to delete role");
        

        

      }
    }

  )
}
}
// const ELEMENT_DATA: PeriodicElement [] = [


//   {SelectAll:'' , No: '1', Name: 'Admin', Action:'', },
//   {SelectAll:'' , No: '2', Name: 'Employee', Action:'', },
 
  

// ];

