import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import { LOCATION_API, ACTIVITY_API, STRUCTURE_API } from '@env/api_path';

@Component({
  selector: 'app-location-popup',
  templateUrl: './location-popup.component.html',
  styleUrls: ['./location-popup.component.scss']
})
export class LocationPopupComponent implements OnInit {

  type: any;
  parentItem: any;
  listData: Array<any> = [];
  selectedLocations = [];
  selectedLocationsArray = [];

  selectedStructures = [];
  selectedStructuresArray = [];

  selectedActivity = [];
  selectedActivityArray = [];
  currentRecords: any;
  idArray: any = [];
  constructor(
    private snack: SnackbarService,
    private request: RequestService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<LocationPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.type = this.data.type;
    this.parentItem = this.data.parentItem;
    this.currentRecords = this.data?.currentRecords;

    if (this.currentRecords) {

      if (this.type == 'location') {
        this.currentRecords.map(object => this.idArray.push(object.location_id));


      }
      if (this.type == 'structure') {
        this.currentRecords.map(object => this.idArray.push(object.structure_id));
      }

      if (this.type == 'activity') {
        this.currentRecords.map(object => this.idArray.push(object.activity_id));

      }
    }
  }



  onNoClick(): void {
    this.dialogRef.close({ option: 2, data: this.data });
  }

  onYesClick(): void {
    this.dialogRef.close({
      option: 1, data: {
        locations: this.selectedLocationsArray,
        activities: this.selectedActivityArray,
        structures: this.selectedStructuresArray
      }
    });
  }



  getList() {

    let api = '';

    if (this.type == 'location') {
      api = LOCATION_API
    }
    if (this.type == 'structure') {
      api = STRUCTURE_API
    }
    if (this.type == 'activity') {
      api = ACTIVITY_API
    }
    let requestData: any = {
      page: -1
    }

    this.request.GET(api, requestData).subscribe((resp: any) => {
      if (resp && resp.data) {
        this.listData = resp.data;
      }
    }, (err) => {
    });
  }


  onSelectLocation(event: any, itemObj: any) {
    if (event.checked) {
      let checkIndex = this.selectedLocations.includes(itemObj._id);
      if (!checkIndex) {
        this.selectedLocations.push(itemObj._id);
        this.selectedLocationsArray.push({
          location_name: itemObj.location_name,
          location_id: itemObj._id,
          structures: []
        })
      }
    } else {
      let checkIndex = this.selectedLocations.indexOf(itemObj._id);
      this.selectedLocations.splice(checkIndex, 1);
      this.selectedLocationsArray = this.selectedLocationsArray.filter((o: any) => o.location_id != itemObj._id);
    }
  }


  onSelectStructure(event: any, itemObj: any) {
    if (event.checked) {
      let checkIndex = this.selectedStructures.includes(itemObj._id);
      if (!checkIndex) {
        this.selectedStructures.push(itemObj._id);
        this.selectedStructuresArray.push({
          structure_name: itemObj.structure_name,
          structure_id: itemObj._id,
          activities: []
        })
      }
    } else {
      let checkIndex = this.selectedStructures.indexOf(itemObj._id);
      this.selectedStructures.splice(checkIndex, 1);
      this.selectedStructuresArray = this.selectedStructuresArray.filter((o: any) => o.Structure_id != itemObj._id);
    }
  }

  onSelectActivity(event: any, itemObj: any) {
    if (event.checked) {
      let checkIndex = this.selectedActivity.includes(itemObj._id);
      if (!checkIndex) {
        this.selectedActivity.push(itemObj._id);
        this.selectedActivityArray.push({
          activity_name: itemObj.activity_name,
          activity_id: itemObj._id
        })
      }
    } else {
      let checkIndex = this.selectedActivity.indexOf(itemObj._id);
      this.selectedActivity.splice(checkIndex, 1);
      this.selectedActivityArray = this.selectedActivityArray.filter((o: any) => o.Activity_id != itemObj._id);
    }
    console.log('this.selectedActivity', this.selectedActivity)
    console.log('this.selectedActivityArray', this.selectedActivityArray)
  }

  ngOnInit(): void {
    this.getList();

  }

}
