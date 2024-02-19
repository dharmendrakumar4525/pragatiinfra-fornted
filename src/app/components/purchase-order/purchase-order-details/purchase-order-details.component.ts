import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { GET_BRAND_API, PURCHASE_ORDER_API } from '@env/api_path';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import { saveAs } from 'file-saver';
import { MailPopupComponent } from '../mail-popup/mail-popup.component';

@Component({
  selector: 'app-purchase-order-details',
  templateUrl: './purchase-order-details.component.html',
  styleUrls: ['./purchase-order-details.component.scss']
})
export class PurchaseOrderDetailsComponent implements OnInit {
  term_condition = new FormControl();
  mail_section = new FormControl();
  validityDate = new FormControl();
  minDate = new Date();
  maxDate = new Date(new Date().setMonth(new Date().getMonth() + 12));
  poDetails: any;
  load: boolean;
  downloadLoading = false;
  pageId: any;
  esignImage:any;
  brandList: any;
  constructor(
    private route: ActivatedRoute,
    private httpService: RequestService, private dialog: MatDialog,

  ) {
    this.getBrandList();
    this.route.params.subscribe(params => {
      this.pageId = params['id'];
      // console.log(this.pageId)
      if (params['id']) {
        this.httpService.GET(`${PURCHASE_ORDER_API}/detail`, { _id: params['id'] }).subscribe(res => {
          this.poDetails = res.data;
          console.log(this.poDetails)
          this.esignImage=this.poDetails.sign;
          this.validityDate.patchValue(this.poDetails.due_date);
          this.term_condition.patchValue(this.poDetails.terms_condition);
          this.mail_section.patchValue(this.poDetails.vendor_message);
          this.mail_section.disable();
          this.term_condition.disable();
          this.validityDate.disable();
        })
      }
    });
  }


  // Method to download the PDF of the purchase order
  downloadPdf() {
    // Set the download loading flag to true
    this.downloadLoading = true;

    // Request the server to generate the PDF
    this.httpService.GETPDF('generate/pdf', {
      template: "po",  // Specify the template type as 'po' for purchase order
      id: this.pageId, // Provide the ID of the purchase order to generate its PDF
    }).subscribe((res: any) => {
      // Once the PDF is received from the server

      // Set the download loading flag to false
      this.downloadLoading = false;

      // Create a blob from the PDF data received
      var blob = new Blob([res], { type: 'application/pdf' });

      // Generate a unique ID based on the current timestamp
      let id = new Date().getTime();

      // Save the PDF blob with a filename including the unique ID
      saveAs(blob, `po-${id}.pdf`);
    });
  }

  sendEmail(data) {
    this.downloadLoading = true;
    this.httpService.POST('/mail/template', {
      template: "po",
      id: this.pageId,
      mails: data
    }).subscribe((res: any) => {
      this.downloadLoading = true;

    });
  }

  enterMail() {
    const esignPopup = this.dialog.open(MailPopupComponent, {
      maxWidth: '80vw',
      maxHeight: '80vh',
      autoFocus: false,
      data: this.poDetails
    });
    esignPopup.afterClosed().subscribe((result: any) => {
      if (result && result.option == 1) {
        this.sendEmail(result.data)
      }
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
  ngOnInit(): void {

  }




}
