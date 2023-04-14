import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from 'src/app/services/task.service';
import { FormGroup, FormBuilder, Validators, AbstractControl, NgForm, FormArray } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import { ProgressSheetService } from '../../services/progress-sheet.service';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from "@angular/material/datepicker";

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css']
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
    actualRevisedStartDate:[null],
    baseLineStartDate:[null, [Validators.required]],
    baseLineEndDate:[null, [Validators.required]],
    uom:[null, [Validators.required]],
    total:[null, [Validators.required]],
    addRevisesDates: this._fb.array([]),
    
  });
  uomData = ['Bag','Sq.m.','Cu.m.','Litre','No.','Kg','g','Quintal','meters','c.m.']
  permissions :any;
  // baseStartDate:any;

  
  constructor(
    private dialogRef: MatDialogRef<AddDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskService: TaskService,
    private _fb: FormBuilder,
    private toast: ToastService,
    private progressSheetService:ProgressSheetService
   // private toast: ToastService
  ) {
    this.minFromDate = new Date();
    this.maxFromDate = new Date();

    this.minToDate = new Date();
    this.maxToDate = new Date();

    this.yesterday.setDate(this.yesterday.getDate() - 0);
  }
  
 

  myFilter = (d: Date ): boolean => {
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
    if(this.data.addRevisesDates){
      this.data.addRevisesDates.forEach(single=>{
           this.plusBlocks();
       })
   } else {
     this.plusBlocks();
   }
    this.itemForm.patchValue(this.data)
    this.permissions = JSON.parse(localStorage.getItem('loginData'))
    // console.log(this.permissions)
    if(this.permissions.user.role === 'superadmin'){
    this.itemForm.get('actualRevisedStartDate').clearValidators()
    this.itemForm.updateValueAndValidity()
    }
    console.log(this.itemForm.get('actualRevisedStartDate'));
  }

  closeDialog(status: string) {
    this.dialogRef.close(status)
    // this.dialogRef.close(status);
    // document.getElementsByClassName("animate__animated")[0].classList.remove("animate__fadeInDown")
    // document.getElementsByClassName("animate__animated")[0].classList.add("animate__fadeOutUp"); 
    //setTimeout(() => { this.dialogRef.close(status); }, 1000);
  }

  // addTask(){



  
  getBlocks() {
    return this._fb.group({
      revisedDate: [null]
    })
  }
  // setStartDate(){
  //   this.baseStartDate = this.itemForm.get('baseLineStartDate').value;
  // }


  get actualRevisedStartDate(): AbstractControl {
    return this.itemForm.get('actualRevisedStartDate');
  }

  get baseLineStartDate(): AbstractControl {
    return this.itemForm.get('baseLineStartDate');
  }

  get baseLineEndDate(): AbstractControl {
    return this.itemForm.get('baseLineEndDate');
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

  minusBlocks(i: number){
    this.addRevisesDates.removeAt(i);
  }

  get addRevisesDates(): FormArray {
    return this.itemForm.get('addRevisesDates') as FormArray;
  }

  AddData(){

    if (this.itemForm.invalid) {
      this.toast.openSnackBar(
        'Enter Valid Details'
      );
      //this.clearForm = true;
      //this.clearForm = true;
      this.itemForm.markAllAsTouched();
      return;
    }
    if(this.permissions.user.role != 'superadmin' ){
      if (!this.itemForm.value.addRevisesDates.length) {
        this.toast.openSnackBar(
          'Please add Atleast one revised end date'
        );
        //this.clearForm = true;
        //this.clearForm = true;
        //this.itemForm.markAllAsTouched();
        return;
      }

    }

   
    let workingDaysRevised ;
    // console.log(this.itemForm.value)

   
      var oneDay=1000 * 60 * 60 * 24;
      console.log(oneDay);
      var difference_ms = Math.abs(this.itemForm.value.addRevisesDates.slice(-1)[0].revisedDate.getTime() - this.itemForm.value.actualRevisedStartDate.getTime())
      var diffValue = Math.round(difference_ms / oneDay);
      //console.log(diffValue)
       workingDaysRevised = diffValue + 1
   
     
    
  
    // console.log(this.itemForm.value)
    var oneDaybaseLine=1000 * 60 * 60 * 24;
    var difference_msbaseLine = Math.abs(new Date(this.itemForm.value.baseLineEndDate).getTime() - new Date(this.itemForm.value.baseLineStartDate).getTime())
    var diffValuebaseLine = Math.round(difference_msbaseLine / oneDaybaseLine);
    //console.log(diffValue)
    let baseLineWorkingDays = diffValuebaseLine + 1
    let noofDaysBalanceasperrevisedEnddate;
    let noofDaysBalanceasperbaseLine;
   
      var oneDaynoofDaysBalanc=1000 * 60 * 60 * 24;
      var difference_msnoofDaysBalance = Math.abs(this.itemForm.value.addRevisesDates.slice(-1)[0].revisedDate.getTime() - new Date().getTime())
      var diffValuenoofDaysBalance = Math.round(difference_msnoofDaysBalance / oneDaynoofDaysBalanc);
      //console.log(diffValue)
       noofDaysBalanceasperrevisedEnddate = diffValuenoofDaysBalance + 1
       noofDaysBalanceasperbaseLine = diffValuenoofDaysBalance + 1
      //  console.log(noofDaysBalanceasperbaseLine)
  
  
    // console.log(this.itemForm.value)
   
   let dailyAskingRateasperRevisedEndDate = Math.ceil(this.itemForm.value.total/workingDaysRevised)
  //  console.log(dailyAskingRateasperRevisedEndDate)

   let dailyAskingRateasperbaseLine = Math.ceil(this.itemForm.value.total/baseLineWorkingDays)
  //  console.log(dailyAskingRateasperbaseLine)

   this.itemForm.value.workingDaysRevised = workingDaysRevised
   this.itemForm.value.baseLineWorkingDays = baseLineWorkingDays
   this.itemForm.value.noofDaysBalanceasperrevisedEnddate = noofDaysBalanceasperrevisedEnddate
   this.itemForm.value.dailyAskingRateasperRevisedEndDate = dailyAskingRateasperRevisedEndDate
   this.itemForm.value.dailyAskingRateasperbaseLine = dailyAskingRateasperbaseLine
   this.itemForm.value.noofDaysBalanceasperbaseLine = noofDaysBalanceasperbaseLine

   if(this.itemForm.value.addRevisesDates.length == 1){
    this.itemForm.value.r1EndDate = this.itemForm.value.addRevisesDates[0].revisedDate
    this.itemForm.value.r2EndDate = null
    this.itemForm.value.r3EndDate = null
   }else if(this.itemForm.value.addRevisesDates.length == 2){
    this.itemForm.value.r1EndDate = this.itemForm.value.addRevisesDates[0].revisedDate
    this.itemForm.value.r2EndDate = this.itemForm.value.addRevisesDates[1].revisedDate
    this.itemForm.value.r3EndDate = null
   }else if(this.itemForm.value.addRevisesDates.length == 3){
    this.itemForm.value.r1EndDate = this.itemForm.value.addRevisesDates[0].revisedDate
    this.itemForm.value.r2EndDate = this.itemForm.value.addRevisesDates[1].revisedDate
    this.itemForm.value.r3EndDate = this.itemForm.value.addRevisesDates[2].revisedDate

   }
   console.log(this.itemForm.value);

        this.progressSheetService.addSubActivityData(this.itemForm.value,this.data._id).subscribe(

      {
        next: (data: any) =>  {
          // console.log(data)
          this.toast.openSnackBar("Activity Data Added Successfully");
      this.closeDialog('yes');
          // this.spinner.hide()
          // this.router.navigate(['/usersList']);
          // this.toast.openSnackBar('User Added Successfully');
          
        },
        error: (err) => {
          this.toast.openSnackBar("Something went wrong. Unable to Add Activity Data");
          // this.spinner.hide()
          // this.toast.openSnackBar('Something went wrong, please try again later');
          // console.log(err) 
  
          // this.errorData = err
  
          
  
        }
      }
  
    )


  }
  



}
