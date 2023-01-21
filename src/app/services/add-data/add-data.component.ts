import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from 'src/app/services/task.service';
import { FormGroup, FormBuilder, Validators, AbstractControl, NgForm, FormArray } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import { ProgressSheetService } from '../progress-sheet.service';

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

        this.progressSheetService.addSubActivityData(this.itemForm.value,this.data).subscribe(

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
