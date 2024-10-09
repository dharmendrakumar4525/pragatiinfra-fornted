import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  PURCHASE_ORDER_API,
  DMRPURCHASE_ORDER_API,
  RATE_COMPARATIVE_DETAIL_API,
  RATE_COMPARATIVE_API,
  GET_BRAND_API,
  GET_SITE_API,
  GET_VENDOR_API,
  ESIGN_UPLOAD_API,
  ITEM_API,
} from '@env/api_path';
import { RequestService } from '@services/https/request.service';
import { ESignComponent } from '../e-sign/e-sign.component';
import { BillingAddressPopupComponent } from '../billing-address-popup/billing-address-popup.component';
import { MailingAddressPopupComponent } from '../mailing-address-popup/mailing-address-popup.component';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import { isEmpty } from 'lodash';
import { forkJoin, of, retry, switchMap } from 'rxjs';
import { ORG_REQUEST_API } from '@env/api_path';
import { AuthService } from '@services/auth/auth.service';
import { UsersService } from '@services/users.service';
import { environment } from '@env/environment';

@Component({
  selector: 'app-purchase-order-update',
  templateUrl: './purchase-order-update.component.html',
  styleUrls: ['./purchase-order-update.component.scss'],
})
export class PurchaseOrderUpdateComponent implements OnInit {
  term_condition = new FormControl();
  mail_section = new FormControl();
  validityDate = new FormControl('', [Validators.required]);
  minDate = new Date();
  maxDate = new Date(new Date().setMonth(new Date().getMonth() + 12));
  poDetails: any;
  load: boolean;
  esignImage: any;
  brandList: any;
  vendorFiles:{ [key: string]: any } = {};;
  fileUploaded=true;
  purchaseOrderNumber: number;
  purchaseOrderList: any[] = [];
  permissions: any;
  ItemList: any;
  files:any[]=[];
  pendingVendorFiles:any[]=[];
  vendorAttachmentLength:number;
  rateApproval:any;
  vendorList: any;
  siteList: any;
  viewPermission: any;
  editPermission: any;
  addPermission: any;
  deletePermission: any;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private httpService: RequestService,
    private snack: SnackbarService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private auth: AuthService,
    private userService: UsersService
  ) {}

  updateItemsWithDetails(itemList) {
    const itemIds = this.poDetails.items.map((item) => item.item.item_id);
    const itemDetailsMap = itemList.reduce((map, item) => {
      map[item._id] = item;
      return map;
    }, {});

    this.poDetails.items = this.poDetails.items.map((item) => {
      const itemId = item.item.item_id;
      const details = itemDetailsMap[itemId] || {};

      return {
        ...item,
        item: {
          ...item.item,
          categoryDetail: details.categoryDetail || {},
          subCategoryDetail: details.subCategoryDetail || {},
          uomDetail: details.uomDetail || {},
          item_name: details.item_name || item.item.item_name,
          brandName: details.brandName || item.item.brandName,
          attachment: details.attachment || item.item.attachment,
        },
      };
    });
    console.log('checkDats', this.poDetails);
  }

  updateVendorWithDetails(vendorList) {
   

    const matchingVendor = vendorList.find(
      (vendor) =>
        vendor.vendor_name === this.poDetails.vendor_detail.vendor_name
    );

    if (!matchingVendor) {
      console.error('No matching vendor found.');
      return null;
    }

   
    const vendor_detail = {
      address: {
        street_address: matchingVendor.address.street_address,
        street_address2: matchingVendor.address.street_address2,
        state: matchingVendor.address.state,
        city: matchingVendor.address.city,
        zip_code: matchingVendor.address.zip_code,
        country: matchingVendor.address.country,
      },
      contact_person: matchingVendor.contact_person,
      phone_number: matchingVendor.phone_number,
      gst_number: matchingVendor.gst_number,
      pan_number: matchingVendor.pan_number,
      email: matchingVendor.email,
      payment_terms: matchingVendor.payment_terms,
      terms_condition: matchingVendor.terms_condition,
      vendor_name: matchingVendor.vendor_name,
      dialcode: matchingVendor.dialcode,
    };

    this.poDetails.vendor_detail=vendor_detail;
    console.log(this.poDetails.vendor_detail);
  }

  updateSiteWithDetails(siteList) {
    const matchingSite = siteList.find(
      (site) => site.site_name === this.poDetails.delivery_address.company_name
    );

    if (!matchingSite) {
      console.error('No matching site found.');
      return;
    }

    const delivery_address = {
      company_name: matchingSite.site_name,
      site_code: matchingSite.code,
      gst_number: '',
      pan_card: '',
      contact_person: matchingSite.store_manager,
      contact_number: matchingSite.store_manager_phone_number,
      email: matchingSite.site_manager_email,
      street_address: matchingSite.address.street_address,
      street_address2: matchingSite.address.street_address2,
      state: matchingSite.address.state,
      city: matchingSite.address.city,
      zip_code: matchingSite.address.zip_code,
      country: matchingSite.address.country,
    };

    this.poDetails.delivery_address = delivery_address;
  }


 combineAddress(address) {
    // Extract values from the address object
    const {
      street_address,
      street_address2,
      state,
      city,
      zip_code,
      country,
    } = address;
  
    // Create an array of address parts, filtering out empty or falsy values
    const addressParts = [
      street_address,
      street_address2,
      state,
      city,
      zip_code,
      country,
    ].filter(part => part && part.trim() !== '');
  
    // Join the filtered parts with a comma and return the result
    return addressParts.join(', ');
  }
  
  
  

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

        // Fetch user permissions and initialize component state
        this.httpService.GET(GET_ROLE_API_PERMISSION, {}).subscribe({
          next: (resp: any) => {
            this.viewPermission =
              resp.dashboard_permissions[0].ParentChildchecklist[22].childList[0].isSelected;
            this.addPermission =
              resp.dashboard_permissions[0].ParentChildchecklist[22].childList[1].isSelected;
            this.editPermission =
              resp.dashboard_permissions[0].ParentChildchecklist[22].childList[2].isSelected;
            this.deletePermission =
              resp.dashboard_permissions[0].ParentChildchecklist[22].childList[3].isSelected;
          },
          error: (err) => {
            console.log(err);
          },
        });

        // Fetch brand list and item list
        Promise.all([
          this.getBrandList(),
          this.getItemList(),
          this.getVendorList(),
          this.getSiteList(),
        ])
          .then(([brandList, itemList, vendorList, siteList]) => {
            this.brandList = brandList;
            this.ItemList = itemList;
            this.vendorList = vendorList;
            this.siteList = siteList;


            // Subscribe to route parameters to retrieve the id parameter
            this.route.params.subscribe((params) => {
              if (params['id']) {
                this.httpService
                  .GET(`${PURCHASE_ORDER_API}/detail`, { _id: params['id'] })
                  .subscribe((res) => {
                    this.poDetails = res.data;
                    this.getRateApprovalList(res.data.rate_approval_id);
                    
                  
                    console.log("checking rateApproval",this.rateApproval);
                    console.log('check response', res.data);
                    this.mail_section.patchValue(this.poDetails.vendor_message);
                    this.term_condition.patchValue(
                      this.poDetails.terms_condition
                    );
                      this.vendorFiles=res.data.vendor_files;
                    // Update items with details once purchase order details are fetched
                    this.updateItemsWithDetails(this.ItemList);
                    this.updateSiteWithDetails(this.siteList);
                    this.updateVendorWithDetails(this.vendorList);
                  });
              }
            });
          })
          .catch((err) => {
            console.error('Error fetching data', err);
          });
      } else {
        this.snack.notify('Invalid Credentials - User Details not Valid', 1);
        this.auth.removeUser();
        this.userService.updateLogin('logout');
        this.router.navigate(['/login']);
      }
    });
  }

  async updateStatus(status: any) {
    if (status == 'revise') {
      try {
        const response = await this.httpService
          .GET(`${RATE_COMPARATIVE_DETAIL_API}`, {
            _id: this.poDetails.rate_approval_id,
          })
          .toPromise();
        const requestApprovalDocument = {
          ...response.data.details,
          status: 'revise',
        };
        //console.log(requestApprovalDocument);
        await this.httpService
          .PUT(`${RATE_COMPARATIVE_API}`, requestApprovalDocument)
          .toPromise();
        await this.httpService
          .DELETE(`${PURCHASE_ORDER_API}`, { _id: this.poDetails._id })
          .toPromise();
        this.snack.notify('Detail has been updated', 1);
        this.router.navigate(['/purchase-order']);
        this.load = false;
      } catch (err) {
        this.load = false;
        if (err.errors && !isEmpty(err.errors)) {
          const errMessage =
            '<ul>' +
            Object.values(err.errors)
              .map((objData) => `<li>${objData[0]}</li>`)
              .join('') +
            '</ul>';
          this.snack.notifyHtml(errMessage, 2);
        } else {
          this.snack.notify(err.message, 2);
        }
      }

      return;
    }

    // For other status updates
    let requestData: any = {};
    requestData['status'] = status;
    requestData['_id'] = this.poDetails._id;

    this.load = true;
    // Send PUT request to update the purchase order
    this.httpService.PUT(PURCHASE_ORDER_API, requestData).subscribe({
      next: (resp: any) => {
        this.load = false;
        this.snack.notify('Record has been updated.', 1);
        this.router.navigate(['/purchase-order']);
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

  openEsignModal() {
    // Check if validity date is provided
    if (!this.validityDate.valid) {
      this.snack.notify('Please provide validity date', 2);
      return;
    }
    // Open e-sign modal
    const esignPopup = this.dialog.open(ESignComponent, {
      maxWidth: '80vw',
      maxHeight: '80vh',
      autoFocus: false,
    });
    // Handle modal closure
    esignPopup.afterClosed().subscribe((result: any) => {
      if (result && result.option == 1) {
        // Assign signature data to poDetails.sign property
        this.poDetails.sign = result.data;
        // Proceed with creating the order
        this.createOrder();
      }
    });
  }

  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  getFormattedBrandNames(brandName): string {
    console.log('see BrandName', brandName);
    if (this.isArray(brandName)) {
      return (brandName as string[])
        .map((brand) => {
          return brand.trim() === '' ? 'others' : this.myBrandName(brand);
        })
        .join(' / ');
    } else {
      return brandName.trim() === ''
        ? 'others'
        : this.myBrandName(brandName as string);
    }
  }

  createOrder(): any {
    if (!this.validityDate.valid) {
      this.validityDate.markAsTouched();
      return false;
    }

    if(!this.fileUploaded)
    {
  this.snack.notify("Files not Uploaded, Upload the files",2)
  return false;
    }

    if(this.vendorAttachmentLength > Object.keys (this.vendorFiles).length)
      {
    this.snack.notify("All Vendor Quotation Mandatary, Upload the remaining",2)
    return false;
      }

    let requestData: any = this.poDetails;
    //console.log("--requestDAta--",requestData)
    for (let i = 0; i < requestData.items.length; i++) {
      const brandName = requestData.items[i].item.brandName;
      requestData.items[i].item['brandName'] = brandName;
    }

    console.log('---------------');
    console.log('this.purchaseOrderNumber', this.purchaseOrderNumber);
    console.log('---------------');

    const companyNameToMatch = this.poDetails.billing_address.company_name
      .toLowerCase()
      .trim();

    console.log('checking company Name', companyNameToMatch);
    if (companyNameToMatch === '') {
      this.snack.notifyHtml('Select the Billing Address', 2);
      return;
    }

    const filteredList = this.purchaseOrderList.filter((item) => {
      const itemCompanyName = item.billing_address.company_name
        ? item.billing_address.company_name.toLowerCase().trim()
        : '';
      return itemCompanyName.includes(companyNameToMatch);
    });

    this.purchaseOrderNumber = filteredList.length + 1;
    console.log('-------------');
    console.log('this.poDetails.po_number', this.poDetails.po_number);
    console.log('-------------');
    requestData['vendor_files']=this.vendorFiles;
    requestData['po_number'] = this.poDetails.po_number;
    requestData['approved_by'] = this.permissions.user.name;
    requestData['status'] = 'ApprovalPending';
    requestData['due_date'] = this.validityDate.value;
    requestData['vendor_message'] = this.mail_section.value;
    requestData.vendor_detail.terms_condition = this.term_condition.value;
    this.load = true;
    console.log('checking payload________________________', requestData);
   
    this.httpService
      .PUT(PURCHASE_ORDER_API, requestData)
      .pipe(
        // Use switchMap to map the result of the PUT request to the next observable
        switchMap((resp: any) => {
          // Assuming this is the result you want to use in the POST request
          let sendData = {
            '0': { ...this.poDetails },
          };

          // Remove 'status' property
          if ('status' in sendData['0']) {
            delete sendData['0'].status;
          }

          console.log('---------------');
          console.log(sendData);
          console.log('---------------');
          // Create an observable for the POST request
          const postRequest = this.httpService.POST(
            DMRPURCHASE_ORDER_API,
            sendData
          );

          // Combine the observables using forkJoin
          return forkJoin([of(resp), postRequest]);
        })
      )
      .subscribe({
        next: ([putResp, postResp]: [any, any]) => {
          // Both requests were successful
          this.load = false;
          //console.log(putResp, postResp);

          this.snack.notify('purchase Order has been generated.', 1);
          this.router.navigate(['/purchase-order']);
        },
        error: (err: any) => {
          // Handle errors from either PUT or POST request
          this.load = false;
          if (err.errors && !isEmpty(err.errors)) {
            let errMessage = '<ul>';
            for (let e in err.errors) {
              let objData = err.errors[e];
              errMessage += `<li>${objData[0]}</li>`;
            }
            errMessage += '</ul>';
            this.snack.notifyHtml(errMessage, 2);
            this.router.navigate(['/purchase-order']);
          } else {
            this.snack.notify(err.message, 2);
            this.router.navigate(['/purchase-order']);
          }
        },
      });
  }

  getBrandNamesByIds(brandIds): string {
    // Create a map for quick lookup of brand names by their IDs
    console.log('check brand', brandIds);
    const brandMap = this.brandList.reduce((map, brand) => {
      map[brand._id] = brand.brand_name;
      return map;
    }, {} as Record<string, string>);

    // Map the brand IDs to their names and join them with '/'
    return brandIds
      .map((id) => brandMap[id])
      .filter((name) => name) // filter out any undefined names if ID does not exist
      .join(' / ');
  }

  billingAddressPopup() {
    // Open billing address popup
    const address = this.dialog.open(BillingAddressPopupComponent, {
      autoFocus: false,
    });

    // Handle popup closure
    address.afterClosed().subscribe((result: any) => {
      console.log('-------------');
      console.log('result', result);
      console.log('-------------');
      if (result && result.type && result.type == 1) {
        //console.log(result.data)

        // Update billing address details in poDetails object
        this.poDetails.billing_address.company_name = result.data.companyName;
        this.poDetails.billing_address.code = result.data.code;
        this.poDetails.billing_address.street_address =
          result.data.address.street_address;
        this.poDetails.billing_address.street_address2 =
          result.data.address.street_address2;
        this.poDetails.billing_address.city = result.data.address.city;
        this.poDetails.billing_address.state = result.data.address.state;
        this.poDetails.billing_address.gst_number = result.data.gst_number;
        this.poDetails.billing_address.pan_card = result.data.pan_number;
        this.poDetails.billing_address.contact_person =
          result.data.contact_person + '-' + result.data.phone_number;

        // const purchaseOrder = this.http.get<any>(`${environment.api_path}${PURCHASE_ORDER_API}`);
        // this.httpService.multipleRequests([purchaseOrder], {}).subscribe(res => {
        //   if (res) {
        //     this.purchaseOrderList = res[0].data;
        //     console.log("--purchaseOrderListdd--",this.purchaseOrderList);
        //     console.log("--this.poDetails.billing_address.company_name--",this.poDetails.billing_address.company_name)
        // const filteredList = this.purchaseOrderList.filter(item => item.billing_address.company_name.includes(this.poDetails.billing_address.company_name));
        // console.log("--filteredList--",filteredList)
        // this.purchaseOrderNumber = filteredList.length+1;
        // this.poDetails.po_number = this.purchaseOrderNumber;
        // console.log("==this.purchaseOrderNumber==",this.purchaseOrderNumber);
        // console.log("==this.poDetails.po_number==",this.poDetails.po_number);

        const purchaseOrder = this.http.get<any>(
          `${environment.api_path}${PURCHASE_ORDER_API}`
        );
        this.httpService
          .multipleRequests([purchaseOrder], {})
          .subscribe((res) => {
            if (res) {
              this.purchaseOrderList = res[0].data;
              console.log(
                '----purchaseOrderListdd----',
                this.purchaseOrderList
              );
              console.log('----purchaseOrderListdd----');
              console.log(
                '--this.poDetails.billing_address.company_name--',
                this.poDetails.billing_address.company_name
              );

              const companyNameToMatch =
                this.poDetails.billing_address.company_name
                  .toLowerCase()
                  .trim();

              const filteredList = this.purchaseOrderList.filter((item) => {
                const itemCompanyName = item.billing_address.company_name
                  ? item.billing_address.company_name.toLowerCase().trim()
                  : '';
                return itemCompanyName.includes(companyNameToMatch);
              });

              console.log('--filteredList--', filteredList);

              this.purchaseOrderNumber = filteredList.length + 1;
              this.poDetails.po_number = `${
                this.poDetails.billing_address.code
              }/${
                this.poDetails.delivery_address.site_code
              }/${this.getCurrentFinancialYearShort()}/${this.convertToFiveDigitNumber(
                this.purchaseOrderNumber
              )}`;
              console.log('-------------');
              console.log('this.poDetails.po_number', this.poDetails.po_number);
              console.log('-------------');
            }
          });
      }
    });
  }

  onFilesSelected(event: any): void {
    const fileList: FileList = event.target.files;
    console.log('file', fileList);
    if(fileList.length+Object.keys (this.vendorFiles).length+this.files.length >this.vendorAttachmentLength)
    {
      
      this.snack.notify(`only ${this.vendorAttachmentLength} files Required`,2);
      return;
    }
    if (fileList.length > 0) {
      const files = Array.from(fileList);

      this.files = files;
      this.fileUploaded=false;

      console.log(this.files);
    }
  }

  removeFile(file: File): void {
    const updatedFiles = this.files.filter((f: File) => f.name !== file.name);
    console.log('there', updatedFiles);
    this.files = updatedFiles;
    if(this.files.length<=0)
    {
       this.fileUploaded=true;
    }
  }

  uploadFiles(){

    const formData = this.convertToFormData(this.files);
    this.load = true;
    this.httpService.POST(ESIGN_UPLOAD_API, formData).subscribe({
      next: (res) => {
        console.log("check response", res);
        this.vendorFiles = { ...this.vendorFiles, ...res.data.filename };
        this.files=[];
        this.rateApproval['files'] = this.vendorFiles;
        console.log("check Payload here",  this.rateApproval);
  
        // Second API call to update the rate comparative data
       
        this.httpService.PUT("/rate-approval/Upload-files", this.rateApproval).subscribe({
          next: (res) => {
            this.fileUploaded=true;

            this.snack.notify('File Uploaded Successfully', 1);
            
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

  mailingAddressPopup() {
    const address = this.dialog.open(MailingAddressPopupComponent, {
      autoFocus: false,
    });
    address.afterClosed().subscribe((result: any) => {});
  }
  getBrandList() {
    return this.httpService
      .GET(GET_BRAND_API, {})
      .toPromise()
      .then((res) => res.data);
  }

  getItemList() {
    return this.httpService
      .GET(ITEM_API, {})
      .toPromise()
      .then((res) => res.data);
  }

  getVendorList() {
    return this.httpService
      .GET(GET_VENDOR_API, {})
      .toPromise()
      .then((res) => res.data);
  }

  getRateApprovalList(_id: string): void {
    console.log(_id);
    this.httpService
      .GET(`${RATE_COMPARATIVE_DETAIL_API}`, { _id: _id })
      .subscribe({
        next: (res) => {
          this.rateApproval = res.data.details;
        
          // Assuming rateApproval.vendors_total is an array
          if (this.rateApproval && this.rateApproval.vendors_total) {
            this.vendorAttachmentLength = this.rateApproval.vendors_total.length;
            const vendorArray=this.createVendorArray(this.rateApproval.vendors_total);
            const finalArray=this.getVendorsNotInObject(vendorArray, this.rateApproval.files)
            this.pendingVendorFiles=finalArray;
            console.log("check Final Array",finalArray);
          } else {
            this.vendorAttachmentLength = 0; // Set to 0 if the array doesn't exist
          }
          console.log("checking here the ",this.rateApproval);
        },

        
        error: (err) => {
          console.error('Error fetching rate approval:', err);
          this.vendorAttachmentLength = 0; // Set to 0 in case of an error
        }
      });
  }
   getVendorNamesString(array: any[]): string {
    return array.map(item => item.vendor_name).join(', ');
  }


  createVendorArray(items: any[]) {
    console.log(this.vendorList);
    return items.map(item => {
      const vendorInfo = this.vendorList.find(vendor => vendor._id === item.vendor_id);
  
      if (vendorInfo) {
        return {
          code: vendorInfo.code.toString(),
          _id :vendorInfo._id,
          vendor_name: vendorInfo.vendor_name
        };
      } else {
        return {
          vendor_code: 'Unknown',
          vendor_name: 'Unknown'
        };
      }
    });
  }
  
  
  getVendorsNotInObject(vendorArray: any[], vendorObject: any) {
    console.log("checking vendorArray", vendorArray);
    console.log("checking Object", vendorObject);

    // Create an array of keys from vendorObject
    const vendorCodes = Object.keys(vendorObject);
     console.log(vendorCodes);
    // Filter vendors whose vendor_code does not exist in vendorCodes
    return vendorArray.filter(vendor => 
        !vendorCodes.includes(vendor.code)
    );

    
}



  getSiteList() {
    return this.httpService
      .GET(GET_SITE_API, {})
      .toPromise()
      .then((res) => res.data);
  }
  myBrandName(brandId: any) {
    // console.log("mybrandfunction",brandId)
    let brand = this.brandList.filter((brand) => brand._id == brandId);
    // console.log(brand)
    return brand[0].brand_name;
  }

  getCurrentFinancialYearShort() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // getMonth() returns 0-based month

    // Financial year starts in April
    if (month >= 4) {
      return `${year.toString().slice(-2)} - ${(year + 1)
        .toString()
        .slice(-2)}`;
    } else {
      return `${(year - 1).toString().slice(-2)} - ${year
        .toString()
        .slice(-2)}`;
    }
  }

  convertToFiveDigitNumber(number) {
    return number.toString().padStart(4, '0');
  }
}
