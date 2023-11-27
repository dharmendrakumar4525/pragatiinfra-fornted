import { RequestService } from './../../../services/https/request.service';
import { Component, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ESIGN_UPLOAD_API } from '@env/api_path';
import { isEmpty } from 'lodash';
import { SnackbarService } from '@services/snackbar/snackbar.service';
@Component({
  selector: 'app-e-sign',
  templateUrl: './e-sign.component.html',
  styleUrls: ['./e-sign.component.scss']
})
export class ESignComponent implements OnInit {
  signaturePadOptions: any = { // passed through to szimek/signature_pad constructor
    'minWidth': 5,
    'canvasWidth': 866,
    'canvasHeight': 283,
  };
  @ViewChild(SignaturePad) signaturePad: SignaturePad | any;
  signatureImg: any;
  esignRequiredError: any;
  validationError: any;
  canvas: any;

  constructor(public dialogRef: MatDialogRef<ESignComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private request: RequestService,
    private snack: SnackbarService,) {

  }

  ngOnInit(): void {

  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    let ele: any = document.querySelector('.esign-container')
    var computed = getComputedStyle(ele),
      padding = parseInt(computed.paddingTop) + parseInt(computed.paddingBottom),
      paddingSide = parseInt(computed.paddingLeft) + parseInt(computed.paddingRight);
    let height = ele.clientHeight - padding;
    let width = ele.clientWidth - paddingSide;
    this.signaturePad.set('canvasWidth', width);
    this.signaturePad.set('canvasHeight', height);
  }
  ngAfterViewInit() {
    let ele: any = document.querySelector('.esign-container')
    var computed = getComputedStyle(ele),
      padding = parseInt(computed.paddingTop) + parseInt(computed.paddingBottom),
      paddingSide = parseInt(computed.paddingLeft) + parseInt(computed.paddingRight);
    let height = ele.clientHeight - padding;
    let width = ele.clientWidth - paddingSide;
    this.signaturePad.set('canvasWidth', width);
    this.signaturePad.set('canvasHeight', height);
    this.signaturePad.clear();
  }

  drawComplete(event: any) {
    console.log(this.signaturePad.toDataURL());
  }

  drawStart() {
    console.log('begin drawing');
  }


  clearSignature() {
    this.signaturePad.clear();
  }

  savePad() {
    const base64Data = this.signaturePad.toDataURL();
    this.signatureImg = base64Data;
    if (this.signaturePad.isEmpty()) {
      this.esignRequiredError = true;
    } else {
      this.esignRequiredError = false;
      // var images = {
      //   "name": 'esignature.png',
      //   "image": this.convertBase64(this.signaturePad.toDataURL()),
      // }
      let requestedData = {
        data: this.signaturePad.toDataURL()
      }
      // console.log("this.signaturePad.toDataURL()",this.signaturePad.toDataURL());
      this.request.POST(ESIGN_UPLOAD_API, requestedData).subscribe({
        next: (response) => {
          if (response) {
            this.snack.notify("Purchase order has been created with Esign.", 1);
            this.dialogRef.close({ option: 1, data: response.data.filename });

          }
        }, error: (err) => {
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
      })

    }
  }
  cancel() {
    this.dialogRef.close({ option: 2, data: [] });
  }

  convertBase64(base64String: any) {
    return base64String.replace("data:image/jpeg;base64,", "").replace("data:image/jpg;base64,", "").replace("data:image/png;base64,", "").replace("data:image/gif;base64,", "").replace("data:application/pdf;base64,", "").replace("data:image/tiff;base64,", "");
  };

}
