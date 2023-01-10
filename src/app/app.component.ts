import { Component } from '@angular/core';
import { SidePanelState, DashboardLayoutConfiguration, SidePanelPosition } from './core';
import { NavigationLink } from './shared';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public configuration: DashboardLayoutConfiguration;
  public links: NavigationLink[];
  
  constructor() {
    this.configuration = new DashboardLayoutConfiguration(
      SidePanelPosition.LEFT, 
      SidePanelState.OPEN
    );
    this.createLinks();
  }

  private createLinks() {
    this.links = [
      new NavigationLink("DPR", ['dpr'], "fas fa-home"),
      new NavigationLink("Dashboard", ['dashbaord'], "fas fa-tachometer-alt"),
      new NavigationLink("Account Info", ['account'], "fas fa-user-circle")
    ]
  }
}
