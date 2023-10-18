import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { PURCHASE_ORDER_API } from '@env/api_path';
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

  constructor(
    private route: ActivatedRoute,
    private httpService: RequestService, private dialog: MatDialog,

  ) {

    this.route.params.subscribe(params => {
      this.pageId = params['id'];
      if (params['id']) {
        this.httpService.GET(`${PURCHASE_ORDER_API}/detail`, { _id: params['id'] }).subscribe(res => {
          this.poDetails = res.data;
          this.validityDate.patchValue(this.poDetails.due_date);
          this.term_condition.patchValue(this.poDetails.vendor_detail.terms_condition);
          this.mail_section.patchValue(this.poDetails.vendor_message);
          this.mail_section.disable();
          this.term_condition.disable();
          this.validityDate.disable();
        })
      }
    });
  }



  downloadPdf() {

    this.downloadLoading = true;
    this.httpService.GETPDF('generate/pdf', {
      template: "po",
      id: this.pageId
    }).subscribe((res: any) => {
      this.downloadLoading = false;
      var blob = new Blob([res], { type: 'application/pdf' });
      let id = new Date().getTime();
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

  ngOnInit(): void {

  }




}
