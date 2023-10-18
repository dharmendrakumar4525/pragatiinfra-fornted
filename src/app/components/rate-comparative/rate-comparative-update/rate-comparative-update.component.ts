import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { RATE_COMPARATIVE_DETAIL_API, GET_SITE_API, ITEM_API, UOM_API, RATE_COMPARATIVE_API } from '@env/api_path';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';

import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { RateComparativeVendorsComponent } from '../rate-comparative-vendors/rate-comparative-vendors.component';
import { isEmpty } from 'lodash';
import { UsersService } from '@services/users.service';

@Component({
  selector: 'app-rate-comparative-update',
  templateUrl: './rate-comparative-update.component.html',
  styleUrls: ['./rate-comparative-update.component.scss']
})
export class RateComparativeUpdateComponent implements OnInit {



  id: any;
  siteList: any;
  load = false;
  items: FormArray;
  rateComparativeForm = new FormGroup({
    title: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    expected_delivery_date: new FormControl('', Validators.required),
    handle_by: new FormControl('', Validators.required),
    rate_approval_number: new FormControl(''),
    site: new FormControl('', Validators.required),
    local_purchase: new FormControl('', Validators.required),
    remarks: new FormControl('', []),
    items: this.formBuilder.array([]),
    _id: new FormControl()
  });

  details: any = {};
  vendorsList: Array<any> = [];
  vendorAssociatedData: Array<any> = [];
  users: any;

  constructor(
    private router: Router,
    private httpService: RequestService,
    private snack: SnackbarService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private http: HttpClient,
    private userService: UsersService,
  ) {
    this.getList();
    this.userService.getUserss().subscribe(data => {
      this.users = data
      console.log("this.users", this.users);
      //console.log(this.tasksData)
    })

  }


  vendorData(dataObj: any) {

    const dialogPopup = this.dialog.open(RateComparativeVendorsComponent, {
      data: {
        dataObj: dataObj,
        vendorsList: this.vendorsList
      }
    });
    dialogPopup.afterClosed().subscribe((result: any) => {
      if (result && result['option'] === 1) {

        let vendorTotalData: Array<any> = [];

        this.details.items = this.details.items.map((o: any) => {
          if (o._id == dataObj._id) {
            o.vendors = result.data.itemVendors;
          }
          return o;
        });

      }
    });
  }



  getList() {

    const site = this.http.get<any>(`${environment.api_path}${GET_SITE_API}`);
    this.httpService.multipleRequests([site], {}).subscribe(res => {
      if (res) {
        this.siteList = res[0].data;
      }
    })
  }

  patchData(data) {
    this.rateComparativeForm.patchValue({
      title: data.title,
      date: data.date,
      expected_delivery_date: data.expected_delivery_date,
      rate_approval_number: data.rate_approval_number,
      handle_by: data.handle_by,
      site: data.site,
      local_purchase: data.local_purchase,
    });

    // this.rateComparativeForm.controls['remarks'].disable();
  }


  createItemArrayForm() {
    return new FormGroup({
      item_id: new FormControl('', Validators.required),
      qty: new FormControl('', Validators.required),
      category: new FormControl(''),
      subCategory: new FormControl(''),
      attachment: new FormControl(''),
      remark: new FormControl('', Validators.required),
      uom: new FormControl('', Validators.required),

    })

  }


  addItems(item: any): void {

    this.items = this.rateComparativeForm.get('items') as FormArray;
    if (item) {
      this.items.push(this.createItem(item));
    }
  }

  createItem(item?: any): any {
    if (item) {
      return new FormGroup({
        item_id: new FormControl(item.item_id, Validators.required),
        qty: new FormControl(item.qty, Validators.required),
        category: new FormControl(item.categoryDetail.name),
        subCategory: new FormControl(item.subCategoryDetail.subcategory_name),
        attachment: new FormControl(item.attachment),
        remark: new FormControl(item.remark, Validators.required),
        uom: new FormControl(item.uomDetail._id, Validators.required),

      })
    }
  }


  getSiteList() {
    this.httpService.GET(GET_SITE_API, {}).subscribe(res => {
      this.siteList = res;
    })
  }



  updateRequest() {
    if (!this.rateComparativeForm.valid) {
      return;
    }

    let requestedData: any = this.rateComparativeForm.value;
    requestedData['_id'] = this.details._id;
    requestedData['items'] = this.details.items;
    requestedData['stage'] = 'rate_approval';
    this.load = true;
    this.httpService.PUT(RATE_COMPARATIVE_API, requestedData).subscribe({
      next: res => {
        this.snack.notify("Detail has been updated", 1);
        this.router.navigate(['/rate-comparative'])
        this.load = false;
      }, error: (err: any) => {
        this.load = false;
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
      }
    })
  }

  onChangeFreightCharges(event: any, item: any) {
    let value = (event.target.value && event.target.value >= 0) ? Number(event.target.value) : 0;

    this.details.vendors_total = this.details.vendors_total.map((o: any) => {

      if (o.vendor_id == item.vendor_id) {
        o.freight_charges = value;
        let total = o.subtotal + o.total_tax;

        if (o.freight_charges) {
          total += Number(o.freight_charges);
        }
        if (o.freight_tax) {
          total += (Number(o.freight_charges) * Number(o.freight_tax)) / 100;
        }
        o.total_amount = total;
      }

      return o;
    })

  }


  onChangeFreightTaxPercent(event: any, item: any) {
    let value = (event.target.value && event.target.value >= 0) ? Number(event.target.value) : 0;

    this.details.vendors_total = this.details.vendors_total.map((o: any) => {

      if (o.vendor_id == item.vendor_id) {
        o.freight_tax = value;
        let total = o.subtotal + o.total_tax;

        if (o.freight_charges) {
          total += Number(o.freight_charges);
        }
        if (o.freight_tax) {
          total += (Number(o.freight_charges) * Number(o.freight_tax)) / 100;
        }
        o.total_amount = total;
      }
      return o;
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.httpService.GET(`${RATE_COMPARATIVE_DETAIL_API}`, { _id: params['id'] }).subscribe({
          next: res => {
            this.details = res.data.details;
            this.vendorsList = res.data.vendorsList;
            this.vendorsList.map((o: any) => {
              this.vendorAssociatedData[o._id] = o;
              return o;
            });

            this.patchData(res.data.details);
          }, error: (error) => {
            // this.router.navigate(['/procurement/prlist'])
          }
        })
      }
    });
  }

}
