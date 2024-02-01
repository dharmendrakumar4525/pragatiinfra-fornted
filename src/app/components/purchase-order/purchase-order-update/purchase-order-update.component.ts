import { HttpClient } from '@angular/common/http';
import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PURCHASE_ORDER_API ,DMRPURCHASE_ORDER_API, RATE_COMPARATIVE_DETAIL_API, RATE_COMPARATIVE_API, GET_BRAND_API} from '@env/api_path';
import { RequestService } from '@services/https/request.service';
import { ESignComponent } from '../e-sign/e-sign.component';
import { BillingAddressPopupComponent } from '../billing-address-popup/billing-address-popup.component';
import { MailingAddressPopupComponent } from '../mailing-address-popup/mailing-address-popup.component';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import { isEmpty } from 'lodash';
import { forkJoin, of, switchMap } from 'rxjs';
@Component({
  selector: 'app-purchase-order-update',
  templateUrl: './purchase-order-update.component.html',
  styleUrls: ['./purchase-order-update.component.scss']
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
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private httpService: RequestService,
    private snack: SnackbarService,
    private formBuilder: FormBuilder,
  ) {
      //console.log(this.brandList);
    this.getBrandList();
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.httpService.GET(`${PURCHASE_ORDER_API}/detail`, { _id: params['id'] }).subscribe(res => {
          this.poDetails = res.data;
          console.log(this.poDetails)
          this.mail_section.patchValue(this.poDetails.vendor_message);
          this.term_condition.patchValue(this.poDetails.terms_condition);
        })
      }
    });
  }

  ngOnInit(): void {

  }

  async updateStatus(status: any) {

    if(status=="revise"){
      try {
        const response = await this.httpService.GET(`${RATE_COMPARATIVE_DETAIL_API}`, { _id: this.poDetails.rate_approval_id }).toPromise();
        const requestApprovalDocument = { ...response.data.details, status: 'revise' };
        console.log(requestApprovalDocument);
        await this.httpService.PUT(`${RATE_COMPARATIVE_API}`, requestApprovalDocument).toPromise();
        await this.httpService.DELETE(`${PURCHASE_ORDER_API}`, {_id:this.poDetails._id}).toPromise();
        this.snack.notify("Detail has been updated", 1);
        this.router.navigate(['/purchase-order']);
        this.load = false;
      } catch (err) {
        this.load = false;
        if (err.errors && !isEmpty(err.errors)) {
          const errMessage = '<ul>' + Object.values(err.errors).map(objData => `<li>${objData[0]}</li>`).join('') + '</ul>';
          this.snack.notifyHtml(errMessage, 2);
        } else {
          this.snack.notify(err.message, 2);
        }
      }

    return;
  }



    let requestData: any = {};
    requestData['status'] = status;
    requestData['_id'] = this.poDetails._id;

    this.load = true;
    this.httpService.PUT(PURCHASE_ORDER_API, requestData).subscribe({
      next: (resp: any) => {
        this.load = false;
        this.snack.notify("Record has been updated.", 1);
        this.router.navigate(['/purchase-order'])

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
    });
  }

  openEsignModal() {
    if(!this.validityDate.valid){
      this.snack.notify("Please provide validity date",2);
      return;
    }
    const esignPopup = this.dialog.open(ESignComponent, {
      maxWidth: '80vw',
      maxHeight: '80vh',
      autoFocus: false
    });
    esignPopup.afterClosed().subscribe((result: any) => {
      if (result && result.option == 1) {
        this.poDetails.sign = result.data;
        this.createOrder();
      }
    });

  }

  createOrder(): any {
    if (!this.validityDate.valid) {
      this.validityDate.markAsTouched();
      return false;
    }
    let requestData: any = this.poDetails;
    for (let i = 0; i < requestData.items.length; i++) {
      const brandName =  this.myBrandName(requestData.items[i].item.brandName);
      requestData.items[i].item['brandName'] = brandName;
    }
    requestData['status'] = 'approved';
    requestData['due_date'] = this.validityDate.value;
    requestData['vendor_message'] = this.mail_section.value;
    requestData.vendor_detail.terms_condition = this.term_condition.value;
    this.load = true;
    this.httpService.PUT(PURCHASE_ORDER_API, requestData).pipe(
      // Use switchMap to map the result of the PUT request to the next observable
      switchMap((resp: any) => {
        // Assuming this is the result you want to use in the POST request
        let sendData = {
          '0': { ...this.poDetails }
        };

        // Remove 'status' property
        if ('status' in sendData['0']) {
          delete sendData['0'].status;
        }

        // Create an observable for the POST request
        const postRequest = this.httpService.POST(DMRPURCHASE_ORDER_API, sendData);

        // Combine the observables using forkJoin
        return forkJoin([of(resp), postRequest]);
      })
    ).subscribe({
      next: ([putResp, postResp]: [any, any]) => {
        // Both requests were successful
        this.load = false;
        console.log(putResp, postResp);

        this.snack.notify("purchase Order has been generated.", 1);
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
        } else {
          this.snack.notify(err.message, 2);
        }
      }
    });

  }

  billingAddressPopup() {
    const address = this.dialog.open(BillingAddressPopupComponent, {
      autoFocus: false
    });
    address.afterClosed().subscribe((result: any) => {
      if (result && result.type && result.type == 1) {
        this.poDetails.billing_address.company_name = result.data.company_name;
        this.poDetails.billing_address.street_address = result.data.street_address;
        this.poDetails.billing_address.street_address2 = result.data.street_address2;
        this.poDetails.billing_address.city = result.data.city;
        this.poDetails.billing_address.state = result.data.state;
        this.poDetails.billing_address.gst_number = result.data.gst_number;
        this.poDetails.billing_address.pan_card = result.data.pan_card;

      }
    });
  }
  mailingAddressPopup() {
    const address = this.dialog.open(MailingAddressPopupComponent, {
      autoFocus: false
    });
    address.afterClosed().subscribe((result: any) => {

    });
  }
  getBrandList(){
    //console.log("hi")
    this.httpService.GET(GET_BRAND_API, {}).subscribe(res => {
      this.brandList=res.data
      //console.log(this.brandList);
    })
  }
  myBrandName(brandId:any){
    console.log("mybrandfunction",brandId)
    let brand=this.brandList.filter(brand=>brand._id==brandId)
    console.log(brand)
    return brand[0].brand_name;
  } 

}
