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

  downloadPOPdf(pageId) {
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
        saveAs(blob, `po-${id}.pdf`);
      });
  }

  downloadRCPdf(pageId) {
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
        saveAs(blob, `rc-${id}.pdf`);
      });
  }

  downloadPRPdf(rateApprovalId) {
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
              saveAs(blob, `pr-${id}.pdf`);
            });
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  downloadVendorAcceptance(urls: string[]) {
    urls.forEach((url) => {
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.download = url.split('/').pop();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  downloadVendorQuotations(filesObject){
console.log("here urls", filesObject);
for (const key in filesObject) {
  if (filesObject.hasOwnProperty(key)) {
      const fileUrl = filesObject[key];  // Get the file URL
      this.downloadFileAsBlob(fileUrl, key); // Download the file
  }
}
  }


  downloadFileAsBlob(fileUrl: string, filename: string) {
    // Fetch the file as a blob
    fetch(fileUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.blob();  // Convert the response to a Blob
        })
        .then(blob => {
            // Create a new link element
            const link = document.createElement('a');
            const objectUrl = URL.createObjectURL(blob);  // Create a URL for the blob

            link.href = objectUrl;
            link.download = filename;  // Set the download filename

            // Programmatically click the link to trigger the download
            document.body.appendChild(link);
            link.click();

            // Clean up
            URL.revokeObjectURL(objectUrl);  // Revoke the object URL to free memory
            document.body.removeChild(link);
        })
        .catch(error => {
            console.error('Download failed:', error);
        });
}

  isObjectEmpty(obj: any): boolean {
    return !obj || Object.keys(obj).length === 0;
  }

  ngOnInit(): void {
    this.getList();
  }
}


