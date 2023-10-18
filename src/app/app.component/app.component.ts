import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SidePanelState, DashboardLayoutConfiguration, SidePanelPosition } from '../core';
import { AuthGuard } from '@services//auth.guard';
import { UsersService } from '@services//users.service';
import { NavigationLink } from '../shared';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public configuration: DashboardLayoutConfiguration;
  public links: NavigationLink[];
  menuSidebar:any;
  showDashboard:boolean
  constructor(private userService:UsersService, private router:Router, private authGuard:AuthGuard) {
    this.configuration = new DashboardLayoutConfiguration(
      SidePanelPosition.LEFT, 
      SidePanelState.OPEN
    );
    this.createLinks();
  }

  private createLinks() {
    this.links = [
      new NavigationLink("DPR", ['dpr'], "fas fa-home"),
    new NavigationLink("DMR", ['dashbaord'], "fas fa-tachometer-alt"),
      new NavigationLink("PROCUREMENTS", ['account'], "fas fa-user-circle"),
      //new NavigationLink("User Management", ['user-management'], "fas fa-user-circle")

    ]
    this.menuSidebar = [
      {
        link_name: "Dashboard",
        link: "/dashboard",
        icon: "bx bx-grid-alt",
        sub_menu: []
      }, {
        link_name: "Category",
        link: null,
        icon: "bx bx-collection",
        sub_menu: [
          {
            link_name: "HTML & CSS",
            link: "/html-n-css",
          }, {
            link_name: "JavaScript",
            link: "/javascript",
          }, {
            link_name: "PHP & MySQL",
            link: "/php-n-mysql",
          }
        ]
      },
    ]
  }

  ngOnInit(): void {

    this.userService.data.subscribe(data => {
      if(data === 'logout')
      this.showDashboard = false
      this.router.navigate(['/login']);
    })

    this.authGuard.authData.subscribe(data => {
      if(data === 'auth')
      this.showDashboard = false
      this.router.navigate(['/login']);
    })

    this.userService.dataOpen.subscribe(data => {
      if(data === 'dashboard'){
        this.showDashboard = true
        
      }
     
    })

    if(localStorage.getItem('loginData')){
      this.showDashboard = true
      //this.router.navigate(['/dpr']);
    }else{
      this.showDashboard = false
      this.router.navigate(['/login']);
    }
    
  }
}
