import { Component, OnInit } from '@angular/core';
import { NewPermissionComponent } from '../new-permission/new-permission.component';
import { MatDialog } from '@angular/material/dialog';

export interface PeriodicElement {
  SelectAll: string;
  No: string;
  Name: string;
  Action:string;

}
@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent implements OnInit {

  animal: string;
  name: string;

  checked = false;
  constructor(public dialog: MatDialog) { }
  openDialog(): void {
    const dialogRef = this.dialog.open(NewPermissionComponent, {
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


  {SelectAll:'' , No: '1', Name: 'Safiya', Action:'', },
  {SelectAll:'' , No: '2', Name: 'Safiya', Action:'', },
  {SelectAll:'' , No: '3', Name: 'Safiya', Action:'', },
  {SelectAll:'' , No: '4', Name: 'Safiya', Action:'', },
  {SelectAll:'' , No: '5', Name: 'Safiya', Action:'', },
  {SelectAll:'' , No: '6', Name: 'Safiya', Action:'', },
  {SelectAll:'' , No: '7', Name: 'Safiya', Action:'', },
  {SelectAll:'' , No: '8', Name: 'Safiya', Action:'', },
  {SelectAll:'' , No: '9', Name: 'Safiya', Action:'', },
  

];

