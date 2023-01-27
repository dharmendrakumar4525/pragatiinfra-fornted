import { Component, OnInit,Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddProjectService } from 'src/app/services/add-project.service';
import { RecentActivityService } from 'src/app/services/recent-activity.service';
import { AddMemberComponent } from '../add-member/add-member.component';
import * as moment from 'moment';



@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  @Input() people: string;
  location1: string;
  location2: string;
  
  hidden = false;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }


  projects:any;
  cards :any;
  members = [];
  permissions:any;
  projectsViewPermissions:any;
  projectName = "";
  aa:boolean=false;
  recentActivities:any
  filterProjects = [];
  recentActivitiesLen:any;
  constructor(private projectService: AddProjectService,private _dialog: MatDialog, private recentActivityService:RecentActivityService) { }

  ngOnInit(): void {
    this.permissions = JSON.parse(localStorage.getItem('loginData'))
    console.log(this.permissions)
    this.projectsViewPermissions = this.permissions.permissions[0].ParentChildchecklist[0].childList[1]
    this.projectService.getProjects().subscribe(data=>{
      //this.spinner.hide()
      this.projects = data;
      console.log(this.projects)
      if(this.permissions.user.role !== 'superadmin'){

        this.filterProjects = this.projects.filter((product) => {
          return product.members.some((prod) => {
            return prod === this.permissions.user.email;
          });
        });
        //push(this.projects.find(product => product.members.some(item => item === this.permissions.user.email)))
        
      console.log(this.filterProjects)
      this.projects = this.filterProjects
      }
      
      this.cards = [
        {
          title: ' Total  Projects',
          count:this.projects.length
        
        },
        {
          title: 'Completed Projects',
          count:'0'
        },
        {
          title: 'Incomplete Projects',
          count:this.projects.length
        },
        {
          title: 'Overdue Projects',
          count:'0'
        },
    
      ];
      console.log(this.projects)
      for(let single of this.projects){
        this.members.push(...single.members)
      }
      console.log(this.members)
    });
    this.recentActivityService.getRecentAtivities().subscribe(data=>{
      this.recentActivities = data
      for(let single of this.recentActivities){
        single.time = moment(single.createdAt).fromNow()
      }
      this.recentActivitiesLen = this.recentActivities.length
      
    });
  }
  setIndex(ii){
    this.aa=ii;
    console.log
  }

  addMember(){
    const dialogRef = this._dialog.open(AddMemberComponent, {
      width: '30%',
      panelClass: ['custom-modal', 'animate__animated', 'animate__fadeInDown'],
      data: this.projects
    });
    dialogRef.afterClosed().subscribe(status => {
      console.log(status);
      if (status === 'yes') {
        this.projectService.getProjects().subscribe(data=>{
          //this.spinner.hide()
          this.projects = data
          console.log(this.projects)
          for(let single of this.projects){
            this.members.push(...single.members)
          }
          console.log(this.members)
        })
       // this.filterSubject.next(this.filterForm.value);
      }
      if (status === 'no') {
      }
    })
  }

}
