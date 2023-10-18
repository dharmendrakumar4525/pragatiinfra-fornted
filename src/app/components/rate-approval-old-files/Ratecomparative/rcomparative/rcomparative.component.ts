import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VendorSelectionComponent } from '../../vendor-selection/vendor-selection.component';

@Component({
  selector: 'app-rcomparative',
  templateUrl: './rcomparative.component.html',
  styleUrls: ['./rcomparative.component.css']
})
export class RcomparativeComponent implements OnInit {

  constructor(public dialog: MatDialog) { }


  ngOnInit(): void {
  }
 
  
  openDialog(): void {
    const dialogRef = this.dialog.open(VendorSelectionComponent, {
      // width: '800px',
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

}
