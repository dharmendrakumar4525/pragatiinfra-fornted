import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CATEGORY_API, GST_API, ITEM_API, SUB_CATEGORY_API, UOM_API } from '@env/api_path';
import { environment } from '@env/environment';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import { isEmpty } from 'lodash';
@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss']
})
export class AddDataComponent implements OnInit {
  gstList: any = [];
  uomList: any = [];
  subCategoryList: any = [];
  categoryList: any = [];



  addForm = new FormGroup({
    item_name: new FormControl('', Validators.required),
    item_number: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    sub_category: new FormControl('', Validators.required),
    uom: new FormControl('', Validators.required),
    gst: new FormControl('', Validators.required),
    specification: new FormControl('', Validators.required),

  });
  allSubCategoryList: any = [];
  constructor(
    private router: Router,
    private httpService: RequestService,
    private snack: SnackbarService,
    private route: ActivatedRoute, http: HttpClient) {

    const uom = http.get<any>(`${environment.api_path}${UOM_API}`);
    const subCategory = http.get<any>(`${environment.api_path}${SUB_CATEGORY_API}`);
    const category = http.get<any>(`${environment.api_path}${CATEGORY_API}`);
    const gst = http.get<any>(`${environment.api_path}${GST_API}`);

    this.httpService.multipleRequests([uom, subCategory, category, gst], {}).subscribe(res => {
      this.uomList = res[0].data;
      this.subCategoryList = res[1].data;
      this.allSubCategoryList = res[1].data;
      this.categoryList = res[2].data;
      this.gstList = res[3].data;
    }, (err) => {
      if (err.errors && !isEmpty(err.errors)) {
        let errMessage = '<ul>';
        for (let e in err.errors) {
          let objData = err.errors[e];
          errMessage += `<li>${objData[0]}</li>`;
        }
        errMessage += '</ul>';
        this.snack.notifyHtml(errMessage, 2);
      } else {
        this.snack.notify(err.message, 2);
      }

    })


  }

  saveData() {
    if (this.addForm.valid) {
      this.httpService.POST(ITEM_API, this.addForm.value).subscribe(res => {
        this.snack.notify("Data has been saved sucessfully.", 1);
        this.router.navigate(['item']);
      }, (err) => {
        if (err.errors && !isEmpty(err.errors)) {
          let errMessage = '<ul>';
          for (let e in err.errors) {
            let objData = err.errors[e];
            errMessage += `<li>${objData[0]}</li>`;
          }
          errMessage += '</ul>';
          this.snack.notifyHtml(errMessage, 2);
        } else {
          this.snack.notify(err.message, 2);
        }

      })
    }
    else {
      this.addForm.markAllAsTouched();
    }

  }

  list() {
    this.router.navigate(['item']);
  }

  categoryChange(value: any) {
    this.subCategoryList = this.allSubCategoryList.filter(obj => obj.category == value)

  }

  ngOnInit(): void {
  }

}
