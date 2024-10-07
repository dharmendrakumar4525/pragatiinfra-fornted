import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CATEGORY_API,SUB_CATEGORY_API, VENDOR_API } from '@env/api_path';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';

import { isEmpty } from 'lodash';
@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss']
})
export class AddDataComponent implements OnInit {

  AllSubCategoryList:any=[];
  subCategoryList:any=[];
  vendorLength:number;


  addForm = new FormGroup({
    vendor_name: new FormControl("", Validators.required),
    category: new FormControl([], Validators.required),
    code:new FormControl( 0, Validators.required),
    SubCategory:new FormControl([], Validators.required),
    contact_person: new FormControl("", Validators.required),
    dialcode: new FormControl('+91'),
    phone_number: new FormControl('', Validators.required),
    gst_number: new FormControl('', Validators.required),
    pan_number: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    payment_terms: new FormControl(''),
    terms_condition: new FormControl(''),

    address: new FormGroup({
      street_address: new FormControl(''),
      street_address2: new FormControl(''),
      state: new FormControl(''),
      city: new FormControl(''),
      zip_code: new FormControl(''),
      country: new FormControl(''),
    })
  });
  categoryList: any;
  constructor(
    private router: Router,
    private httpService: RequestService,
    private snack: SnackbarService,) {

    this.httpService.GET(CATEGORY_API, {}).subscribe(res => {
      this.categoryList = res.data;
      //console.log(this.categoryList)
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

    this.httpService.GET(VENDOR_API, {}).subscribe(res => {
      this.vendorLength = res.data.length+1;
      this.addForm.get('code').setValue(this.vendorLength);
      //console.log(this.categoryList)
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
    this.httpService.GET(SUB_CATEGORY_API, {}).subscribe(res => {
      this.AllSubCategoryList = res.data;
      //this.subCategoryList=this.AllSubCategoryList;
      //console.log(this.AllSubCategoryList)
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
  getSubCategory(){
    
    let selectedCategory=this.addForm.get("category").value;
    this.subCategoryList=[];
    for(let i=0;i<selectedCategory.length;i++)
    {
      //console.log(selectedCategory[i]);
      let filteredSubCategories = this.AllSubCategoryList.filter(obj => obj.category == selectedCategory[i]);
      this.subCategoryList.push(...filteredSubCategories);
    }
    //console.log(this.subCategoryList)
  }
  saveData() {
    if (this.addForm.valid) {
      this.httpService.POST(VENDOR_API, this.addForm.value).subscribe(res => {
        this.snack.notify(" Data has been saved sucessfully.", 1);
        this.router.navigate(['vendor']);
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
    this.router.navigate(['vendor']);
  }

  ngOnInit(): void {
  }

}