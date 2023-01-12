import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
 

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
  constructor() { }

  ngOnInit(): void {
  }

}
