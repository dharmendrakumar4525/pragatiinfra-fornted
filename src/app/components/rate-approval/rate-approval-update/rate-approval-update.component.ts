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
  PURCHASE_ORDER_API,
  GET_BRAND_API,
} from '@env/api_path';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';

import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { isEmpty } from 'lodash';
import { VendorRateListingComponent } from '../vendor-rate-listing/vendor-rate-listing.component';
import { UsersService } from '@services/users.service';
import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-rate-approval-update',
  templateUrl: './rate-approval-update.component.html',
  styleUrls: ['./rate-approval-update.component.scss'],
})
export class RateApprovalUpdateComponent implements OnInit {
  viewPermission: any;
  editPermission: any;
  addPermission: any;
  deletePermission: any;
  permissions: any;
  vendorList: any[] = [];
  VendorItems: any[] = [];
  vendorItemsTables: any[] = [];
  vendorItemsForm: FormGroup;
  id: any;
  files: { [key: string]: any } = {};
  siteList: any;
  load = false;
  isSaved = true;
  items: FormArray;
  fetchedVendorList: any;
  VendorRate = new Map<string, any>();
  ItemwiseVendorRate = new Map<string, any>();
  compareBy: any = 'item';
  purchaseList: any;
  po_no: any;
  curr_site: any;

  /**
   * Defines the form structure for purchase request data.
   */
  purchaseRequestForm = new FormGroup({
    title: new FormControl({ value: '', disabled: true }, Validators.required),
    date: new FormControl({ value: '', disabled: true }, Validators.required),
    prType: new FormControl({ value: '', disabled: true }, Validators.required),
    files:new FormControl([]),
    expected_delivery_date: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
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
    remarks: new FormControl({ value: '', disabled: true }, []),
    items: this.formBuilder.array([]),
    _id: new FormControl(),
  });

  details: any = {};
  users: any = [];
  brandList: any;

  constructor(
    private router: Router,
    private httpService: RequestService,
    private snack: SnackbarService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private http: HttpClient,
    private auth: AuthService,
    private userService: UsersService
  ) {
    this.getList();
    this.getBrandList();
    this.getVendorList();
    this.userService.getUserss().subscribe((data) => {
      // Store the retrieved user data in the 'users' property
      this.users = data;
    });
  }

  getList() {
    const site = this.http.get<any>(`${environment.api_path}${GET_SITE_API}`);
    const purchase = this.http.get<any>(
      `${environment.api_path}${PURCHASE_ORDER_API}`
    );
    this.httpService.multipleRequests([site, purchase], {}).subscribe((res) => {
      if (res) {
        console.log(res[1].data);
        this.siteList = res[0].data;
        this.purchaseList = res[1].data;
      }
    });
  }

  patchData(data) {
    console.log('checking form', this.purchaseRequestForm);
    this.purchaseRequestForm.patchValue({
      title: data.title,
      date: data.date,
      prType:data.prType,
      expected_delivery_date: data.expected_delivery_date,
      rate_approval_number: data.rate_approval_number,
      handle_by: data.handle_by,
      site: data.site,
      local_purchase: data.local_purchase,
      remarks: data.remarks,
      files:data.files,
    });
    this.curr_site = data.site;
    this.files=data.files,
    this.vendorItemsTables = data.vendorRatesVendorWise;
    console.log('vendorItemsTable', this.vendorItemsTables);
    this.purchaseRequestForm.controls['remarks'].disable();
  }

  getVendorKeysArray(vendorObj: any): string[] {
    console.log(vendorObj);
    return Object.keys(vendorObj);
  }

  isLowestGrandTotal(vendorId: string): boolean {
    const vendorItemsTable = this.vendorItemsTables[0];

    // Ensure vendorItemsTable and totals exist
    if (!vendorItemsTable || !vendorItemsTable.totals) {
      console.error('Vendor items table or totals not found');
      return false;
    }

    const currentGrandTotal =
      vendorItemsTable.totals[vendorId]?.grandTotal || Infinity;

    // Extract grandTotal values from the totals object
    const totalsArray = Object.values(vendorItemsTable.totals);
    const grandTotalArray: number[] = totalsArray.map(
      (item: any) => item.grandTotal
    );

    // Check if the currentGrandTotal is the minimum in the array
    const isLowest = currentGrandTotal === Math.min(...grandTotalArray);
    return isLowest;
  }

  isPreferredGrandTotal(vendorId: string): boolean {
    const vendorItemsTable = this.vendorItemsTables[0];

    // Ensure vendorItemsTable and totals exist
    if (!vendorItemsTable || !vendorItemsTable.totals) {
      console.error('Vendor items table or totals not found');
      return false;
    }

    // Check if the preferred property is true for this vendorId
    return vendorItemsTable.totals[vendorId]?.preferred === true;
  }
  t;

  isSmallestAmount(itemId: string, vendorId: string): boolean {
    // Find the item that matches the provided itemId
    const item = this.vendorItemsTables[0].items.find(
      (item: any) => item.item_id === itemId
    );

    // If item is not found, return false
    if (!item) {
      console.error(`Item with ID ${itemId} not found`);
      return false;
    }

    // Get the vendors object for the specific item
    const vendors = item.vendors;

    // If the vendorId is not found in the vendors object, return false
    if (!vendors[vendorId]) {
      console.error(`Vendor with ID ${vendorId} not found in item ${itemId}`);
      return false;
    }

    // Get the amount of the vendorId we're checking
    const currentVendorAmount = parseFloat(vendors[vendorId].amount);

    // Extract all vendor amounts and compare
    const vendorAmounts = Object.values(vendors).map((vendor: any) =>
      parseFloat(vendor.amount)
    );

    // Return true if the current vendor's amount is the smallest in the list
    return currentVendorAmount === Math.min(...vendorAmounts);
  }

  // In your component
  getVendorKeys() {
    return Object.keys(this.vendorItemsTables[0].totals);
  }

  getSiteList() {
    this.httpService.GET(GET_SITE_API, {}).subscribe((res) => {
      this.siteList = res;
    });
  }

  getVendorList() {
    this.httpService.GET('/vendor', {}).subscribe((res) => {
      this.vendorList = res.data;
    });
  }

  getVendorNameByCode(vendorCode: string): string | undefined {
    console.log("checking vendor code",parseInt(vendorCode, 10));
    const vendor = this.vendorList.find(v => v.code.toString() === vendorCode);
    return vendor ? vendor.vendor_name : "Other"; // Return the vendor name or undefined if not found
  }

  getVendorIds(table: any): string[] {
    return Object.keys(table.totals);
  }

  findVendor(id: any) {
    return this.fetchedVendorList.find((obj) => obj._id == id);
  }

  vendorTotal(item: any) {
    console.log('check Item', item);
    let subTotal = 0;
    let total = 0;
    let freight = 0;
    let gstAmount = 0;
    let rate = 0;
    let qty = 0;
    item.forEach((obj) => {
      subTotal = obj.SubTotalAmount + subTotal;
      total = +obj.Total + +total;
      freight = +obj.Freight + +freight;
      gstAmount = total - subTotal;
      rate = obj.Rate;
      qty = obj.RequiredQuantity;
    });
    return {
      subTotal: subTotal,
      gstAmount: gstAmount,
      total: total,
      freight: freight,
      rate: rate,
      qty: qty,
    };
  }

  handleCheckboxChange(vendor_id, vendorItem, vendorTotal) {
    if (this.VendorRate.has(vendor_id))
      this.deleteVendor(vendor_id, vendorItem, vendorTotal);
    else this.addVendor(vendor_id, vendorItem, vendorTotal);
  }

  updateVendorTotals() {
    // Get all items from all vendor items tables
    const allItems = this.vendorItemsTables.flatMap((table) => table.items);

    // Update each vendor's total preferred status based on their preference in items
    Object.keys(this.vendorItemsTables[0].totals).forEach((vendorId) => {
      const vendorIsPreferredInAllItems = allItems.every(
        (itm) => itm.vendors[vendorId]?.preferred
      );
      this.vendorItemsTables[0].totals[vendorId].preferred =
        vendorIsPreferredInAllItems;
    });
  }

  togglePreferredVendor(item: any, selectedVendorId: string): void {
    // Find the vendor that was previously selected in this item
    const previouslyPreferredVendorId = Object.keys(item.vendors).find(
      (vendorId) => item.vendors[vendorId].preferred
    );

    // If there was a previously preferred vendor, unset its preference
    if (
      previouslyPreferredVendorId &&
      previouslyPreferredVendorId !== selectedVendorId
    ) {
      item.vendors[previouslyPreferredVendorId].preferred = false;
    }

    // Toggle the selected vendor's preferred status
    const selectedVendor = item.vendors[selectedVendorId];
    selectedVendor.preferred = !selectedVendor.preferred;

    // Update the totals
    this.updateVendorTotals();
  }

  toggleVendorPreferred(index: number, event: any) {
    const vendorKeys = Object.keys(this.vendorItemsTables[0].totals);
    const selectedVendorId = vendorKeys[index];
    const isChecked = event.target.checked;

    // Loop through all items to update the preference status
    this.vendorItemsTables.forEach((table) => {
      table.items.forEach((item) => {
        Object.keys(item.vendors).forEach((vendorId) => {
          if (vendorId !== selectedVendorId) {
            // Clear preference for vendors that are not selected
            item.vendors[vendorId].preferred = false;
          } else if (!isChecked) {
            // If the selected vendor is being unselected, just clear its preference
            item.vendors[vendorId].preferred = false;
          }
        });
      });
    });

    // Update the preferred status in totals
    vendorKeys.forEach((vendorId) => {
      this.vendorItemsTables[0].totals[vendorId].preferred =
        vendorId === selectedVendorId && isChecked;
    });

    // If the vendor is selected, set all items' vendor preferred to true for that vendor
    if (isChecked) {
      this.vendorItemsTables.forEach((table) => {
        table.items.forEach((item) => {
          item.vendors[selectedVendorId].preferred = true;
        });
      });
    }

    // Update totals based on item preferences
    this.updateVendorTotals();
  }

  filterData(data) {
    const { items, vendors, totals } = data;

    // Check if any vendor in totals is preferred
    const preferredVendorIds = Object.keys(totals).filter(
      (vendorId) => totals[vendorId].preferred
    );

    if (preferredVendorIds.length > 0) {
      // Case 1: If there are preferred vendors, remove other vendors from totals
      const preferredVendorId = preferredVendorIds[0];

      // Filter totals
      const filteredTotals = {};
      filteredTotals[preferredVendorId] = totals[preferredVendorId];

      // Filter items
      const filteredItems = items.map((item) => {
        const preferredVendorData = item.vendors[preferredVendorId];
        if (preferredVendorData) {
          return {
            ...item,
            vendors: {
              [preferredVendorId]: preferredVendorData,
            },
          };
        }
        return item;
      });

      return { items: filteredItems, vendors, totals: filteredTotals };
    } else {
      // Case 2: No preferred vendors, filter items based on preferred vendors
      const filteredItems = items.map((item) => {
        const preferredVendors = Object.keys(item.vendors).filter(
          (vendorId) => item.vendors[vendorId].preferred
        );
        if (preferredVendors.length > 0) {
          const filteredVendors = preferredVendors.reduce((acc, vendorId) => {
            acc[vendorId] = item.vendors[vendorId];
            return acc;
          }, {});

          return {
            ...item,
            vendors: filteredVendors,
          };
        }
        return {
          ...item,
          vendors: {},
        };
      });

      return { items: filteredItems, vendors, totals };
    }
  }

  getTotalAmount(items: any[]): number {
    console.log('here that is', items);
    return items.reduce((total, item) => {
      const taxAmount = item.Total - item.SubTotalAmount;
      return total + taxAmount;
    }, 0);
  }

  /**
   * Deletes a vendor from the VendorRate map.
   * @param vendor_id The ID of the vendor to delete.
   */
  deleteVendor(vendor_id, vendorItem, vendorTotal) {
    this.VendorRate.delete(vendor_id);
  }

  /**
   * Adds a vendor to the VendorRate map.
   * @param vendor_id The ID of the vendor.
   * @param vendorItem The vendor item data.
   * @param vendorTotal The total amount for the vendor.
   */
  addVendor(vendor_id, vendorItem, vendorTotal) {
    this.VendorRate.set(vendor_id, { ...vendorItem, ...vendorTotal });
  }

  /**
   * Retrieves the list of brands from the API.
   */
  getBrandList() {
    this.httpService.GET(GET_BRAND_API, {}).subscribe((res) => {
      this.brandList = res.data;
    });
  }

  calculateGrandTotal(vendorItem: any): number {
    const vendorTotal = this.vendorTotal(vendorItem.items);
    const gstTotal = this.getTotalAmount(vendorItem.items);
    return vendorTotal.subTotal + vendorTotal.freight + gstTotal;
  }

  getLowestGrandTotal(): number {
    return Math.min(
      ...this.details.vendorItems.map((vendorItem) =>
        this.calculateGrandTotal(vendorItem)
      )
    );
  }

  /**
   * Retrieves the name of the brand based on the provided brand ID.
   * @param brandId The ID of the brand.
   * @returns The name of the brand.
   */
  myBrandName(brandId: any) {
    let brand = this.brandList.filter((brand) => brand._id == brandId);
    return brand[0].brand_name;
  }

  /**
   * Updates the purchase request with the provided status.
   * @param status The status of the purchase request.
   */
  updateRequest(status: any) {
    if (status == 'revise') {
      this.details['status'] = status;
      this.details.stage = 'rate_comparitive';
    } else if (status == 'rejected') {
      this.details['status'] = status;
    } else {
      //generating po number
      const siteName = this.siteList.find((obj) => obj._id == this.curr_site);
      const dynamicDataFormatted = siteName.site_name.replace(/[ ,]/g, '_');
      const currentYear = new Date().getFullYear();
      const nextYear = currentYear + 1;
      const yearRange = `${String(currentYear).slice(-2)}-${String(
        nextYear
      ).slice(-2)}`;
      const searchTerm = `${dynamicDataFormatted}/`;

      const filteredList = this.purchaseList.filter((item) =>
        item.billing_address.company_name.includes(
          'Pragati Infra Solutions Pvt. Ltd.'
        )
      );

      const Pocount = filteredList.length + 1;

      this.po_no = Pocount;

      this.details['vendorRatesItemWise'] = this.updateVendorPreferredTotals(
        this.filterData(this.vendorItemsTables[0])
      );

      this.details['compareBy'] = this.compareBy;
      this.details['po_number'] = this.po_no;
      this.details['handle_by'] = this.permissions.user.name;
      this.details['Pocount'] = Pocount;
      this.details['files'] = this.files;
      if (this.details.status == 'revise') this.details['isRevised'] = true;
      this.details['status'] = 'approved';
    }
    if (!this.purchaseRequestForm.valid) {
      return;
    }

    console.log('details', this.details);
    

    console.log('');
    this.load = true;
    this.httpService.PUT(RATE_COMPARATIVE_API, this.details).subscribe(
      (res) => {
        this.snack.notify('Detail has been updated', 1);
        this.router.navigate(['/rate-approval']);
        this.load = false;
      },
      (err: any) => {
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
    );
  }

  updateVendorPreferredTotals(data) {
    const { items, totals } = data;

    // Initialize a map to store recalculated totals for each vendor
    const updatedTotals = {};

    // Iterate through each vendor in totals
    for (const vendorId in totals) {
      // Initialize subtotal and other values
      let subtotal = 0;
      let gstAmount = 0;
      let freight = totals[vendorId].freight || 0;
      let freightGst = totals[vendorId].freightGst || 0;
      let preferred = true;

      // Iterate through each item and check if this vendor is preferred
      items.forEach((item) => {
        const vendorData = item.vendors[vendorId];
        if (vendorData && vendorData.preferred) {
          // Add this item's amount to the subtotal
          subtotal += parseFloat(vendorData.amount);
          gstAmount += (parseFloat(vendorData.amount) * item.gst) / 100;
        } else {
          preferred = false;
        }
      });

      // Calculate grand total
      const grandTotal =
        subtotal + gstAmount + freight + freight * (freightGst / 100);

      // Update totals for this vendor
      updatedTotals[vendorId] = {
        ...totals[vendorId],
        totalAmount: subtotal,
        gstAmount: gstAmount,
        grandTotal: grandTotal,
        preferred: preferred,
      };
    }

    return {
      ...data,
      totals: updatedTotals,
    };
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
              resp.dashboard_permissions[0].ParentChildchecklist[21].childList[0].isSelected;
            this.addPermission =
              resp.dashboard_permissions[0].ParentChildchecklist[21].childList[1].isSelected;
            this.editPermission =
              resp.dashboard_permissions[0].ParentChildchecklist[21].childList[2].isSelected;
            this.deletePermission =
              resp.dashboard_permissions[0].ParentChildchecklist[21].childList[3].isSelected;
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
                  console.log('checking the API', this.details);
                  this.patchData(res.data.details);
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
