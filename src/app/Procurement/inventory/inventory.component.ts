import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { INVENTORY_API } from '@env/api_path';
import { RequestService } from '@services/https/request.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  searchValue: string = '';
  poArray: any;
  allpoArray: any = [];
  constructor(private route: ActivatedRoute,
    private httpService: RequestService) {
    this.httpService.GET(INVENTORY_API, {}).subscribe(res => {
      this.poArray = res.data;
      this.allpoArray = res.data;
    })

  }

  filterRecords(event: any) {
    console.log(this.allpoArray,event.target.value);
    
    if (event.target.value) {
      this.poArray = this.allpoArray.filter(obj => obj.items.item.item_name.toLowerCase().includes(event.target.value.toLowerCase()));
    }
    else {
      this.poArray = this.allpoArray
    }
  }

  ngOnInit(): void {
  }
}
