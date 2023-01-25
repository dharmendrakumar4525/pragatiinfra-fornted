import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-no-permissions',
  templateUrl: './no-permissions.component.html',
  styleUrls: ['./no-permissions.component.css']
})
export class NoPermissionsComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<NoPermissionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    
  ) { }

  ngOnInit(): void {
  }

}
