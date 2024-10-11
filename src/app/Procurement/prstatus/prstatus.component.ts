import { Component, OnInit } from '@angular/core';
import {
  PURCHASE_REQUEST_API,
  RATE_COMPARATIVE_API,
  RATE_COMPARATIVE_DETAIL_API,
  PURCHASE_ORDER_API,
} from '@env/api_path';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import { isEmpty } from 'lodash';
import { saveAs } from 'file-saver';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-prstatus',
  templateUrl: './prstatus.component.html',
  styleUrls: ['./prstatus.component.css'],
})
export class PrstatusComponent implements OnInit {
  prList: any;
  allprList: any = [];
  downloadLoading: boolean;
  constructor(
    private httpService: RequestService,
    private snack: SnackbarService
  ) {}

  filterRecords(event: any) {
    //console.log(this.allpoArray,event.target.value);

    if (event.target.value) {
      console.log('as');
       

        let target= event.target.value.toLowerCase();
        console.log(this.allprList);
      this.prList = this.allprList.filter((obj) => {
        return obj.title.toLowerCase().includes(target);
      });
      console.log(this.prList);
    } else {
      this.prList = this.allprList;
    }
  }

  dateFilter(event: MatDatepickerInputEvent<Date>) {
    const eventdate = new Date(event.value);
    if (event.value) {
      this.prList = this.allprList.filter((obj) => {
        const reqdate = new Date(obj.expected_delivery_date);
        return reqdate.getTime() == eventdate.getTime();
      });
    } else {
      this.prList = this.allprList;
    }
  }
  getList() {
    this.httpService.GET(PURCHASE_ORDER_API, {}).subscribe((res) => {
      console.log(res.data);
      this.prList = res.data;
      this.allprList = res.data;
      // const date2 = new Date(this.allprList[1].expected_delivery_date);
      //console.log(res.data,date2.getUTCDate());
    });
  }

  downloadPOPdf(pageId, item) {
    console.log(item);
    this.downloadLoading = true;
    this.httpService
      .GETPDF('generate/pdf', {
        template: 'po',
        id: pageId,
      })
      .subscribe((res: any) => {
        this.downloadLoading = false;
        var blob = new Blob([res], { type: 'application/pdf' });
        let id = new Date().getTime();
        //saveAs(blob, `po-${id}.pdf`);
        saveAs(blob, `po-${item.po_number}__${item.vendor_detail.vendor_name}  .pdf`);
      });
  }

  downloadRCPdf(pageId, item) {
    console.log(item);
    console.log(pageId);
    this.downloadLoading = true;
    this.httpService
      .GETPDF('generate/rcpdf', {
        template: 'rc',
        id: pageId,
      })
      .subscribe((res: any) => {
        this.downloadLoading = false;
        var blob = new Blob([res], { type: 'application/pdf' });
        let id = new Date().getTime();
        saveAs(blob, `rc-${item.delivery_address.site_code}_${item.purchase_request_number}_${item.title}.pdf`);
          
      });
  }

  downloadPRPdf(rateApprovalId, item) {
    console.log(item);
    console.log(rateApprovalId);
    this.downloadLoading = true;
    this.httpService
      .GET(`${RATE_COMPARATIVE_DETAIL_API}`, { _id: rateApprovalId })
      .subscribe({
        next: (res) => {
          const purchase_id = res.data.details.purchase_request_id;
          console.log('lets see id', res.data.details);

          this.httpService
            .GETPDF('generate/prpdf', {
              template: 'pr',
              id: purchase_id,
            })
            .subscribe((res: any) => {
              this.downloadLoading = false;
              var blob = new Blob([res], { type: 'application/pdf' });
              let id = new Date().getTime();
              saveAs(blob, `pr-${item.delivery_address.site_code}_${item.purchase_request_number}_${item.title}.pdf`);
            });
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  downloadVendorAcceptance(urls: string[]): void {
    const url: string = urls[0];
    console.log(url);

    // Create a temporary anchor element
    const a: HTMLAnchorElement = document.createElement('a');
    
    // Set the href to the file URL and the download attribute to suggest downloading
    a.href = url;
    a.download = url.split('/').pop() || 'download'; // Set a default name if not available

    // Force the download by simulating a click on the anchor element
    a.target = '_blank'; // This ensures it does not open in the same tab
    document.body.appendChild(a);  // Append the anchor to the DOM
    a.click();  // Simulate the click to download the file
    document.body.removeChild(a);  // Clean up by removing the anchor element
}



  downloadVendorQuotations(filesObject: any) {
    // Downloads vendor quotations by extracting URLs from the object and passing them to downloadFiles
    const fileUrlsArray: string[] = [];

    // Extract file URLs from the object
    for (const key in filesObject) {
      if (filesObject.hasOwnProperty(key)) {
        const fileUrl = filesObject[key];
        fileUrlsArray.push(fileUrl);
      }
    }

    // Pass the array of URLs to download all files
    this.downloadFiles(fileUrlsArray);
  }

  downloadFiles(fileLinks: string[]) {
    // Iterates over all the file URLs and triggers download for each
    fileLinks.forEach((link) => {
      const a = document.createElement('a');
      a.href = link;
      a.download = '';  // Optionally, you can set a specific file name here
      document.body.appendChild(a);  // Append to the DOM
      a.click();  // Trigger the download
      document.body.removeChild(a);  // Remove the link element after download
    });
  }

  

  isObjectEmpty(obj: any): boolean {
    return !obj || Object.keys(obj).length === 0;
  }

  ngOnInit(): void {
    this.getList();
  }
}


