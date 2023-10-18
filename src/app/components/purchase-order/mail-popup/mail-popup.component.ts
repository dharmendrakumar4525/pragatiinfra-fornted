import { RequestService } from './../../../services/https/request.service';
import { Component, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ESIGN_UPLOAD_API } from '@env/api_path';
import { isEmpty } from 'lodash';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-mail-popup',
  templateUrl: './mail-popup.component.html',
  styleUrls: ['./mail-popup.component.scss']
})
export class MailPopupComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  mailArray: any = [];
  mails = new FormControl(null);
  constructor(public dialogRef: MatDialogRef<MailPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log("data", data);


  }

  sendMail() {
    if (this.mailArray && this.mailArray.length > 0) {
      this.dialogRef.close({ option: 1, data: this.mailArray });
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (value.match(validRegex)) {
      if ((value || '').trim()) {
        this.mailArray.push(value.trim());
      }
      if (input) {
        input.value = '';
      }
    }

  }

  remove(mail): void {
    const index = this.mailArray.indexOf(mail);
    if (index >= 0) {
      this.mailArray.splice(index, 1);
    }
  }

  ngOnInit(): void {
    this.mailArray.push(this.data.vendor_detail.email);
  }
  cancel() {
    this.dialogRef.close({ option: 2, data: [] });
  }

}
