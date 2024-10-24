import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CATEGORY_API, VENDOR_API,SUB_CATEGORY_API } from '@env/api_path';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import { isEmpty } from 'lodash';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-edit-data',
  templateUrl: './edit-data.component.html',
  styleUrls: ['./edit-data.component.scss']
})
export class EditDataComponent implements OnInit {

  AllSubCategoryList:any=[];
  subCategoryList:any=[];
  vendorType : any=[
    "Fabricator", "Manufacturer", "Trader", "contractor"
  ];
  scope:any=[
    "Local(lv)",
    "National(nv)",
    "Global (gv)"
  ];

  dataReadySubject = new BehaviorSubject<boolean>(false);
  editForm = new FormGroup({
    vendor_name: new FormControl("", Validators.required),
    category: new FormControl([], Validators.required),
    SubCategory:new FormControl([], Validators.required),
    contact_person: new FormControl("", Validators.required),
    dialcode: new FormControl('+91'),
    phone_number: new FormControl('', Validators.required),
    gst_number: new FormControl(''),
    pan_number: new FormControl('', Validators.required),
    MSME_number:new FormControl(''),
    scope:new FormControl('', Validators.required),
    vendor_type:new FormControl('', Validators.required),
    email: new FormControl(''),
    payment_terms: new FormControl(''),
    terms_condition: new FormControl(''),

    address: new FormGroup({
      street_address: new FormControl(''),
      street_address2: new FormControl(''),
      state: new FormControl(''),
      city: new FormControl(''),
      zip_code: new FormControl(''),
      country: new FormControl(''),
    }),
    _id: new FormControl()
  });
  categoryList: any;
  constructor(
    private router: Router,
    private httpService: RequestService,
    private snack: SnackbarService,
    private route: ActivatedRoute) {
    this.httpService.GET(CATEGORY_API, {}).subscribe(res => {
      this.categoryList = res.data;
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
      this.dataReadySubject.next(true);
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

    this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(params['id']);
      if (params['id']) {
        this.httpService.GET(`${VENDOR_API}/detail`, { _id: params['id'] }).subscribe((res: any) => {
          console.log(res);
          if (res) {
            this.patchValue(res.data[0]);
          }
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
        this.list();
      }
    });

  }
  getSubCategory(){
    
    let selectedCategory=this.editForm.get("category").value;
    this.subCategoryList=[];
    for(let i=0;i<selectedCategory.length;i++)
    {
      //console.log(selectedCategory[i]);
      let filteredSubCategories = this.AllSubCategoryList.filter(obj => obj.category == selectedCategory[i]);
      this.subCategoryList.push(...filteredSubCategories);
    }
    //console.log(this.subCategoryList)
  }

  patchValue(data: any) {
    console.log(data,"jjhdfhd")
    
    this.editForm.patchValue({
      vendor_name: data.vendor_name,
      category: data.category,
      SubCategory:data.SubCategory,
      contact_person: data.contact_person,
      dialcode: data.dialcode,
      gst_number: data.gst_number,
      phone_number: data.phone_number,
      pan_number: data.pan_number,
      MSME_number:data.MSME_number,
       scope:data.scope,
          vendor_type:data.vendor_type,
      email: data.email,
      payment_terms: data.payment_terms,
      terms_condition: data.terms_condition,
       address: {
        street_address: data.address.street_address,
        street_address2: data.address.street_address2,
        state: data.address.state,
         city: data.address.city,
         zip_code: data.address.zip_code,
       country: data.address.country,
       },
      _id: data._id

    })
    this.dataReadySubject.subscribe((dataReady) => {
      if(dataReady){
          this.getSubCategory()
      }
    })
    
  }

  saveData() {
    if (this.editForm.valid) {
      console.log("checking payload", this.editForm.value);
      this.httpService.PUT(VENDOR_API, this.editForm.value).subscribe(res => {
        this.snack.notify(" data has been saved sucessfully.", 1);
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
      this.editForm.markAllAsTouched();
    }


  }

  list() {
    this.router.navigate(['vendor']);
  }

  ngOnInit(): void {
  }
}