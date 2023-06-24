import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { NavigationSidePanelComponent } from './components/navigation-side-panel/navigation-side-panel.component';
import { SingleDoubleClickDirective } from './directives/single-double-click.directive';
import { MenuSearchPipe } from '@services//menuSearch.pipe';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    NavigationBarComponent, 
    NavigationSidePanelComponent, 
    SingleDoubleClickDirective,
    MenuSearchPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatIconModule
  ],
  exports: [
    NavigationBarComponent, 
    NavigationSidePanelComponent, 
    SingleDoubleClickDirective
  ]
})
export class SharedModule { }