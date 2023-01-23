import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Chart, registerables } from 'chart.js';
import { DataAnalysisService } from 'src/app/services/data-analysis.service';
Chart.register(...registerables);
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  
}


@Component({
  selector: 'app-data-analysis',
  templateUrl: './data-analysis.component.html',
  styleUrls: ['./data-analysis.component.css']
})
export class DataAnalysisComponent implements OnInit {
  dateFilter: (date: Date | null) => boolean =
  (date: Date | null) => {
    if (!date) {
      return false;
    }
    const day = date.getDay();
    return day == 1; // 1 means monday, 0 means sunday, etc.
  };
  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 3, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 6, color: 'lightgreen' },
    {text: 'Three', cols: 3, rows: 3, color: 'lightpink'},
   
  ];
  projectId:any
  project:any;
  constructor(private activeRoute: ActivatedRoute, private dataAnalysis:DataAnalysisService) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params:any) => {
      console.log(params.id)
      this.projectId = params.id

      this.dataAnalysis.getProjectById(this.projectId).subscribe(data=>{
        this.project = data
    console.log(this.project)
    })

    });
    var myChart = new Chart('overviewChart', {
      type: 'line',
      data: {
          labels: ['2012', '2013', '2014', '2015', '2016', '2017'],
          datasets: [
            {
              label: 'Remaining Task',
              data: [12, 90, 20, 40, 2, 3],
               backgroundColor: '#267ADC',
              borderColor: '#267ADC',
              borderWidth: 1
          },
          {
            label: 'Completed Task',
            data: [20, 50, 90, 10, 70, 3],
             backgroundColor: 'black',
            borderColor: 'black',
            borderWidth: 1
        }
        
        
        
        ]
      },
      options: {
        scales: {
            y: {
                suggestedMin: 50,
                suggestedMax: 100
            }
        }
    }
  });
  }

}
