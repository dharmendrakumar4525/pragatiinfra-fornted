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
  ESIGN_UPLOAD_API,
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@services/auth/auth.service';

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
  vendorItemsTables: any[] = [];
  vendorItemsForm: FormGroup;
  isButtonDisabled: boolean = true;
  isSelectDisabled: boolean = false;
  permissions: any;
  files: any[] = [];
  isSaved: boolean = false;
  ItemwiseVendorRate = new Map<string, any>();
  viewPermission: any;
  editPermission: any;
  addPermission: any;
selectedVendorList:any[] = [];
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
  // New form for vendor selection
  RevisedVendorList: any[] = [];
  filteredVendorList: any[] = []; // Array to hold filtered vendors
  

  constructor(
    private router: Router,
    private httpService: RequestService,
    private snack: SnackbarService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private http: HttpClient,
    private userService: UsersService,
    private auth: AuthService,
    
  ) {
    // Call the method to fetch the brand list
    this.getBrandList();
    this.vendorItemsForm = this.formBuilder.group({});
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

  vendorSelectionForm = this.formBuilder.group({
    NewSelectionVendors: this.formBuilder.array([]) // Use FormArray for selected vendors
  });




  

  getList() {
    const site = this.http.get<any>(`${environment.api_path}${GET_SITE_API}`);
    this.httpService.multipleRequests([site], {}).subscribe((res) => {
      if (res) {
        // Assign the retrieved site list to the siteList property
        this.siteList = res[0].data;
      }
    });
  }

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
      specification: new FormControl('', Validators.required),
      hsnCode: new FormControl('', Validators.required),
      category: new FormControl(''),
      subCategory: new FormControl(''),
      attachment: new FormControl(''),
      remark: new FormControl('', Validators.required),
      uom: new FormControl('', Validators.required),
    });
  }

  createItem(item?: any): any {
    if (item) {
      return new FormGroup({
        item_id: new FormControl(item.item_id, Validators.required),
        specification: new FormControl(item.specification, Validators.required),
        hsnCode: new FormControl(item.hsnCode, Validators.required),
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

  convertTotalsToVendorsTotal() {
    const vendors_total = Object.keys(this.vendorItemsTables[0].totals).map(
      (vendorId) => {
        const totalData = this.vendorItemsTables[0].totals[vendorId];

        return {
          vendor_id: vendorId,
          subtotal: totalData.totalAmount,
          total_tax: totalData.gstAmount,
          freight_charges: totalData.freight,
          freight_tax: totalData.freightGst,
          total_amount: totalData.grandTotal,
          preferred: totalData.preferred,
          vendorRemark: totalData.vendorRemark,
          paymentTerms:totalData.paymentTerms,
        };
      }
    );

    return vendors_total;
  }
  updateRequest() {
    // Check form validity first
    if (!this.rateComparativeForm.valid) {
      return;
    }
  
    // Check for empty vendor items
    if (this.VendorItems.some((item) => item === '')) {
      this.snack.notify('Some items rates are pending', 2);
      return;
    }
  
    // Get the login user from local storage
    let loginUser = JSON.parse(localStorage.getItem('loginData'))?.user;
    if (!loginUser) {
      this.snack.notify('User not logged in', 2);
      return;
    }
  
    // Prepare the requested data
    let requestedData = this.rateComparativeForm.value;
    requestedData['_id'] = this.details._id;
    requestedData['purchase_request_number']=this.details.purchase_request_number;
    requestedData['items'] = this.details.items;
    requestedData['stage'] = 'rate_approval';
    requestedData['handle_by'] = loginUser._id;
    requestedData['vendorItems'] = this.vendorItemsTables[0].items;
    requestedData['vendorRatesVendorWise'] = this.vendorItemsTables;
    requestedData['vendors_total'] = this.convertTotalsToVendorsTotal();
    requestedData['files']={};
  
    console.log("there, checking payload", requestedData);
  
    // Convert files to FormData format

    if(this.files.length>0)
    {
      const formData = this.convertToFormData(this.files);
  
      // Set loading state to true before making the requests
      this.load = true;
    
      // First API call to upload files
      this.httpService.POST(ESIGN_UPLOAD_API, formData).subscribe({
        next: (res) => {
          console.log("check response", res);
          requestedData['files'] = res.data.filenames;
          console.log("check Payload here", requestedData);
    
          // Second API call to update the rate comparative data
          this.httpService.PUT(RATE_COMPARATIVE_API, requestedData).subscribe({
            next: (res) => {
              this.snack.notify('Detail has been updated', 1);
              this.router.navigate(['/rate-comparative']);
              this.load = false;
            },
            error: (err) => {
              this.handleError(err);
            }
          });
        },
        error: (err: any) => {
          this.load = false; // Stop loading on error
          this.handleError(err);
        },
      });
    }

    else
    {

      
      this.httpService.PUT(RATE_COMPARATIVE_API, requestedData).subscribe({
        next: (res) => {
          this.snack.notify('Detail has been updated', 1);
          this.router.navigate(['/rate-comparative']);
          this.load = false;
        },
        error: (err) => {
          this.handleError(err);
        }
      });
    }
    
  }
  
  // Method to handle error formatting
  private handleError(err: any) {
    let errMessage = '<ul>';
    if (err.errors && !isEmpty(err.errors)) {
      for (let e in err.errors) {
        let objData = err.errors[e];
        errMessage += `<li>${objData[0]}</li>`;
      }
    } else {
      errMessage += `<li>${err.message}</li>`;
    }
    errMessage += '</ul>';
    this.snack.notifyHtml(errMessage, 2);
  }
  

  /**
   * Determines the list of vendors based on the category and subcategory of the items.
   * @param items The items for which vendors are to be filtered.
   * @returns An array of vendors that match the category and subcategory of the items.
   */
 
  isVendorSelected(items: any): any[] {
    // Filter vendors based on the category and subcategory
    let tempVendorList = this.vendorsList.filter(
      (vendor) =>
        vendor.category.includes(items.categoryDetail._id) &&
        vendor.SubCategory.includes(items.subCategoryDetail._id)
    );

    // Add the filtered vendors to selectedVendorList
    this.selectedVendorList = [...this.selectedVendorList, ...tempVendorList];

    // Remove the selected vendors from the vendorsList
    this.RevisedVendorList = this.vendorsList.filter(
      (vendor) => !tempVendorList.some(tempVendor => tempVendor._id === vendor._id)
    );

    this.filteredVendorList=this.RevisedVendorList;
    // Return the temporary vendor list
    return tempVendorList;
}


  /**
   * Getter method to access the vendor array from the vendor form.
   * @returns The vendor array FormArray.
   */
  get vendorArray(): FormArray {
    return this.vendorForm.get('vendor') as FormArray;
    console.log(this.vendorForm);
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

  save() {
    let vendorIndex: number = 0;
    this.flag = true;

    // Clear existing arrays
    this.finalVendorArray.length = 0;
    this.VendorItems.length = 0;
    this.vendorItemsTables.length = 0;

    for (let vendors of this.vendorArray.controls) {
      const category = vendors.get('Item_category').value._id;
      const subCategory = vendors.get('Item_subCategory').value._id;

      let tableData = {
        items: [],
        vendors: [],
        totals: {},
      };

      for (let vendor of vendors.get('selectedVendors').value) {
        console.log('checking.', vendors.get('selectedVendors').value);
        this.finalVendorArray.push([vendor, vendorIndex]);
        tableData.vendors.push(this.detailsOfVendor(vendor));

        // Initialize totals for this vendor
        tableData.totals[vendor] = {
          totalAmount: 0,
          gstAmount: 0,
          freight: 0,
          freightGst: 0,
          grandTotal: 0,
          vendorRemark: '',
          paymentTerms :'',
          preferred: false,
        };

        // Create a new FormGroup for each vendor
        const vendorItemsForm = new FormGroup({
          Vendor: new FormControl(vendor, Validators.required),
          category: new FormControl(category, Validators.required),
          subCategory: new FormControl(subCategory, Validators.required),
          items: this.formBuilder.array([]),
        });

        // Get items for this category and subcategory
        const tempFilteredItems = this.details.items;

        // Add item FormGroups to the items FormArray
        for (let item of tempFilteredItems) {
          const itemGroup = this.formBuilder.group({
            item: new FormControl(item),
            RequiredQuantity: new FormControl(item.qty, Validators.required),
            Rate: new FormControl('', [
              Validators.required,
              Validators.pattern('^[-+]?[0-9]*\\.?[0-9]+$'),
            ]),
            SubTotalAmount: new FormControl('', Validators.required),
            Freight: new FormControl(0, Validators.required),
            Total: new FormControl('', Validators.required),
          });
          (vendorItemsForm.get('items') as FormArray).push(itemGroup);

          // Check if item is already in tableData.items
          const existingItem = tableData.items.find(
            (i) => i.item_id === item._id
          );

          if (!existingItem) {
            // Add item if it's not already present
            tableData.items.push({
              item_id: item._id,
              name: item.item_name,
              specification: item.specification,
              hsnCode:item.hsnCode,
              category: item.categoryDetail.name,
              subCategory: item.subCategoryDetail.subcategory_name,
              uom: item.uomDetail.uom_name,
              quantity: item.qty,
              gst: item.tax.amount,
              pislBudget: 0,
              pislBudgetSubTotal: 0,
              remarks: '',

              vendors: {},
            });
          }

          // Initialize vendor data for this item
          const matchedItem = tableData.items.find(
            (i) => i.item_id === item._id
          );
          if (matchedItem) {
            matchedItem.vendors[vendor] = {
              requiredQty: matchedItem.quantity,
              preferred:false, // Assign the matched item's quantity
              rate: '',
              amount: '',
            };
          }
        }

        this.VendorItems.push(vendorItemsForm);
        vendorIndex++;
      }

      this.vendorItemsTables.push(tableData);
    }

    this.createFormControls();
  }

  convertToFormData( files: File[]): FormData {
    const formData = new FormData();

    const appendFormData = (formData: FormData, key: string, value: any) => {
      if (Array.isArray(value)) {
        value.forEach((element, index) => {
          if (typeof element === 'object' && element !== null) {
            appendFormData(formData, `${key}[${index}]`, element);
          } else {
            formData.append(`${key}[${index}]`, element);
          }
        });
      } else if (typeof value === 'object' && value !== null) {
        Object.keys(value).forEach((subKey) => {
          appendFormData(formData, `${key}.${subKey}`, value[subKey]);
        });
      } else {
        formData.append(key, value);
      }
    };

    files.forEach((file, index) => {
      formData.append(`files[${index}]`, file, file.name);
    });

    return formData;
  }

  createFormControls() {
    this.vendorItemsTables.forEach((table, tableIndex) => {
      table.items.forEach((item) => {
        Object.keys(item.vendors).forEach((vendorId) => {
          const rateControlName = `table_${tableIndex}_item_${item.item_id}_vendor_${vendorId}_rate`;
          const requiredQtyControlName = `table_${tableIndex}_item_${item.item_id}_vendor_${vendorId}_requiredQty`;
          const amountControlName = `table_${tableIndex}_item_${item.item_id}_vendor_${vendorId}_amount`;

          this.vendorItemsForm.addControl(
            rateControlName,
            new FormControl('', Validators.required)
          );
          this.vendorItemsForm.addControl(
            requiredQtyControlName,
            new FormControl(item.quantity, Validators.required)
          );
          this.vendorItemsForm.addControl(
            amountControlName,
            new FormControl('', Validators.required)
          );
        });

        const remarksControlName = `table_${tableIndex}_item_${item.item_id}_remarks`;
        const pislBudgetControlName = `table_${tableIndex}_item_${item.item_id}_pislBudget`;
        this.vendorItemsForm.addControl(
          remarksControlName,
          new FormControl('')
        );
        this.vendorItemsForm.addControl(
          pislBudgetControlName,
          new FormControl('', Validators.required)
        );
      });

      Object.keys(table.totals).forEach((vendorId) => {
        const freightControlName = `table_${tableIndex}_vendor_${vendorId}_freight`;
        const freightGstControlName = `table_${tableIndex}_vendor_${vendorId}_freightGst`;
        const vendorRemarkControlName = `table_${tableIndex}_vendor_${vendorId}_vendorRemark`;
       
        const paymentTermsControlName = `table_${tableIndex}_vendor_${vendorId}_paymentTerms`;
        this.vendorItemsForm.addControl(
          freightControlName,
          new FormControl(0, Validators.required)
        );
        this.vendorItemsForm.addControl(
          freightGstControlName,
          new FormControl(0, Validators.required)
        );
        this.vendorItemsForm.addControl(
          vendorRemarkControlName,
          new FormControl('')
        );
        this.vendorItemsForm.addControl(
          paymentTermsControlName,
          new FormControl('')
        );
      });
    });

    this.updateTotals(0);
    console.log(this.vendorItemsForm);
  }

  getFormControl(
    tableIndex: number,
    itemId: string,
    vendorId: string,
    field: string
  ): FormControl {
    let controlName: string;
    if (field === 'rate' || field === 'amount') {
      controlName = `table_${tableIndex}_item_${itemId}_vendor_${vendorId}_${field}`;
    } else if (field === 'requiredQty') {
      controlName = `table_${tableIndex}_item_${itemId}_vendor_${vendorId}_${field}`;
    } else if (field === 'remarks') {
      controlName = `table_${tableIndex}_item_${itemId}_${field}`;
    } else if (field === 'pislBudget') {
      controlName = `table_${tableIndex}_item_${itemId}_${field}`;
    } else {
      controlName = `table_${tableIndex}_vendor_${vendorId}_${field}`;
    }

    const control = this.vendorItemsForm.get(controlName);
    if (control) {
      return control as FormControl;
    } else {
      console.error(`Control not found: ${controlName}`);

      return new FormControl('');
    }
  }

  updatePislBudget(item: any, tableIndex: number) {
    const remarkControl = this.getFormControl(
      tableIndex,
      item.item_id,
      '',
      'pislBudget'
    );
    const table = this.vendorItemsTables[tableIndex];
    const itemInTable = table.items.find((i) => i.item_id === item.item_id);
    if (itemInTable) {
      itemInTable.pislBudget = parseFloat(remarkControl.value) || 0;

      const BudgetSubTotal = itemInTable.pislBudget * itemInTable.quantity;
      console.log(BudgetSubTotal);
      itemInTable.pislBudgetSubTotal = parseFloat(BudgetSubTotal.toFixed(2)); // remark
    }
  }

  updateStatus(item: any, tableIndex: number) {
    const remarkControl = this.getFormControl(
      tableIndex,
      item.item_id,
      '',
      'remarks'
    );
    const table = this.vendorItemsTables[tableIndex];
    const itemInTable = table.items.find((i) => i.item_id === item.item_id);
    if (itemInTable) {
      itemInTable.remark = remarkControl.value; // remark
    }
  }

  updateQty(item: any, vendorId: string, tableIndex: number) {
    const requiredQtyControl = this.getFormControl(
      tableIndex,
      item.item_id,
      vendorId,
      'requiredQty'
    );
    const reQty = parseFloat(requiredQtyControl.value) || 0;

    // Update the vendorItemsTable structure with the rate and amount
    const table = this.vendorItemsTables[tableIndex];
    const itemInTable = table.items.find((i) => i.item_id === item.item_id);
    if (itemInTable) {
      // Store rate
      itemInTable.vendors[vendorId].requiredQty = reQty; // Store amount
    }

    console.log('Checking for quanity', this.vendorItemsTables[0].items);
  }

  updateAmount(item: any, vendorId: string, tableIndex: number) {
    const rateControl = this.getFormControl(
      tableIndex,
      item.item_id,
      vendorId,
      'rate'
    );

    const amountControl = this.getFormControl(
      tableIndex,
      item.item_id,
      vendorId,
      'amount'
    );

    if (rateControl && amountControl) {
      const rate = parseFloat(rateControl.value) || 0;
      const amount = rate * item.quantity;
      amountControl.setValue(amount.toFixed(2), { emitEvent: false });

      // Update the vendorItemsTable structure with the rate and amount
      const table = this.vendorItemsTables[tableIndex];
      const itemInTable = table.items.find((i) => i.item_id === item.item_id);
      if (itemInTable) {
        itemInTable.vendors[vendorId].rate = rateControl.value; // Store rate
        itemInTable.vendors[vendorId].amount = amount.toFixed(2); // Store amount
      }

      console.log(
        `Table: ${tableIndex}, Item: ${
          item.item_id
        }, Vendor: ${vendorId}, Rate: ${
          rateControl.value
        }, Amount: ${amount.toFixed(2)}`
      );

      this.updateTotals(tableIndex);
    }
  }

  updateTotals(tableIndex: number) {
    const table = this.vendorItemsTables[tableIndex];
    Object.keys(table.totals).forEach((vendorId) => {
      let totalAmount = 0;
      let totalGstAmount = 0;

      table.items.forEach((item) => {
        const amountControl = this.getFormControl(
          tableIndex,
          item.item_id,
          vendorId,
          'amount'
        );
        const amount = parseFloat(amountControl.value) || 0;

        totalAmount += amount;
        const gstAmount = amount * (item.gst / 100);
        totalGstAmount += gstAmount;
      });

      table.totals[vendorId].totalAmount = totalAmount;
      table.totals[vendorId].gstAmount = totalGstAmount;

      const freightControl = this.getFormControl(
        tableIndex,
        '',
        vendorId,
        'freight'
      );
      const freightGstControl = this.getFormControl(
        tableIndex,
        '',
        vendorId,
        'freightGst'
      );
      const vendorRemarkControlName = this.getFormControl(
        tableIndex,
        '',
        vendorId,
        'vendorRemark'
      );
      
      const paymentTermsControlName = this.getFormControl(
        tableIndex,
        '',
        vendorId,
        'paymentTerms'
      );
      table.totals[vendorId].freight = parseFloat(freightControl.value) || 0;
      table.totals[vendorId].freightGst =
        parseFloat(freightGstControl.value) || 0;
      table.totals[vendorId].vendorRemark = vendorRemarkControlName.value;
      table.totals[vendorId].paymentTerms = paymentTermsControlName.value;
      table.totals[vendorId].grandTotal =
        table.totals[vendorId].totalAmount +
        table.totals[vendorId].gstAmount +
        table.totals[vendorId].freight +
        table.totals[vendorId].freight *
          (table.totals[vendorId].freightGst / 100);
    });
  }

  saveAndHighlight() {
    this.isSaved = true;
  }

  isLowestAmount(
    tableIndex: number,
    itemId: string,
    vendorId: string
  ): boolean {
    const currentAmount =
      parseFloat(
        this.getFormControl(tableIndex, itemId, vendorId, 'amount').value
      ) || Infinity;
    const allAmounts = this.getVendorIds(
      this.vendorItemsTables[tableIndex]
    ).map(
      (vid) =>
        parseFloat(
          this.getFormControl(tableIndex, itemId, vid, 'amount').value
        ) || Infinity
    );
    return currentAmount === Math.min(...allAmounts);
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

  toggleVendorPreferred(index: number, event: any) {
    // Get the corresponding vendor ID from the dynamically generated vendorKeys array
    const vendorKeys = Object.keys(this.vendorItemsTables[0].totals);
    const vendorId = vendorKeys[index];

    // Update the preferred field for the vendor in the totals object
    this.vendorItemsTables[0].totals[vendorId].preferred = event.target.checked;

    // If the current vendor is being set to preferred, set all other vendors to not preferred
    if (event.target.checked) {
        vendorKeys.forEach((key) => {
            if (key !== vendorId) {
                this.vendorItemsTables[0].totals[key].preferred = false;
            }
        });
    }

    // Now update the 'preferred' status in all the items for the selected vendor
    this.vendorItemsTables[0].items.forEach((item) => {
        const vendorIds = Object.keys(item.vendors);

        // Set the selected vendor's preferred status for the current item
        vendorIds.forEach((vId) => {
            if (vId === vendorId) {
                item.vendors[vId].preferred = event.target.checked;
            } else {
                item.vendors[vId].preferred = false;
            }
        });
    });
}


  // In your component
  getVendorKeys() {
    return Object.keys(this.vendorItemsTables[0].totals);
  }

  // In your component

  getVendorIds(table: any): string[] {
    return Object.keys(table.totals);
  }

  detailsOfVendor(vendor: any) {
    let tempvendor = this.vendorsList.find((obj) => obj._id == vendor);
    return tempvendor.vendor_name;
  }

  onFilesSelected(event: any): void {
    const fileList: FileList = event.target.files;
    console.log('file', fileList);
    if (fileList.length > 0) {
      const files = Array.from(fileList);

      this.files = files;

      console.log(this.files);
    }
  }

  removeFile(file: File): void {
    const updatedFiles = this.files.filter((f: File) => f.name !== file.name);
    console.log('there', updatedFiles);
    this.files = updatedFiles;
  }

  filesExist(index: number): File[] {
    return (this.items.at(index).get('files') as FormArray).controls.map(
      (c) => c.value
    );
  }

  filterVendorList(event: Event) {
    const inputElement = event.target as HTMLInputElement; // Cast to HTMLInputElement
    const searchKeyword = inputElement.value; // Get the value

    // Filter the vendors based on the search input
    this.filteredVendorList = this.RevisedVendorList.filter(vendor =>
      vendor.vendor_name.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }

  showSelectedVendors() {
    // Get the selected vendor IDs from the form
    const selectedVendors = this.vendorSelectionForm.get('NewSelectionVendors').value;

    // Log the selected vendors
    console.log('Selected Vendor IDs:', selectedVendors);

    // Check if there are any selected vendors
    if (selectedVendors && selectedVendors.length > 0) {
        // Filter the vendorList to get the matching vendor objects
        const matchingVendors = this.vendorsList.filter(vendor =>
            selectedVendors.includes(vendor._id)
        );

        // Log the matching vendor objects
        console.log('Matching Vendor Objects:', matchingVendors);

        // Add unique vendors to the selectedVendorList
        matchingVendors.forEach(vendor => {
            // Check if the vendor is already in the selectedVendorList
            if (!this.selectedVendorList.some(existingVendor => existingVendor._id === vendor._id)) {
                this.selectedVendorList.push(vendor);
            }
        });

        console.log('Updated Selected Vendor List:', this.selectedVendorList);
    } else {
        alert('No vendors selected.');
    }
}


  handleVendorSelectionChange(event: any) {
    const selectedVendors = this.vendorSelectionForm.get('NewSelectionVendors') as FormArray;

    // Clear the FormArray first
    selectedVendors.clear();

    // Add selected vendor IDs directly from the event value
    event.value.forEach((vendorId: string) => {
      selectedVendors.push(this.formBuilder.control(vendorId)); // Add selected vendor ID to FormArray
    });

    console.log('Selected Vendors:', selectedVendors.value); // Log the selected vendors
  }
  /*-----------------------------*/

  /* -----------------------------------------*/

  ngOnInit(): void {
    // Retrieve user permissions from local storage and parse them as JSON
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

        this.vendorItemsForm = new FormGroup({});

        this.route.params.subscribe((params) => {
          if (params['id']) {
            this.httpService
              .GET(`${RATE_COMPARATIVE_DETAIL_API}`, { _id: params['id'] })
              .subscribe({
                next: (res) => {
                  this.details = res.data.details;
                  console.log('checking Api', this.details);
                  this.vendorsList = res.data.vendorsList;
                this.filteredVendorList=this.vendorsList;

                  this.vendorsList.map((o: any) => {
                    this.vendorAssociatedData[o._id] = o;
                    return o;
                  });

                  let temparr = [];
                  this.filteredItems = this.details?.items.filter((item) => {
                    let s =
                      item.categoryDetail._id +
                      '$' +
                      item.subCategoryDetail._id;
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

                    this.isVendorSelected(items);
                  });

                  console.log(this.vendorForm);
                  // console.log(this.vendorForm.get('vendor')as FormArray)
                  this.patchData(res.data.details);
                },
                error: (error) => {
                  // this.router.navigate(['/procurement/prlist'])
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
