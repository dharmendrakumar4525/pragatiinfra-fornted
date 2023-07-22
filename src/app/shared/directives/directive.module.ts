import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DigitOnlyDirective } from './digit-only.directive';
import { TotalDirective } from './total-calculator.directive';

@NgModule({
  declarations: [DigitOnlyDirective,TotalDirective],
  imports: [
    CommonModule,
  ],
  exports: [DigitOnlyDirective,TotalDirective]
})
export class DirectiveModule { }
