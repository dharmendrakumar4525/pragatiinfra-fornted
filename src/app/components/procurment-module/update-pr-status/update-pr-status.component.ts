import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import {
  PURCHASE_REQUEST_API,
  GET_SITE_API,
  ITEM_API,
  UOM_API,
  GET_VENDOR_API,
  VENDOR_DETAIL_API,
  GET_BRAND_API,
} from '@env/api_path';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { AuthService } from '@services/auth/auth.service';
import { UsersService } from '@services/users.service';
import { saveAs } from 'file-saver';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-update-pr-status',
  templateUrl: './update-pr-status.component.html',
  styleUrls: ['./update-pr-status.component.scss'],
})
export class UpdatePrStatusComponent implements OnInit {
  viewPermission: any;
  editPermission: any;
  addPermission: any;
  deletePermission: any;
  downloadLoading = false;
  id: any;
  siteList: any;
  load = false;
  items: FormArray;
  pageId: any;

  /**
   * Represents the purchase request form, including form controls for various fields.
   * @returns void
   */
  purchaseRequestForm = new FormGroup({
    title: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    expected_delivery_date: new FormControl('', Validators.required),
    purchase_request_number: new FormControl(''),
    site: new FormControl({ value: '', disabled: true }, Validators.required),
    local_purchase: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    remarks: new FormControl(''),
    items: this.formBuilder.array([]),
    _id: new FormControl(),
  });

  uomList: any;
  itemList: any;
  details: any = {};
  selectedVendor: any;
  brandList: any;
  permissions: any;

  constructor(
    private router: Router,
    private httpService: RequestService,
    private snack: SnackbarService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private auth: AuthService,
    private userService: UsersService
  ) {
    this.getList();
    this.route.params.subscribe((params) => {
      this.pageId = params['id'];
    });
  }

  /**
   * Fetches lists of UOM, items, sites, and brands from the API and assigns them to corresponding class properties.
   * Uses HTTP requests to retrieve data asynchronously.
   * @returns void
   */
  getList() {
    const UOM = this.http.get<any>(`${environment.api_path}${UOM_API}`);
    const item = this.http.get<any>(`${environment.api_path}${ITEM_API}`);
    const site = this.http.get<any>(`${environment.api_path}${GET_SITE_API}`);
    const brand = this.http.get<any>(`${environment.api_path}${GET_BRAND_API}`);
    this.httpService
      .multipleRequests([UOM, item, site, brand], {})
      .subscribe((res) => {
        if (res) {
          this.uomList = res[0].data;
          this.itemList = res[1].data;
          this.siteList = res[2].data;
          this.brandList = res[3].data;
        }
      });
  }

  /**
   * Patches data received from an external source into the purchase request form.
   * @param data The data object containing values to be patched into the form.
   * @returns void
   */
  patchData(data) {
    this.purchaseRequestForm.patchValue({
      title: data.title,
      date: data.date,
      expected_delivery_date: data.expected_delivery_date,
      purchase_request_number: data.purchase_request_number,

      site: data.site,
      local_purchase: data.local_purchase,
      remarks: data.remarks,
    });
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
      brandName: new FormControl('', Validators.required),
    });
  }

  addItems(item: any): void {
    this.items = this.purchaseRequestForm.get('items') as FormArray;
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
        brandName: new FormControl(item.brandName, Validators.required),
      });
    }
  }

  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  getFormattedBrandNames(brandName): string {
    console.log("see BrandName", brandName);
    if (this.isArray(brandName)) {
        return (brandName as string[]).map(brand => {
            return brand.trim() === '' ? 'others' : this.myBrandName(brand);
        }).join(' / ');
    } else {
        return brandName.trim() === '' ? 'others' : this.myBrandName(brandName as string);
    }
}


  /**
   * Retrieves the brand name corresponding to the provided brand ID from the brand list.
   * @param brandId The ID of the brand for which the name is to be retrieved.
   * @returns The brand name corresponding to the provided brand ID, if found; otherwise, undefined.
   */
  myBrandName(brandId: any) {
    // console.log(brandId)
    if (this.brandList == null) return;
    let brand = this.brandList.filter((brand) => brand._id == brandId);
    // console.log(brand)
    return brand[0].brand_name;
  }

  /**
   * Fetches the list of sites from the API and assigns it to the siteList property.
   * @returns void
   */
  getSiteList() {
    this.httpService.GET(GET_SITE_API, {}).subscribe((res) => {
      this.siteList = res;
    });
  }

  /**
   * Retrieves the item name corresponding to the provided item ID from the itemList.
   * @param id The ID of the item for which the name is to be retrieved.
   * @returns The item name corresponding to the provided item ID, if found; otherwise, undefined.
   */
  getItemName(id: any) {
    if (this.itemList && id)
      return this.itemList.filter((obj) => obj._id == id)[0].item_name;
  }

  /**
   * Updates the status and remarks of a purchase request using a PUT request to the API.
   * Navigates to the purchase request list page upon successful update.
   * @param status The new status to be assigned to the purchase request.
   * @returns void
   */
  updateRequest(status: any) {
    console.log(
      'meaafsdfs',
      this.details._id,
      this.purchaseRequestForm.value.remarks,
      status
    );
    this.httpService
      .PUT(PURCHASE_REQUEST_API, {
        _id: this.details._id,
        status: status,
        remarks: this.purchaseRequestForm.value.remarks,
      })
      .subscribe((res) => {
        this.router.navigate(['/procurement/prlist']);
      });
  }

  /**
   * Retrieves the vendor details based on the vendor ID from the API.
   * Updates the selectedVendor property with the retrieved vendor name.
   * @returns void
   */
  getVendorList() {
    if (this.details.vendor != null) {
      const vendor = this.http.get<any>(
        `${environment.api_path}${VENDOR_DETAIL_API}?_id=${this.details.vendor}`
      );
      console.log('this is res : ');
      this.httpService.multipleRequests(vendor, {}).subscribe((res) => {
        if (res) {
          this.selectedVendor = res[0].data[0].vendor_name;
        }
      });
    }
  }

  downloadPRPDF() {
    this.downloadLoading = true;
    this.httpService
      .GETPDF('generate/prpdf', {
        template: 'pr',
        id: this.pageId,
      })
      .subscribe((res: any) => {
        this.downloadLoading = false;
        var blob = new Blob([res], { type: 'application/pdf' });
        let id = new Date().getTime();
        saveAs(blob, `pr-${id}.pdf`);
      });
  }

  ngOnInit(): void {
    this.permissions = JSON.parse(localStorage.getItem('loginData'));

    // Extract specific permissions related to ParentChildchecklist from the parsed data
    this.userService.getUserss().subscribe((users) => {
      const currentUser = users.find(
        (user) => user._id === this.permissions.user._id
      );

      if (currentUser) {
    const rolePermission = this.permissions.user.role;
    const GET_ROLE_API_PERMISSION = `/roles/role/${rolePermission}`;
    this.httpService.GET(GET_ROLE_API_PERMISSION, {}).subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.viewPermission =
          resp.dashboard_permissions[0].ParentChildchecklist[19].childList[0].isSelected;
        this.addPermission =
          resp.dashboard_permissions[0].ParentChildchecklist[19].childList[1].isSelected;
        this.editPermission =
          resp.dashboard_permissions[0].ParentChildchecklist[19].childList[2].isSelected;
        this.deletePermission =
          resp.dashboard_permissions[0].ParentChildchecklist[19].childList[3].isSelected;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.httpService
          .GET(`${PURCHASE_REQUEST_API}/detail`, { _id: params['id'] })
          .subscribe({
            next: (res) => {
              this.details = res.data[0];
              this.getVendorList();
              this.patchData(res.data[0]);
            },
            error: (error) => {
              this.router.navigate(['/procurement/prlist']);
            },
          });
      }
    });
  } else {
    this.snack.notify('Invalid Credentials - User Details not Valid', 1);
    this.auth.removeUser();
    this.userService.updateLogin('logout');
    this.router.navigate(['/login']);
  }
});
  }
}
