import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RejectReasonComponent } from '../../reject-reason/reject-reason.component';

@Component({
  selector: 'app-rateapprovals',
  templateUrl: './rateapprovals.component.html',
  styleUrls: ['./rateapprovals.component.css']
})
export class RateapprovalsComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
 
  openDialog(): void {
    const dialogRef = this.dialog.open(RejectReasonComponent, {
      // width: '800px',
      height:'500px',
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

}


