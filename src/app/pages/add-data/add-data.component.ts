import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from '@services/task.service';
import { FormGroup, FormBuilder, Validators, AbstractControl, NgForm, FormArray } from '@angular/forms';
import { ToastService } from '@services/toast.service';
import { ProgressSheetService } from '@services/progress-sheet.service';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { DatePipe } from '@angular/common';
import * as moment from 'moment-timezone'
import { isEmpty } from 'lodash';
import { Router, ActivatedRoute } from '@angular/router';
import { UOM_API } from '@env/api_path';
import { ExcelService } from '@services/export-excel/excel.service';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';
@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss'],
  providers: [DatePipe]
})
export class AddDataComponent implements OnInit {


  yesterday = new Date();
  tommorrow = new Date();
  currentDate:any;

  itemForm: FormGroup = this._fb.group({
    actual_revised_start_date: [],
    base_line_start_date: [null, [Validators.required]],
    base_line_end_date: [null, [Validators.required]],
    uom: [null, [Validators.required]],
    quantity: [null, [Validators.required]],
    addRevisesDates: this._fb.array([]),

  });
  uomData = ['Bag', 'Sq.m.', 'Cu.m.', 'Litre', 'No.', 'Kg', 'g', 'Quintal', 'meters', 'c.m.']
  permissions: any;
  reviseMinDateArray: any = [];
  baseLineEndMinDate: any;
  UOMList: any;
  list: any;


  constructor(
    private dialogRef: MatDialogRef<AddDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder,
    private toast: ToastService,
    private router: Router,
    private httpService: RequestService,
    private excelService: ExcelService,
    private snack: SnackbarService,
    private route: ActivatedRoute
  ) {
    this.reviseMinDateArray = [];
    this.getUOMList();
    this.currentDate = moment().startOf('day');
  }

  ngOnInit(): void {
    if (this.data.addRevisesDates) {
      this.data.addRevisesDates.forEach(single => {
        this.addBlocks(single);
      })
    }
    if (this.data) {
      this.baseLineEndMinDate = new Date(this.data.base_line_start_date);
      if (this.data.actual_revised_start_date) {
        this.reviseMinDateArray.push(new Date(this.data.actual_revised_start_date));
      }
      if (this.data.addRevisesDates && this.data.addRevisesDates.length > 0) {
        this.data.addRevisesDates.forEach((element, index) => {
          this.reviseMinDateArray.push(new Date(element.revisedDate));
        });
      }
    }

    this.itemForm.patchValue({
      ...this.data
    })
    if (this.data.addRevisesDates) {

    }
    this.permissions = JSON.parse(localStorage.getItem('loginData'))
    // console.log(this.permissions)
    if (this.permissions.user.role === 'superadmin') {
      this.itemForm.get('actual_revised_start_date').clearValidators()
      this.itemForm.updateValueAndValidity()
    }
  }

  getUOMList() {
    this.httpService.GET(UOM_API, {}).subscribe(res => {
      if (res && res.data) {
        this.UOMList = res.data;
        this.list = res.data;
      }
    }, (err) => {
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

    })
  }

  baseLineStartDateChange(value: any) {
    this.baseLineEndMinDate = new Date(value);
    console.log(new Date(this.itemForm.value.base_line_end_date).getTime() > new Date(this.itemForm.value.base_line_end_date).getTime());
    console.log(new Date(this.itemForm.value.base_line_end_date).getTime());

    if (this.itemForm.value.base_line_end_date && new Date(this.itemForm.value.base_line_end_date).getTime() < new Date(this.itemForm.value.base_line_start_date).getTime()) {
      this.itemForm.patchValue({
        base_line_end_date: null,
      })
    }
    if (this.itemForm.value.actual_revised_start_date && new Date(this.itemForm.value.actual_revised_start_date).getTime() < new Date(this.itemForm.value.base_line_start_date).getTime()) {
      this.itemForm.patchValue({
        actual_revised_start_date: null
      })
    }

  }

  ActualReviseStartDateChange(value) {
    this.reviseMinDateArray[0] = (new Date(value));
    console.log(this.reviseMinDateArray);

  }

  ActualReviseEndDateChange(value, i) {
    console.log(value, i);
    this.reviseMinDateArray[i + 1] = (new Date(value));
  }

  closeDialog() {
    this.dialogRef.close({ type: 0, data: "" })
  }

  getBlocks(value?: any) {
    if (value) {
      return this._fb.group({
        revisedDate: [value]
      })
    }
    else {
      return this._fb.group({
        revisedDate: [null, Validators.required]
      })
    }
  }

  get actualRevisedStartDate(): AbstractControl {
    return this.itemForm.get('actual_revised_start_date');
  }

  get baseLineStartDate(): AbstractControl {
    return this.itemForm.get('base_line_start_date');
  }

  get baseLineEndDate(): AbstractControl {
    return this.itemForm.get('base_line_end_date');
  }

  get uom(): AbstractControl {
    return this.itemForm.get('uom');
  }

  get total(): AbstractControl {
    return this.itemForm.get('total');
  }

  plusBlocks() {
    this.addRevisesDates.push(this.getBlocks());

  }

  addBlocks(value) {
    this.addRevisesDates.push(this.getBlocks(value.revisedDate));

  }

  minusBlocks(i: number) {
    this.addRevisesDates.removeAt(i);
    // this.reviseMinDateArray[i+1]=null;
    if (this.reviseMinDateArray && this.reviseMinDateArray.length > 0) {
      this.reviseMinDateArray.splice(i + 1, 1);

    }
  }

  get addRevisesDates(): FormArray {
    return this.itemForm.get('addRevisesDates') as FormArray;
  }

  AddData() {
    var array = this.itemForm.value.addRevisesDates;
    var isDatesOrdered = true;
    for (var i = 1; i < array.length; i++) {
      var previousDate = array[i - 1].revisedDate;
      var currentDate = array[i].revisedDate;

      if (currentDate <= previousDate) {
        isDatesOrdered = false;
        break;
      }
    }
    if (!isDatesOrdered) {
      this.toast.openSnackBar('Enter Valid Revised Date');
      return;
    }
    if (this.itemForm.value.actual_revised_start_date) {
      if (this.itemForm.value.actual_revised_start_date <= this.itemForm.value.base_line_start_date) {
        this.toast.openSnackBar(
          'Enter Valid Date'
        );
        return;
      }
    }


    if (this.itemForm.value.base_line_end_date <= this.itemForm.value.base_line_start_date) {
      this.toast.openSnackBar(
        'Enter Valid Date '
      );
      return;
    }


    if (this.itemForm.invalid) {
      this.toast.openSnackBar(
        'Enter Valid Details'
      );
      this.itemForm.markAllAsTouched();
      return;
    }
    if (this.permissions.user.role != 'superadmin') {
      if (!this.itemForm.value.addRevisesDates.length) {
        this.toast.openSnackBar(
          'Please add Atleast one revised end date'
        );
        return;
      }
    }
    var workingDaysRevised: any;
    var baseLineWorkingDays: any;
    var noofDaysBalanceasperrevisedEnddate: any;
    var noofDaysBalanceasperbaseLine: any;
    var dailyAskingRateasperRevisedEndDate: any;
    var dailyAskingRateasperbaseLine: any;
    var diffValuebaseLine = moment(this.itemForm.value.base_line_end_date).diff( moment(this.itemForm.value.base_line_start_date),'days')
    baseLineWorkingDays = diffValuebaseLine + 1
    dailyAskingRateasperbaseLine = Math.ceil(this.itemForm.value.quantity / baseLineWorkingDays)
    if (this.itemForm.value.addRevisesDates && this.itemForm.value.addRevisesDates.length > 0) {
      workingDaysRevised;
      let lastRevisedData = this.itemForm.value.addRevisesDates[this.itemForm.value.addRevisesDates.length - 1]['revisedDate'];
      let lastRevisedDataMoment = moment(lastRevisedData);
      var actualRevisedSartDateMoment = moment(this.itemForm.value.actual_revised_start_date);
      let diffValue = lastRevisedDataMoment.diff(actualRevisedSartDateMoment, 'days');
      workingDaysRevised = diffValue+1;

      
      // noofDaysBalanceasperrevisedEnddate;
      // noofDaysBalanceasperbaseLine;
      console.log(this.itemForm.value.addRevisesDates.slice(-1)[0].revisedDate);

      var diffValuenoofDaysBalance = Math.abs(moment(this.itemForm.value.addRevisesDates.slice(-1)[0].revisedDate).diff(moment(this.currentDate),'days'))

      if(this.itemForm.value.actual_revised_start_date!=null){
        if(moment(this.itemForm.value.actual_revised_start_date).startOf('day')>moment(this.currentDate).startOf('day')){
          noofDaysBalanceasperrevisedEnddate =moment(this.itemForm.value.addRevisesDates.slice(-1)[0].revisedDate).diff(moment(this.itemForm.value.actual_revised_start_date),'days')+1;
        }else if(moment(this.itemForm.value.addRevisesDates.slice(-1)[0].revisedDate).startOf('day') >= moment(this.currentDate).startOf('day')){
          noofDaysBalanceasperrevisedEnddate = diffValuenoofDaysBalance+1;
        }else{
          noofDaysBalanceasperrevisedEnddate=0;
        }
      }
      // noofDaysBalanceasperbaseLine = diffValuenoofDaysBalance + 1
      if(this.itemForm.value.actual_revised_start_date!=null)
        dailyAskingRateasperRevisedEndDate = Math.ceil(this.itemForm.value.quantity / (workingDaysRevised))
    }


    if(moment(this.itemForm.value.base_line_start_date).startOf('day')>moment(this.currentDate).startOf('day')){
      noofDaysBalanceasperbaseLine=baseLineWorkingDays;
    }else if(moment(this.itemForm.value.base_line_end_date).startOf('day')>moment(this.currentDate).startOf('day')){
      noofDaysBalanceasperbaseLine=moment(this.itemForm.value.base_line_end_date).diff( moment(this.currentDate).startOf('day'),'days')+1;
    }else {
      noofDaysBalanceasperbaseLine=0;
    }

    if(this.itemForm.value.actual_revised_start_date!=null){
      if(workingDaysRevised>1)
        this.itemForm.value.workingDaysRevised = workingDaysRevised;
      else
        this.itemForm.value.workingDaysRevised = 0;
    }
    this.itemForm.value.baseLineWorkingDays = baseLineWorkingDays
    this.itemForm.value.noofDaysBalanceasperrevisedEnddate = noofDaysBalanceasperrevisedEnddate
    this.itemForm.value.dailyAskingRateasperRevisedEndDate = dailyAskingRateasperRevisedEndDate
    this.itemForm.value.dailyAskingRateasperbaseLine = dailyAskingRateasperbaseLine
    this.itemForm.value.noofDaysBalanceasperbaseLine = noofDaysBalanceasperbaseLine
    if (this.itemForm.value.addRevisesDates.length == 0) {
      this.itemForm.value.r1EndDate = null
      this.itemForm.value.r2EndDate = null
      this.itemForm.value.r3EndDate = null
    }
    else if (this.itemForm.value.addRevisesDates.length == 1) {
      this.itemForm.value.r1EndDate = this.itemForm.value.addRevisesDates[0].revisedDate
      this.itemForm.value.r2EndDate = null
      this.itemForm.value.r3EndDate = null
    } else if (this.itemForm.value.addRevisesDates.length == 2) {
      this.itemForm.value.r1EndDate = this.itemForm.value.addRevisesDates[0].revisedDate;
      this.itemForm.value.r2EndDate = this.itemForm.value.addRevisesDates[1].revisedDate;
      this.itemForm.value.r3EndDate = null;
    } else if (this.itemForm.value.addRevisesDates.length == 3) {
      this.itemForm.value.r1EndDate = this.itemForm.value.addRevisesDates[0].revisedDate;
      this.itemForm.value.r2EndDate = this.itemForm.value.addRevisesDates[1].revisedDate;
      this.itemForm.value.r3EndDate = this.itemForm.value.addRevisesDates[2].revisedDate;
    }

    this.dialogRef.close({ data: this.itemForm.value, type: 1 });


  }



}
