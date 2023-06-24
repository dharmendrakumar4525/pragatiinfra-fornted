import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from '@services/task.service';
import { FormGroup, FormBuilder, Validators, AbstractControl, NgForm } from '@angular/forms';
import { ToastService } from '@services/toast.service';
import { AddProjectService } from '@services/add-project.service';
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  aboutUsForm: FormGroup = this._fb.group({
    
    about: [null, [Validators.required, Validators.pattern('.*\\S.*[a-zA-Z ]')]],
    


  });
  aboutUs:any
  aboutUsLen:any;
  constructor(
    private dialogRef: MatDialogRef<AboutUsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskService: TaskService,
    private _fb: FormBuilder,
    private toast: ToastService,
    private projectService: AddProjectService
  ) { }

  ngOnInit(): void {
    this.projectService.getAboutUs().subscribe(data=>{
      //this.spinner.hide()
      this.aboutUs = data
      this.aboutUsLen = this.aboutUs.length
      if(this.aboutUsLen){
        this.aboutUsForm.patchValue({
          about:this.aboutUs[0].description
        })
      }
      console.log(this.aboutUsLen)
    });
  }

  closeDialog(status: string) {
    this.dialogRef.close(status)
    // this.dialogRef.close(status);
    // document.getElementsByClassName("animate__animated")[0].classList.remove("animate__fadeInDown")
    // document.getElementsByClassName("animate__animated")[0].classList.add("animate__fadeOutUp"); 
    //setTimeout(() => { this.dialogRef.close(status); }, 1000);
  }

  addInformation(){
    if(!this.aboutUsLen){

   
    if (this.aboutUsForm.invalid) {
      this.toast.openSnackBar(
        'Enter Provide Valid Information'
      );
      //this.clearForm = true;
      //this.clearForm = true;
      this.aboutUsForm.markAllAsTouched();  
      return;
    }
    this.projectService.addAboutUs(this.aboutUsForm.value).subscribe(

      {
        next: (data: any) =>  {
          console.log(data)
          this.toast.openSnackBar("Information Added Successfully");
      this.closeDialog('yes');
          // this.spinner.hide()
          // this.router.navigate(['/usersList']);
          // this.toast.openSnackBar('User Added Successfully');
          
        },
        error: (err) => {
          this.toast.openSnackBar("Something went wrong. Unable to Add Information");
          // this.spinner.hide()
          // this.toast.openSnackBar('Something went wrong, please try again later');
          // console.log(err) 
  
          // this.errorData = err
  
          
  
        }
      }
  
    )
  }else{
    if (this.aboutUsForm.invalid) {
      this.toast.openSnackBar(
        'Enter Provide Valid Information'
      );
      //this.clearForm = true;
      //this.clearForm = true;
      this.aboutUsForm.markAllAsTouched();  
      return;
    }
    this.projectService.updateAboutUsById(this.aboutUsForm.value,this.aboutUs[0]._id).subscribe(

      {
        next: (data: any) =>  {
          console.log(data)
          this.toast.openSnackBar("Information Update Successfully");
      this.closeDialog('yes');
          // this.spinner.hide()
          // this.router.navigate(['/usersList']);
          // this.toast.openSnackBar('User Added Successfully');
          
        },
        error: (err) => {
          this.toast.openSnackBar("Something went wrong. Unable to Update Information");
          // this.spinner.hide()
          // this.toast.openSnackBar('Something went wrong, please try again later');
          // console.log(err) 
  
          // this.errorData = err
  
          
  
        }
      }
  
    )
  }
  }

  get about(): AbstractControl {
    return this.aboutUsForm.get('about');
  }


}
