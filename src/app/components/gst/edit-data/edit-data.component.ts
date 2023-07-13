import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GST_API } from '@env/api_path';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';

@Component({
  selector: 'app-edit-data',
  templateUrl: './edit-data.component.html',
  styleUrls: ['./edit-data.component.scss']
})
export class EditDataComponent implements OnInit {


  editForm = new FormGroup({
    gst_name: new FormControl('', Validators.required),
    gst_percentage: new FormControl('', [Validators.required, Validators.max(33), Validators.min(0)]),
    _id: new FormControl()
  });
  constructor(
    private router: Router,
    private httpService: RequestService,
    private snack: SnackbarService,
    private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.httpService.GET(`${GST_API}/detail`, { _id: params['id'] }).subscribe((res: any) => {
          if (res) {
            this.patchValue(res.data);
          }
        })
      }
      else {
        this.list();
      }
    });

  }


  patchValue(data: any) {
    this.editForm.patchValue({
      gst_name: data.gst_name,
      gst_percentage: data.gst_percentage,
      _id: data._id

    })
  }

  saveData() {
    if (this.editForm.valid) {
      this.httpService.PUT(GST_API, this.editForm.value).subscribe(res => {
        this.snack.notify("Data has been saved sucessfully.", 1);
        this.router.navigate(['gst']);
      })
    }
    else {
      this.editForm.markAllAsTouched();
    }


  }

  list() {
    this.router.navigate(['gst']);
  }

  ngOnInit(): void {
  }
}
