import { Component, OnInit } from '@angular/core';
export interface PeriodicElement {
  Description: string;
  R2EndDate: string;
  R1EndDate: string;
  WorkingdaysRevised: string;
  BaselineStartDate:string;
  BaselineEndDate:string;
  UOM:string;
  Total:string
}
export interface GroupBy {
  initial: string;
  isGroupBy: boolean;
}

@Component({
  selector: 'app-progress-sheet',
  templateUrl: './progress-sheet.component.html',
  styleUrls: ['./progress-sheet.component.css']
})
export class ProgressSheetComponent implements OnInit {

  

  constructor() { }

  ngOnInit(): void {
  }
  displayedColumns = ['Description', 'R2EndDate', 'R1EndDate', 'WorkingdaysRevised', 'BaselineStartDate',
  'BaselineEndDate', 'UOM','Total'];
  dataSource = ELEMENT_DATA;

  isGroup(index, item): boolean{
    return item.isGroupBy;
  }
}



const ELEMENT_DATA: (PeriodicElement | GroupBy)[] = [

  {initial: 'Boundarywall', isGroupBy: true},
  {Description:'Cement' , R2EndDate: 'jan 16', R1EndDate: 'feb 1', WorkingdaysRevised: 'mar1',BaselineStartDate:'mar2',
  BaselineEndDate:'mar 3', UOM:'sqm', Total:'100'},
  {Description:'Evacuation' , R2EndDate: 'jan 16', R1EndDate: 'feb 1', WorkingdaysRevised: 'mar1',BaselineStartDate:'mar2',
  BaselineEndDate:'mar 3', UOM:'sqm', Total:'100'},
  {Description:'Cement' , R2EndDate: 'jan 16', R1EndDate: 'feb 1', WorkingdaysRevised: 'mar1',BaselineStartDate:'mar2',
  BaselineEndDate:'mar 3', UOM:'sqm', Total:'100'},
  {initial: 'Warehouse', isGroupBy: true},
  {Description:'ironrod' , R2EndDate: 'jan 16', R1EndDate: 'feb 1', WorkingdaysRevised: 'mar1',BaselineStartDate:'mar2',
  BaselineEndDate:'mar 3', UOM:'sqm', Total:'100'},
  {Description:'ironrod' , R2EndDate: 'jan 16', R1EndDate: 'feb 1', WorkingdaysRevised: 'mar1',BaselineStartDate:'mar2',
  BaselineEndDate:'mar 3', UOM:'sqm', Total:'100'},
  {Description:'floorbeam' , R2EndDate: 'jan 16', R1EndDate: 'feb 1', WorkingdaysRevised: 'mar1',BaselineStartDate:'mar2',
  BaselineEndDate:'mar 3', UOM:'sqm', Total:'100'},
  {initial: 'watertank', isGroupBy: true},
  {Description:'iron ' , R2EndDate: 'jan 16', R1EndDate: 'feb 1', WorkingdaysRevised: 'mar1',BaselineStartDate:'mar2',
  BaselineEndDate:'mar 3', UOM:'sqm', Total:'100'},
  {Description:'iron' , R2EndDate: 'jan 16', R1EndDate: 'feb 1', WorkingdaysRevised: 'mar1',BaselineStartDate:'mar2',
  BaselineEndDate:'mar 3', UOM:'sqm', Total:'100'},
  
];