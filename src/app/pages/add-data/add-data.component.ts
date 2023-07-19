import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from '@services/task.service';
import { FormGroup, FormBuilder, Validators, AbstractControl, NgForm, FormArray } from '@angular/forms';
import { ToastService } from '@services/toast.service';
import { ProgressSheetService } from '@services/progress-sheet.service';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css'],
  providers: [DatePipe]
})
export class AddDataComponent implements OnInit {
  minFromDate: Date;
  maxFromDate: Date | null;
  minToDate: Date | null;
  maxToDate: Date;

  yesterday = new Date();
  tommorrow = new Date();

  // startDate = new FormControl(new Date(2023, 3, 1));
  // endDate = new FormControl(new Date());

  itemForm: FormGroup = this._fb.group({
    actual_revised_start_date: [],
    base_line_start_date: [null, [Validators.required]],
    base_line_end_date: [null, [Validators.required]],
    uom: [null, [Validators.required]],
    total: [null, [Validators.required]],
    addRevisesDates: this._fb.array([]),

  });
  uomData = ['Bag', 'Sq.m.', 'Cu.m.', 'Litre', 'No.', 'Kg', 'g', 'Quintal', 'meters', 'c.m.']
  permissions: any;
  AddreviseDateLength: any = 0;
  // baseStartDate:any;


  constructor(
    private dialogRef: MatDialogRef<AddDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder,
    private toast: ToastService,
    private progressSheetService: ProgressSheetService,
    // private toast: ToastService
  ) {


    console.log('data1111111111', data)
    this.minFromDate = new Date();
    this.maxFromDate = new Date();

    this.minToDate = new Date();
    this.maxToDate = new Date();

    this.yesterday.setDate(this.yesterday.getDate() - 0);
  }



  myFilter = (d: Date): boolean => {
    const today = new Date(this.maxFromDate);
    // return true if the selected date is greater than or equal to today
    return d > today;

  }

  fromDateChange(type: string, event: MatDatepickerInputEvent<Date>) {
    // console.log(`${type}: ${event.value}`);
    this.minToDate = event.value;

    if (event.value !== null) {
      this.maxToDate = new Date(
        event!.value.getFullYear(),
        event!.value.getMonth(),
        event!.value.getDate() + 1000
      );
    }
  }

  toDateChange(type: string, event: MatDatepickerInputEvent<Date>) {
    this.maxFromDate = event.value;

    if (event.value !== null) {
      this.minFromDate = new Date(
        event!.value.getFullYear(),
        event!.value.getMonth(),
        event!.value.getDate() - 100
      );
    }
  }

  ngOnInit(): void {
    if (this.data.addRevisesDates) {
      this.data.addRevisesDates.forEach(single => {
        this.plusBlocks();
      })
    } else {
      this.plusBlocks();
    }
    this.itemForm.patchValue(this.data)
    this.permissions = JSON.parse(localStorage.getItem('loginData'))
    // console.log(this.permissions)
    if (this.permissions.user.role === 'superadmin') {
      this.itemForm.get('actual_revised_start_date').clearValidators()
      this.itemForm.updateValueAndValidity()
    }
    console.log(this.itemForm.get('actual_revised_start_date'));
  }

  closeDialog(status: string) {
    this.dialogRef.close(status)
  }





  getBlocks() {
    return this._fb.group({
      revisedDate: [null]
    })
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
    let size = this.itemForm.value.addRevisesDates;
    // console.log("size", size);
    this.AddreviseDateLength = size.length;

  }

  minusBlocks(i: number) {
    this.addRevisesDates.removeAt(i);
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
      if (this.itemForm.value.actual_revised_start_date <= this.itemForm.value.base_line_start_date ) {
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
    var oneDaybaseLine = 1000 * 60 * 60 * 24;
    var difference_msbaseLine = Math.abs(new Date(this.itemForm.value.base_line_end_date).getTime() - new Date(this.itemForm.value.base_line_start_date).getTime())
    var diffValuebaseLine = Math.round(difference_msbaseLine / oneDaybaseLine);
    baseLineWorkingDays = diffValuebaseLine + 1
    dailyAskingRateasperbaseLine = Math.ceil(this.itemForm.value.total / baseLineWorkingDays)
    if (this.itemForm.value.addRevisesDates && this.itemForm.value.addRevisesDates.length > 0) {
      workingDaysRevised;
      var oneDay = 1000 * 60 * 60 * 24;
      console.log(oneDay);
      var difference_ms = Math.abs(this.itemForm.value.addRevisesDates.slice(-1)[0].revisedDate.getTime() - this.itemForm.value.actual_revised_start_date.getTime())
      var diffValue = Math.round(difference_ms / oneDay);
      workingDaysRevised = diffValue


      noofDaysBalanceasperrevisedEnddate;
      noofDaysBalanceasperbaseLine;

      var oneDaynoofDaysBalanc = 1000 * 60 * 60 * 24;
      var difference_msnoofDaysBalance = Math.abs(this.itemForm.value.addRevisesDates.slice(-1)[0].revisedDate.getTime() - new Date().getTime())
      var diffValuenoofDaysBalance = Math.round(difference_msnoofDaysBalance / oneDaynoofDaysBalanc);
      noofDaysBalanceasperrevisedEnddate = diffValuenoofDaysBalance + 1
      noofDaysBalanceasperbaseLine = diffValuenoofDaysBalance + 1
      dailyAskingRateasperRevisedEndDate = Math.ceil(this.itemForm.value.total / workingDaysRevised)

    }
    this.itemForm.value.workingDaysRevised = workingDaysRevised
    this.itemForm.value.baseLineWorkingDays = baseLineWorkingDays
    this.itemForm.value.noofDaysBalanceasperrevisedEnddate = noofDaysBalanceasperrevisedEnddate
    this.itemForm.value.dailyAskingRateasperRevisedEndDate = dailyAskingRateasperRevisedEndDate
    this.itemForm.value.dailyAskingRateasperbaseLine = dailyAskingRateasperbaseLine
    this.itemForm.value.noofDaysBalanceasperbaseLine = noofDaysBalanceasperbaseLine

    if (this.itemForm.value.addRevisesDates.length == 1) {
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
    // this.progressSheetService.addSubActivityData(this.itemForm.value, this.data._id).subscribe(
    //   {
    //     next: (data: any) => {
    //       this.toast.openSnackBar("Activity Data Added Successfully");
    //       this.closeDialog('yes');
    //     },
    //     error: (err) => {
    //       this.toast.openSnackBar("Something went wrong. Unable to Add Activity Data");
    //     }
    //   }

    // )
    this.dialogRef.close(this.itemForm.value);


  }



}
