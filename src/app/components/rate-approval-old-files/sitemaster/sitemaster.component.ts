import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sitemaster',
  templateUrl: './sitemaster.component.html',
  styleUrls: ['./sitemaster.component.css']
})
export class SitemasterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }
searchValue:string = '';
}
