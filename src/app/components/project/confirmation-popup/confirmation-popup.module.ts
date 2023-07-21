import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmationPopupComponent } from './confirmation-popup.component';



@NgModule({
  declarations: [
    ConfirmationPopupComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    MatButtonModule,

    MatDialogModule,

    MatIconModule,
  ]
})
export class ConfirmationPopupModule { }
