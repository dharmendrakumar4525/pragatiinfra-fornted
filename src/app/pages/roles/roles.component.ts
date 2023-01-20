import { Component, OnInit } from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import { NewRoleComponent } from '../new-role/new-role.component';
import { MatDialog } from '@angular/material/dialog';


export interface PeriodicElement {
  SelectAll: string;
  No: string;
  Name: string;
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

  checked = false;
  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = false;
  showFirstLastButtons = true;
  disabled = false;

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
  constructor(public dialog: MatDialog) { }
  openDialog(): void {
    const dialogRef = this.dialog.open(NewRoleComponent, {
      data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }


  ngOnInit(): void {
  }
  displayedColumns = ['SelectAll', 'No', 'Name', 'Action'];
  dataSource = ELEMENT_DATA;
}


const ELEMENT_DATA: PeriodicElement [] = [


  {SelectAll:'' , No: '1', Name: 'Admin', Action:'', },
  {SelectAll:'' , No: '2', Name: 'Employee', Action:'', },
 
  

];

