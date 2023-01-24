import { Component, OnInit,Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddProjectService } from 'src/app/services/add-project.service';
import { AddMemberComponent } from '../add-member/add-member.component';



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
  cards = [
    {
      title: ' Total  Projects',
      count:'22'
    
    },
    {
      title: 'Completed Projects',
      count:'10'
    },
    {
      title: 'Incomplete Projects',
      count:'5'
    },
    {
      title: 'Overdue Projects',
      count:'2'
    },

  ];
  members = [];
  constructor(private projectService: AddProjectService,private _dialog: MatDialog) { }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(data=>{
      //this.spinner.hide()
      this.projects = data
      console.log(this.projects)
      for(let single of this.projects){
        this.members.push(...single.members)
      }
      console.log(this.members)
    })
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
