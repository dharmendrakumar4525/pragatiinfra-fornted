import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SUB_CATEGORY_API, CATEGORY_API } from '@env/api_path';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss']
})
export class AddDataComponent implements OnInit {

  addForm = new FormGroup({
    subcategory_name: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
  });
  categoryList: any = [];

  constructor(
    private router: Router,
    private httpService: RequestService,
    private snack: SnackbarService) {

    this.httpService.GET(CATEGORY_API, {}).subscribe(res => {
      this.categoryList = res.data;
    })
  }

  saveData() {
    if (this.addForm.valid) {
      this.httpService.POST(SUB_CATEGORY_API, this.addForm.value).subscribe(res => {
        this.snack.notify(" Data has been saved sucessfully.", 1);
        this.router.navigate(['sub-category']);
      })
    }
    else {
      this.addForm.markAllAsTouched();
    }

  }

  list() {
    this.router.navigate(['sub-category']);
  }

  ngOnInit(): void {
  }

}
