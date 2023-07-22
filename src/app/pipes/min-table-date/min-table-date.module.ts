import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PsMinTableDatePipe } from './ps-min-table-date.pipe';



@NgModule({
  declarations: [
    PsMinTableDatePipe
  ],
  imports: [
    CommonModule
  ],
  exports:[PsMinTableDatePipe]
})
export class MinTableDateModule { }
