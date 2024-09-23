import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { PURCHASE_REQUEST_API, CATEGORY_API, GET_SITE_API, ITEM_API, UOM_API,GET_VENDOR_API,GET_BRAND_API,GET_ROLE_API } from '@env/api_path';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import { isEmpty } from 'lodash';
import * as moment from 'moment';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import {Observable} from 'rxjs';
@Component({
  selector: 'app-purchase-request',
  templateUrl: './purchase-request.component.html',
  styleUrls: ['./purchase-request.component.scss']
})

export class PurchaseRequestComponent implements OnInit {

  viewPermission: any;
  editPermission: any;
  addPermission: any;
  // deletePermission: any;

  siteName: any;
  apiResponse: any;
  statusOption = new FormControl('pending');
  statusList = [
    {
      value: 'pending',
      label: 'Pending'
    },
    {
      value: 'approved',
      label: 'Approved'
    },
    {
      value: 'rejected',
      label: 'Rejected'
    },
    {
      value: 'revise',
      label: 'Revise'
    },
  ]
  requredByMinDate = new Date();
  id: any;
  categoryList:any;
  siteList: any;
  superSiteList:any;
  vendorList:any;
  brandNotSelected:boolean = false;
  vendorSearch: string = '';
  filteredVendorList: any[] = [];
  load = false;
  items: FormArray | any = [];
  uomList: any;
  itemList: any;
  itemCategoryList:any;
  itemSelected: boolean = false;
  filteredItemList: any;
  filteredBrandList: any;
  option = 2;
  purchaseList: any[] = [];
  filter_by = "status";
  brandList:any;
  originalPurchaseList: any = [];
  permissions: any;
  filter_value = "pending";
  curr_site:any;
  requestNo: number = 0;
  
  // updateRequestNo(newNumber: number): void {
  //   this.requestNo = newNumber;
  // }
  details: any = {};
  constructor(
    private router: Router,
    private httpService: RequestService,
    private snack: SnackbarService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}
  // {this.getPRN({ filter_by: this.filter_by, filter_value: this.filter_value });}
  
  /**
 * Represents the purchase request form, including form controls for various fields.
 * Default values are set for date and expected delivery date fields using moment.js library.
 * @returns void
 */

  brandSelections: FormArray = this.formBuilder.array([]);

  purchaseRequestForm = new FormGroup({
    title: new FormControl('', Validators.required),
    date: new FormControl(moment().format('DD-MM-YYYY'), Validators.required),
    expected_delivery_date: new FormControl(moment().add(1, 'days').format('DD-MM-YYYY'), Validators.required),
    purchase_request_number: new FormControl(null, Validators.required), // assuming null is the initial value

    
    site: new FormControl('', Validators.required),
    local_purchase: new FormControl('no', Validators.required),
    remarks: new FormControl(''),
    items: this.formBuilder.array([]),
    vendor: new FormControl(),
  });


  onSubmit() {
  

    if (!this.purchaseRequestForm.valid) {
      console.log("Form is invalid", this.purchaseRequestForm);
    
      // Iterate over form controls to identify validation errors
      Object.keys(this.purchaseRequestForm.controls).forEach(key => {
        const control = this.purchaseRequestForm.get(key);
        if (control && control.invalid) {
          console.log(`Validation error in ${key}:`, control.errors);
    
        }
      });
    
      return;
    }

   

    let requestData: any = this.purchaseRequestForm.value;
    this.load = false;
    console.log("here", requestData);
    console.log(requestData.title);
    const selectedCategory = this.categoryList.find((obj: { _id: any; }) => obj._id === requestData.title);
    console.log(selectedCategory);
    requestData['title'] = selectedCategory.name;
    requestData['requestNo'] = this.requestNo;
    requestData['date'] = moment(requestData.date, 'DD-MM-YYYY').toDate()
    requestData['expected_delivery_date'] = new Date(requestData.expected_delivery_date)


    console.log("Hamra Console log", requestData);
    
   
    //for local purchase
    if (this.purchaseRequestForm.get('local_purchase').value === "yes") {
      let vendorItems = [];
      let obj = {
        Vendor: requestData.vendor || null,
        items: [],
      };
    
      if (requestData.items && this.itemList) {
        for (let item of requestData.items) {
          let tempobj = {
            item: this.itemList.find(o => o._id === item.item_id) || null,
            RequiredQuantity: item.qty,
            Rate: item.rate,
            SubTotalAmount: item.qty * item.rate,
            Total: 0,
          };
    
          if (tempobj.item) {
            delete tempobj.item.category;
            delete tempobj.item.created_at;
            delete tempobj.item.gst;
    
            if (tempobj.item.gstDetail) {
              let tax = {
                amount: tempobj.item.gstDetail.gst_percentage || 0,
                name: tempobj.item.gstDetail.gst_name || '',
              };
              tempobj.item.tax = tax;
              delete tempobj.item.gstDetail;
            }
    
            delete tempobj.item.item_number;
            delete tempobj.item.specification;
            delete tempobj.item.sub_category;
            delete tempobj.item.uom;
            delete tempobj.item.updated_at;
    
            tempobj.item.qty = parseFloat(tempobj.RequiredQuantity);
            tempobj.item.item_id = item.item_id;
            tempobj.item.remark = item.remark;
            tempobj.Total = (item.qty * item.rate) + ((item.qty * item.rate) * (tempobj.item.tax ? tempobj.item.tax.amount : 0)) / 100;
    
            obj.items.push(tempobj);
          }
        }
      }
    
      vendorItems.push(obj);
      requestData.vendorItems = vendorItems;
    }
    
   
    console.log("Payload", requestData);


const formData = new FormData();
  const formValue = requestData;

 
  // Append non-file fields to FormData
  formData.append('title', formValue.title);
  formData.append('handle_by', formValue.handle_by);
  formData.append('date', formValue.date);
  formData.append('expected_delivery_date', formValue.expected_delivery_date);
  formData.append('purchase_request_number', formValue.purchase_request_number);
  formData.append('site', formValue.site);
  formData.append('local_purchase', formValue.local_purchase);
  formData.append('remarks', formValue.remarks);

  formData.append ('requestNo', formValue.requestNo);


  if (this.purchaseRequestForm.get('local_purchase').value === "no") {
   

  // Append items and their files
  formValue.items.forEach((item, index) => {

    try {
      if (!item) {
        console.error(`Item at index ${index} is null or undefined`);
        return; // Skip this iteration
      }
  
      // Basic item properties
      formData.append(`items[${index}][item_id]`, item.item_id && item.item_id._id ? item.item_id._id : '');
      formData.append(`items[${index}][qty]`, item.qty || '');
      formData.append(`items[${index}][category]`, item.category || '');
      formData.append(`items[${index}][subCategory]`, item.subCategory || '');
      formData.append(`items[${index}][remark]`, item.remark || '');
      formData.append(`items[${index}][uom]`, item.uom || '');

      if(item.brandSelections.length === 0)
        {
          this.snack.notify("Select Atleast one Brand for every Item",2);
          this.brandNotSelected=true;
          return;
        }
  
      // Brand selections
      if (Array.isArray(item.brandSelections)) {
       
        item.brandName = item.brandSelections.map(brandId => brandId);
        item.brandSelections.forEach((brand, fileIndex) => {
          if (brand) {
           
            formData.append(`items[${index}][brandName]`, brand);
          }
        });
      } else {
        console.warn(`brandSelections for item ${index} is not an array`);
      }
  
      // File attachments
      if (item.files && Array.isArray(item.files)) {
        item.files.forEach((file, fileIndex) => {
          if (file && file.name) {
            console.log(`Appending file for item ${index}:`, file.name);
            formData.append(`items[${index}][attachment]`, file, file.name);
          } else {
            console.warn(`Invalid file object for item ${index}, file index ${fileIndex}`);
          }
        });
      } else {
        console.log(`No files to process for item ${index}`);
      }
    } catch (error) {
      console.error(`Error processing item ${index}:`, error);
    }
  });
}
else
{
  formData.append('vendor', formValue.vendor);
 formData.append('vendorItems[0][Vendor]',"");
 formData.append('vendorItems[0][items]', "");

  formValue.items.forEach((item, index) => {
    try {
      if (!item) {
        console.error(`Item at index ${index} is null or undefined`);
        return; // Skip this iteration
      }
  
      // Basic item properties
      formData.append(`items[${index}][item_id]`, item.item_id._id);
    formData.append(`items[${index}][qty]`, item.qty);
    formData.append(`items[${index}][category]`, item.category);
    formData.append(`items[${index}][subCategory]`, item.subCategory);
    formData.append(`items[${index}][remark]`, item.remark);
    formData.append(`items[${index}][uom]`, item.uom);
    formData.append(`items[${index}][brandName]`, item.brandName._id);
    formData.append(`items[${index}][rate]`, item.rate);
    formData.append(`items[${index}][gst]`, "");
    formData.append(`items[${index}][freight]`, "");
  
      // Brand selections
      if (Array.isArray(item.brandSelections)) {
        item.brandName = item.brandSelections.map(brandId => brandId);
        item.brandSelections.forEach((brand, fileIndex) => {
          if (brand) {
            formData.append(`items[${index}][brandName]`, brand);
          }
        });
      } else {
        console.warn(`brandSelections for item ${index} is not an array`);
      }
  
      // File attachments
      if (item.files && Array.isArray(item.files)) {
        item.files.forEach((file, fileIndex) => {
          if (file && file.name) {
            console.log(`Appending file for item ${index}:`, file.name);
            formData.append(`items[${index}][attachment]`, file, file.name);
          } else {
            console.warn(`Invalid file object for item ${index}, file index ${fileIndex}`);
          }
        });
      } else {
        console.log(`No files to process for item ${index}`);
      }
    } catch (error) {
      console.error(`Error processing item ${index}:`, error);
    }
  });

}

    console.log("THERE", formData)

    if(this.brandNotSelected === true)

    {
      console.log(this.brandNotSelected);
      this.brandNotSelected=false;
      return;
    }

    // Make a POST request to the PURCHASE_REQUEST_API with requestData
    this.httpService.POST(PURCHASE_REQUEST_API, formData).subscribe({
      next: (resp: any) => {
        this.load = false;
        this.snack.notify("Purchase request has been created.", 1);
        this.purchaseRequestForm.reset();
        this.purchaseRequestForm.markAsUntouched();
        
        this.option = 2;
        this.getPurchaseList({ filter_by: this.filter_by, filter_value: this.statusOption.value });

      },
      error: (err) => {
        this.load = false;
        console.log(err);
        if (err.errors && Object.keys(err.errors).length > 0) {
          let errMessage = '<ul>';
          for (let e in err.errors) {
            let objData = err.errors[e];
            errMessage += `<li>${objData[0]}</li>`;
          }
          errMessage += '</ul>';
          this.snack.notifyHtml(err.message, 2);
        } else {
          console.log("there", err.message);
          this.snack.notify(err.errors || 'An error occurred', 2);
        }
      }
    }); 
    
  }

  createRequest() {
   
    this.option = 1;
    this.purchaseRequestForm.get('date').setValue(moment().format('DD-MM-YYYY'));
   
  }
  
  getList() {
    const UOM = this.http.get<any>(`${environment.api_path}${UOM_API}`);
    const item = this.http.get<any>(`${environment.api_path}${ITEM_API}`);
    const site = this.http.get<any>(`${environment.api_path}${GET_SITE_API}`);
    const vendor = this.http.get<any>(`${environment.api_path}${GET_VENDOR_API}`);
    const brand = this.http.get<any>(`${environment.api_path}${GET_BRAND_API}`);
    const category=this.http.get<any>(`${environment.api_path}${CATEGORY_API}`);
    this.httpService.multipleRequests([UOM, item, vendor,brand,site,category], {}).subscribe(res => {
      if (res) {
        this.uomList = res[0].data;
        this.itemList = res[1].data;

        this.vendorList=res[2].data;
        this.brandList=res[3].data;
        console.log(this.brandList);
        
        this.superSiteList=res[4].data;
        this.categoryList=res[5].data;
        this.filteredItemList = this.itemList;

        this.filteredBrandList = this.brandList;
       
        if(this.permissions.user.role === "superadmin"){
        
           this.siteList= this.superSiteList;
          console.log(this.siteList);
         }
        
      }
    })

   
    
  }

  /**
   * Adds a new item to the list of items in the purchase request form.
   * If the purchase request is for a local purchase, creates a local item; otherwise, creates a regular item.
   * @returns void
   */
  addItem(): void {
    // Retrieve the 'items' FormArray from the purchase request form
    this.items = this.purchaseRequestForm.get('items') as FormArray;

    // Check if the purchase request is for a local purchase
    if(this.purchaseRequestForm.get('local_purchase').value==="yes")
      this.items.push(this.createLocalItem());
    else
      this.items.push(this.createItem());
  }

  /**Updates the category, subcategory, and unit of measurement (UOM) fields 
  of the selected item in the items array.
  */
  
  
 


  createItem(): FormGroup {
    return this.formBuilder.group({
      item_id: new FormControl('', Validators.required),
      qty:new FormControl('', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
      category: new FormControl(null),
      subCategory: new FormControl(null),
      attachment: new FormControl([]),
      files: new FormControl([]),
      remark: new FormControl(''),
      uom: new FormControl(''),
     
      brandSelections: this.formBuilder.array([]),
    });
  }
  createLocalItem(): FormGroup {
    return this.formBuilder.group({
      item_id: new FormControl('', Validators.required),
      qty:new FormControl('', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
      category: new FormControl(null),
      subCategory: new FormControl(null),
      attachment: new FormControl([]),
      remark: new FormControl(''),
      uom: new FormControl(''),
      files: new FormControl([]),
     
      rate:new FormControl('', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
      gst:new FormControl(''),
      freight:new FormControl(''),
      brandSelections: this.formBuilder.array([]),
    });
  }

  // Clearing the 'items' FormArray to ensure it is empty.
  // Adding items based on the value of 'local_purchase' (yes or no).
  handleLocalPurchaseChange() {
    if (this.purchaseRequestForm.get('local_purchase').value === "yes") {
      this.purchaseRequestForm.get('local_purchase').setValue('no');
    } else {
      this.purchaseRequestForm.get('local_purchase').setValue('yes');
    }

    const itemsFormArray = this.purchaseRequestForm.get('items') as FormArray;
    itemsFormArray.clear();
    this.addItem();
  }
  onVendorSelection(event: any) {
    // Retrieve the selected vendor from the vendorList based on the _id
    const selectedVendor = this.vendorList.find(item => item._id === event.value);
    
  
    // Check if a vendor was found
    if (selectedVendor) {
      //Filter the itemList based on the category and subcategory of the selected vendor
      
      this.filteredItemList = this.itemList.filter(item => {
      
        const categoryMatch = selectedVendor.category.some(categoryItem => categoryItem === item.category);
        const subCategoryMatch = selectedVendor.SubCategory.some(subCategoryItem => subCategoryItem === item.sub_category);
      
        return categoryMatch && subCategoryMatch;
      });
      
    } else {
      // Handle the case where no vendor is found (optional)
      console.warn('No matching vendor found for the selected ID.');
      this.filteredItemList = [];
    }
  }

  

 toggleBrandSelection(brandId: string, index: number): void {
  const brandSelections = (this.purchaseRequestForm.get('items') as FormArray).controls[index].get('brandSelections') as FormArray;
    const existingIndex = brandSelections.controls.findIndex(control => control.value === brandId);

    if (existingIndex !== -1) {
      brandSelections.removeAt(existingIndex);
    } else {
      brandSelections.push(new FormControl(brandId));
    }

    console.log("brandSelections", brandSelections);
  }
 
  
  
  
  /**
   * Removes an item from the list of items in the purchase request form at the specified index.
   * @param i The index of the item to be removed.
   * @returns void
   */
  delete(i) {
    const remove = this.purchaseRequestForm.get('items') as FormArray;;
    remove.removeAt(i);
  }

  onStatusChange(item) {
    this.getPurchaseList({ filter_by: this.filter_by, filter_value: item.value })
  }

  selectedTitle(event: any) {
    const title = this.categoryList.find((obj: { _id: any; }) => obj._id == event.value);
    
    const dynamicDataFormatted = title.name.replace(/[ ,]/g, '_');
     
   this.filteredItemList= this.itemList.filter(item => item.category === event.value);
   this.itemCategoryList=this.itemList.filter(item => item.category === event.value);
   this.items = [];
   const items = this.purchaseRequestForm.get('items') as FormArray;

// Loop from the last index to the first and remove each element
while (items.length !== 0) {
  items.removeAt(0);
}

this.addItem();
  
console.log("check for filtered", this.filteredItemList);
    console.log("titleSelected", this.purchaseRequestForm);
  }

  selectedSite(event: any) {
    const siteName = this.siteList.find((obj: { _id: any; }) => obj._id == event.value);
    const dynamicDataFormatted = siteName.site_name.replace(/[ ,]/g, '_');
    console.log("title", this.purchaseRequestForm);
    const searchTerm = `${dynamicDataFormatted}/`;
    const purchase = this.http.get<any>(`${environment.api_path}${PURCHASE_REQUEST_API}`);

    this.httpService.multipleRequests([purchase], {}).subscribe(res => {
      if (res) {
        this.purchaseList = res[0].data; 
        const filteredList = this.purchaseList.filter(item => item.siteData.site_name.includes(siteName.site_name));
       const index=filteredList.length-1;
        console.log(filteredList[index].purchase_request_number);
        this.requestNo = parseInt(filteredList[filteredList.length-1].purchase_request_number) + 1;
        
        this.purchaseRequestForm.controls['purchase_request_number'].setValue(this.requestNo);
        
      }
    });
    
  }

  
  
  getPurchaseList(filterObj: any) {
    this.httpService.GET(PURCHASE_REQUEST_API, filterObj).subscribe({
      next: (resp: any) => {
        console.log("checking Data", resp.data);
        
        // Format the Date field for each purchase request
        resp.data.forEach((purchaseRequest: any) => {
          purchaseRequest.date = moment(purchaseRequest.
            updated_at
            ).format('DD-MM-YYYY');
        });
        
        console.log("check Data once", resp.data);
        if (this.permissions.user.role === "superadmin") {
          this.originalPurchaseList = resp.data;
          this.purchaseList = resp.data;  
        } else {
          const purchaseRequests = resp.data;
          const filteredPurchaseRequests = purchaseRequests.filter(pr => 
            this.siteList.some(site => site._id === pr.site)
          );
          
         
          this.originalPurchaseList = filteredPurchaseRequests;
          this.purchaseList = filteredPurchaseRequests;  
        }
      }
    });
  }
  

  dateFilter(event: MatDatepickerInputEvent<Date>) {
    
    if (this.originalPurchaseList && this.originalPurchaseList.length > 0) {
      if (event.value) {
        this.purchaseList = this.originalPurchaseList.filter(obj => new Date(obj.date) == new Date(event.value))
      }
      else {
        this.purchaseList = this.originalPurchaseList;
      }
    }
  }

  onFilesSelected(event: any, index: number): void {
    const fileList: FileList = event.target.files;
     console.log("file", fileList);
      if (fileList.length > 5)
      {
        this.snack.notify('Can upload Maximum 5 Files', 2);
        return;
      }

    if (fileList.length > 0) {
      const files = Array.from(fileList);
      
      this.items.at(index).patchValue({
        files :files,
      });
     

      console.log(this.items);
    }
  }

  removeFile(index: number, file: File): void {
    // Get the FormArray of files for the specified item
    const filesArray = this.items.at(index).get('files') as FormArray;
  console.log("here", filesArray);
    // Filter out the file with the matching name
    const updatedFiles = filesArray.value.filter((f: File) => f.name !== file.name);
    console.log("there", updatedFiles);
    // Clear the current files array
   /* while (filesArray.length !== 0) {
      filesArray.value.removeAt(0);
    }
  
    // Add the updated files back to the FormArray
    updatedFiles.forEach((f: File) => filesArray.push(new FormControl(f)));
  
    console.log(updatedFiles); */
    this.items.at(index).patchValue({
      files :updatedFiles,
    });

    console.log(this.items);

  }
  
  files(index: number): File[] {
    return (this.items.at(index).get('files') as FormArray).controls.map(c => c.value);
  }

  search(event: any, type?: any) {
    if (this.originalPurchaseList && this.originalPurchaseList.length > 0) {
      if (type == 'site') {
        if (event.target.value) {
          this.purchaseList = this.originalPurchaseList.filter(obj => obj.siteData.site_name.toLowerCase().includes(event.target.value.toLowerCase()))
        }
        else {
          this.purchaseList = this.originalPurchaseList;
        }
      }
      else {
        if (event.target.value) {
          this.purchaseList = this.originalPurchaseList.filter(obj => obj.title.toLowerCase().includes(event.target.value.toLowerCase()))
        }
        else {
          this.purchaseList = this.originalPurchaseList;
        }
      }
    }
  }

  displayItemFn(item: any): string {
  return item ? item.item_name : '';
}

displayBrandFn(brand: any): string {
  return brand ? brand.brand_name : '';
}

selectedItem(event: any, i: any) {
  const selectedItem = event.option.value;
  const selectedItemId = selectedItem._id;
  console.log(selectedItem);

  // Retrieve the 'items' FormArray
  const itemsFormArray = this.purchaseRequestForm.get('items') as FormArray;
  console.log("itemsArray", itemsFormArray.value);

  // Find indices of items with the selected ID by checking the nested 'item_id' property
  const indices = itemsFormArray.value
    .map((item: any, index: number) => ({ index, id: item.item_id._id }))
    .filter((item: any) => item.id === selectedItemId)
    .map((item: any) => item.index);

  console.log('Indices of duplicate items:', indices);

  if (indices.length >= 2) {
    // If the item occurs twice or more, remove the last occurrence and show an error
    itemsFormArray.removeAt(indices.pop() as number);

    // Show an error message
    this.snack.notify('Item already exists', 2);

    // Optionally clear the current row's selected item
    this.items.at(i).reset();
    return;
  } else if (indices.length === 1) {
    // If the item occurs only once, update the FormArray item
    let category = selectedItem.categoryDetail.name;
    let subCategory = selectedItem.subCategoryDetail.subcategory_name;
    let uom = selectedItem.uomDetail.uom_name;
    if(this.items.length >1)
    {
      this.itemSelected = true; 
    }
    this.items.at(i).patchValue({
      category: category,
      subCategory: subCategory,
      uom: uom
    });
  } 
}






  searchItem(event: any) {
    const searchValue = event.target.value.toLowerCase();
    if (this.itemList && this.itemList.length > 0 ) {
      if (event.target.value) {
        this.filteredItemList = this.itemCategoryList.filter(obj => obj.item_name.toLowerCase().includes(searchValue));

      }else{
        this.filteredItemList = this.itemCategoryList;
      }
    }
  }



  searchBrand(event: any) {
    
    const searchValue = event.target.value.toLowerCase();
    if (this.brandList && this.brandList.length > 0 ) {
      if (event.target.value) {
        this.filteredBrandList = this.brandList.filter(obj => obj.brand_name.toLowerCase().includes(searchValue));

      }else{
        this.filteredBrandList = this.brandList;
      }
    }
  
  }




  


  filteredOptions: Observable<string[]>;
  ngOnInit(): void {


    // Retrieve user permissions from local storage and parse them as JSON
    this.permissions = JSON.parse(localStorage.getItem('loginData'))

    // Extract specific permissions related to ParentChildchecklist from the parsed data
    const rolePermission = this.permissions.user.role
    const GET_ROLE_API_PERMISSION = `/roles/role/${rolePermission}`;  
      this.httpService.GET(GET_ROLE_API_PERMISSION,{}).subscribe({
        next: (resp: any) => {
          this.viewPermission=resp.dashboard_permissions[0].ParentChildchecklist[18].childList[0].isSelected;
    this.addPermission=resp.dashboard_permissions[0].ParentChildchecklist[18].childList[1].isSelected;
    this.editPermission=resp.dashboard_permissions[0].ParentChildchecklist[18].childList[2].isSelected;
          
        },
        error: (err) => {
          console.log(err)
        }
      });

      this.siteList= this.permissions.user.sites
      console.log("SiteSelect", this.siteList);

    this.getList();
    this.addItem();
    this.getPurchaseList({ filter_by: this.filter_by, filter_value: this.statusOption.value });


  
    
  }
}
