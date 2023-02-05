import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from 'src/app/services/task.service';
import { FormGroup, FormBuilder, Validators, AbstractControl, NgForm, FormArray } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import { ProgressSheetService } from '../../services/progress-sheet.service';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css']
})
export class AddDataComponent implements OnInit {

  itemForm: FormGroup = this._fb.group({
    actualRevisedStartDate:[null, [Validators.required]],
    baseLineStartDate:[null, [Validators.required]],
    baseLineEndDate:[null, [Validators.required]],
    uom:[null, [Validators.required]],
    total:[null, [Validators.required]],
    addRevisesDates: this._fb.array([]),
    
  });
  uomData = ['Bag','Sq.m.','Cu.m.','Litre','No.','Kg','g','Quintal','meters','c.m.']
  constructor(
    private dialogRef: MatDialogRef<AddDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskService: TaskService,
    private _fb: FormBuilder,
    private toast: ToastService,
    private progressSheetService:ProgressSheetService
   // private toast: ToastService
  ) { }

  ngOnInit(): void {
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

    if (!this.itemForm.value.addRevisesDates.length) {
      this.toast.openSnackBar(
        'Please add Atleast one revised end date'
      );
      //this.clearForm = true;
      //this.clearForm = true;
      //this.itemForm.markAllAsTouched();
      return;
    }

    console.log(this.itemForm.value)
    var oneDay=1000 * 60 * 60 * 24;
    var difference_ms = Math.abs(this.itemForm.value.addRevisesDates.slice(-1)[0].revisedDate.getTime() - this.itemForm.value.actualRevisedStartDate.getTime())
    var diffValue = Math.round(difference_ms / oneDay);
    //console.log(diffValue)
    let workingDaysRevised = diffValue + 1

    console.log(this.itemForm.value)
    var oneDaybaseLine=1000 * 60 * 60 * 24;
    var difference_msbaseLine = Math.abs(this.itemForm.value.baseLineEndDate.getTime() - this.itemForm.value.baseLineStartDate.getTime())
    var diffValuebaseLine = Math.round(difference_msbaseLine / oneDaybaseLine);
    //console.log(diffValue)
    let baseLineWorkingDays = diffValuebaseLine + 1

    console.log(this.itemForm.value)
    var oneDaynoofDaysBalanc=1000 * 60 * 60 * 24;
    var difference_msnoofDaysBalance = Math.abs(this.itemForm.value.addRevisesDates.slice(-1)[0].revisedDate.getTime() - new Date().getTime())
    var diffValuenoofDaysBalance = Math.round(difference_msnoofDaysBalance / oneDaynoofDaysBalanc);
    //console.log(diffValue)
    let noofDaysBalanceasperrevisedEnddate = diffValuenoofDaysBalance + 1

   let dailyAskingRateasperRevisedEndDate = Math.ceil(this.itemForm.value.total/workingDaysRevised)
   console.log(dailyAskingRateasperRevisedEndDate)


   this.itemForm.value.workingDaysRevised = workingDaysRevised
   this.itemForm.value.baseLineWorkingDays = baseLineWorkingDays
   this.itemForm.value.noofDaysBalanceasperrevisedEnddate = noofDaysBalanceasperrevisedEnddate
   this.itemForm.value.dailyAskingRateasperRevisedEndDate = dailyAskingRateasperRevisedEndDate

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

        this.progressSheetService.addSubActivityData(this.itemForm.value,this.data._id).subscribe(

      {
        next: (data: any) =>  {
          console.log(data)
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
