import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import {
  RATE_COMPARATIVE_DETAIL_API,
  GET_SITE_API,
  ITEM_API,
  UOM_API,
  RATE_COMPARATIVE_API,
  GET_BRAND_API,
} from '@env/api_path';
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
  styleUrls: ['./rate-comparative-update.component.scss'],
})
export class RateComparativeUpdateComponent implements OnInit {
  id: any;
  siteList: any;
  load = false;
  items: FormArray;
  flag: boolean = false;
  finalVendorArray: any[] = [];
  VendorItems: any[] = [];
  isButtonDisabled: boolean = true;
  isSelectDisabled: boolean = false;
  permissions: any;
  ItemwiseVendorRate = new Map<string, any>();
  viewPermission: any;
  editPermission: any;
  addPermission: any;
  // deletePermission: any;

  /**
   * Represents the rate comparative form, including form controls for various fields.
   * @returns void
   */
  rateComparativeForm = new FormGroup({
    title: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    expected_delivery_date: new FormControl('', Validators.required),
    handle_by: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    rate_approval_number: new FormControl(''),
    site: new FormControl({ value: '', disabled: true }, Validators.required),
    local_purchase: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    remarks: new FormControl('', []),
    _id: new FormControl(),
  });

  details: any = {};
  vendorsList: Array<any> = [];
  vendorAssociatedData: Array<any> = [];
  users: any;
  filteredItems: Array<any> = [];
  brandList: any;

  constructor(
    private router: Router,
    private httpService: RequestService,
    private snack: SnackbarService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private http: HttpClient,
    private userService: UsersService
  ) {
    // Call the method to fetch the brand list
    this.getBrandList();

    // Call the method to fetch the list of rate comparatives
    this.getList();

    // Subscribe to the getUserss method of the userService to fetch user data
    this.userService.getUserss().subscribe((data) => {
      // Assign the fetched user data to the users property
      this.users = data;
    });
  }

  vendorForm = this.formBuilder.group({
    vendor: this.formBuilder.array([]),
  });

  /**
   * Opens a dialog popup for rate comparative vendors with the provided data.
   * @param dataObj The data object related to the item.
   * @param vendors The vendors related to the item.
   * @returns void
   */
  ItemData(dataObj: any, vendors: any) {
    let index = this.finalVendorArray.findIndex(
      (item) => item[1] == dataObj[1]
    );
    // Open a dialog popup for rate comparative vendors
    const dialogPopup = this.dialog.open(RateComparativeVendorsComponent, {
      data: {
        dataObj: dataObj[0],
        vendorsList: this.vendorsList,
        items: this.details?.items,
        vendors: vendors,
        filledData: this.VendorItems[index],
        brandList: this.brandList,
      },
    });

    // Subscribe to the dialog popup's afterClosed event
    dialogPopup.afterClosed().subscribe((result: any) => {
      if (result && result['option'] === 1) {
        this.VendorItems[index] = result;
        this.ItemwiseVendorRate.set(dataObj[0], result.data.status);
      } else {
        this.ItemwiseVendorRate.delete(dataObj[0]);
      }
    });
  }

  /**
   * Fetches the list of sites from the API.
   * @returns void
   */
  getList() {
    const site = this.http.get<any>(`${environment.api_path}${GET_SITE_API}`);
    this.httpService.multipleRequests([site], {}).subscribe((res) => {
      if (res) {
        // Assign the retrieved site list to the siteList property
        this.siteList = res[0].data;
      }
    });
  }

  /**
   * Patches the provided data into the rate comparative form.
   * @param data The data to be patched into the form.
   * @returns void
   */
  patchData(data) {
    let loginUser = JSON.parse(localStorage.getItem('loginData'));
    this.rateComparativeForm.patchValue({
      title: data.title,
      date: data.date,
      expected_delivery_date: data.expected_delivery_date,
      rate_approval_number: data.rate_approval_number,
      handle_by: loginUser.user._id,
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
    });
  }

  addItems(item: any): void {
    // this.items = this.rateComparativeForm.get('items') as FormArray;
    // if (item) {
    //   this.items.push(this.createItem(item));
    // }
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
      });
    }
  }

  getSiteList() {
    this.httpService.GET(GET_SITE_API, {}).subscribe((res) => {
      this.siteList = res;
    });
  }

  // rejectRequest(){
  //   this.details['status']="rejected"
  //   this.load = true;
  //   this.httpService.PUT(RATE_COMPARATIVE_API, this.details).subscribe(res => {
  //     this.snack.notify("Detail has been updated", 1);
  //     this.router.navigate(['/rate-comparative'])
  //     this.load = false;
  //   }, (err: any) => {
  //     this.load = false;
  //     if (err.errors && !isEmpty(err.errors)) {
  //       let errMessage = '<ul>';
  //       for (let e in err.errors) {
  //         let objData = err.errors[e];
  //         errMessage += `<li>${objData[0]}</li>`;
  //       }
  //       errMessage += '</ul>';
  //       this.snack.notifyHtml(errMessage, 2);
  //     } else {
  //       this.snack.notify(err.message, 2);
  //     }
  //   })
  // }
  updateRequest() {
    if (this.VendorItems.some((item) => item === '')) {
      this.snack.notify('Some items rates are pending', 2);
      return;
    }
    if (!this.rateComparativeForm.valid) {
      return;
    }
    let loginUser = JSON.parse(localStorage.getItem('loginData'));
    let requestedData = this.rateComparativeForm.value;

    requestedData['_id'] = this.details._id;
    requestedData['items'] = this.details.items;
    requestedData['stage'] = 'rate_approval';
    requestedData['handle_by'] = loginUser.user._id;
    for (let i = 0; i < this.VendorItems.length; i++)
      this.VendorItems[i] = this.VendorItems[i].data.value;

    requestedData['vendorItems'] = this.VendorItems;
    this.load = true;


    console.log("there", requestedData )

    this.httpService.PUT(RATE_COMPARATIVE_API, requestedData).subscribe({
      next: (res) => {
        this.snack.notify('Detail has been updated', 1);
        this.router.navigate(['/rate-comparative']);
        this.load = false;
      },
      error: (err: any) => {
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
      },
    });
  }

  /**
   * Determines the list of vendors based on the category and subcategory of the items.
   * @param items The items for which vendors are to be filtered.
   * @returns An array of vendors that match the category and subcategory of the items.
   */
  isVendorSelected(items: any): any[] {
    let tempVendorList = this.vendorsList.filter(
      (vendor) =>
        vendor.category.includes(items.categoryDetail._id)
    );

    return tempVendorList;
  }

  /**
   * Getter method to access the vendor array from the vendor form.
   * @returns The vendor array FormArray.
   */
  get vendorArray(): FormArray {
    return this.vendorForm.get('vendor') as FormArray;
  }

  /**
   * Handles changes in vendor selection.
   * Resets the flag and enables the button.
   * @returns void
   */
  handleVendorChange() {
    this.flag = false;
    this.isButtonDisabled = false;
  }

  /**
   * Retrieves the list of brands from the API.
   * Logs the retrieved brand list.
   * @returns void
   */
  getBrandList() {
    this.httpService.GET(GET_BRAND_API, {}).subscribe((res) => {
      this.brandList = res.data;
    });
  }

  /**
   * Saves the vendor form data.
   * Sets flag to true and disables the button.
   * Clears the finalVendorArray and VendorItems arrays.
   * Iterates through the vendor array controls, pushes selected vendors into finalVendorArray, and initializes VendorItems array.
   * @returns void
   */
  save() {
    let vendorIndex: number = 0;
    this.flag = true;
    this.isButtonDisabled = true;
    this.isSelectDisabled = true;
    //making array empty
    this.finalVendorArray.length = 0;
    this.VendorItems.length = 0;
    for (let vendors of this.vendorArray.controls) {
      for (let vendor of vendors.get('selectedVendors').value) {
        this.finalVendorArray.push([vendor, vendorIndex]);
        this.VendorItems.push('');
        vendorIndex++;
        console.log(vendorIndex, 'I');
      }
    }
    let len = 0;
    for (let i = 0; i < this.vendorForm.get('vendor').value.length; i++) {
      let tex = this.vendorForm.get('vendor').value[i]['selectedVendors'];
      for (let j = 0; j < tex.length; j++) {
        let add = tex[j];
        tex[j] = [add, len];
        len++;
      }
    }
  }

  /**
   * Retrieves details of a vendor based on the vendor ID.
   * @param vendor The ID of the vendor.
   * @returns The name of the vendor.
   */
  detailsOfVendor(vendor: any) {
    let tempvendor = this.vendorsList.find((obj) => obj._id == vendor[0]);
    return tempvendor.vendor_name;
  }

  ngOnInit(): void {
    // Retrieve user permissions from local storage and parse them as JSON
    this.permissions = JSON.parse(localStorage.getItem('loginData'));

    // Extract specific permissions related to ParentChildchecklist from the parsed data
    const rolePermission = this.permissions.user.role;
    const GET_ROLE_API_PERMISSION = `/roles/role/${rolePermission}`;
    this.httpService.GET(GET_ROLE_API_PERMISSION, {}).subscribe({
      next: (resp: any) => {
        this.viewPermission =
          resp.dashboard_permissions[0].ParentChildchecklist[20].childList[0].isSelected;
        this.addPermission =
          resp.dashboard_permissions[0].ParentChildchecklist[20].childList[1].isSelected;
        this.editPermission =
          resp.dashboard_permissions[0].ParentChildchecklist[20].childList[2].isSelected;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.httpService
          .GET(`${RATE_COMPARATIVE_DETAIL_API}`, { _id: params['id'] })
          .subscribe({
            next: (res) => {
              this.details = res.data.details;

              this.vendorsList = res.data.vendorsList;

              this.vendorsList.map((o: any) => {
                this.vendorAssociatedData[o._id] = o;
                return o;
              });
              let temparr = [];
              this.filteredItems = this.details?.items.filter((item) => {
                let s =
                  item.categoryDetail._id + '$' + item.subCategoryDetail._id;
                if (!temparr.includes(s)) {
                  temparr.push(s);
                  return true; // Include the item when it's not in temparr
                }
                return false; // Exclude the item when it's already in temparr
              });

              //Initialize selectedVendors FormArray with empty form groups for each item
              this.filteredItems.forEach((items) => {
                let tempselectedVendors = this.formBuilder.group({
                  Item_category: items.categoryDetail,
                  Item_subCategory: items.subCategoryDetail,
                  selectedVendors: new FormControl([]),
                });
                (this.vendorForm.get('vendor') as FormArray).push(
                  tempselectedVendors
                );
              });
              // console.log(this.vendorForm.get('vendor')as FormArray)
              this.patchData(res.data.details);
            },
            error: (error) => {
              // this.router.navigate(['/procurement/prlist'])
            },
          });
      }
    });
  }
}
