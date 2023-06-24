import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from '@services/task.service';
import { FormGroup, FormBuilder, Validators, AbstractControl, NgForm } from '@angular/forms';
import { DataAnalysisComponent } from '../data-analysis/data-analysis.component';
import { DataAnalysisService } from '@services/data-analysis.service';
import { UsersService } from '@services/users.service';
import { ToastService } from '@services/toast.service';
@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit {
  project:any;
  memberForm: FormGroup = this._fb.group({
    
    email: [null, [Validators.required]],
    projectId: [null, [Validators.required]],


  });
  users:any;
  constructor(
    private dialogRef: MatDialogRef<AddMemberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskService: TaskService,
    private _fb: FormBuilder,
    private dataAnalysis:DataAnalysisService,
    private userService:UsersService,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
    this.userService.getUserss().subscribe(data=>{
      //this.spinner.hide()
      this.users = data
      
      console.log(this.users)
    });
  }

  closeDialog(status: string) {
    this.dialogRef.close(status)
    // this.dialogRef.close(status);
    // document.getElementsByClassName("animate__animated")[0].classList.remove("animate__fadeInDown")
    // document.getElementsByClassName("animate__animated")[0].classList.add("animate__fadeOutUp"); 
    //setTimeout(() => { this.dialogRef.close(status); }, 1000);
  }

  addTask(){

    if (this.memberForm.invalid) {
      this.toast.openSnackBar(
        'Enter Valid Details'
      );
      //this.clearForm = true;
      //this.clearForm = true;
      this.memberForm.markAllAsTouched();
      return;
    }

    let checkUserEmail = this.users.filter(ele=>{
      return ele.email == this.memberForm.value.email
    })

    if(!checkUserEmail.length){
      this.toast.openSnackBar("This email is not in users list. so you can't add it");
      return;
      
    }


    let membersData = this.project.members
    membersData.push(this.memberForm.value.email)
    this.userService.addMemberData(membersData, this.memberForm.value.projectId).subscribe(

      {
        next: (data: any) =>  {
          console.log(data)
          // this.spinner.hide()
          // this.router.navigate(['/usersList']);
          this.closeDialog('yes');
           this.toast.openSnackBar('Member Added Successfully');
          
        },
        error: (err) => {
          // this.spinner.hide()
           this.toast.openSnackBar('Something went wrong, please try again later');
          // console.log(err) 
  
          // this.errorData = err
  
          
  
        }
      }
  
    )
  }


  get projectId(): AbstractControl {
    return this.memberForm.get('projectId');
  }

  get email(): AbstractControl {
    return this.memberForm.get('email');
  }
 

  updateSupply(){
    // this.supplyService.updateSuppliesByPk(this.data.id,
    // {
    //   status: 'PENDING_APPROVAL',
    //   status_changed_at: "now()"
    // }).
    // subscribe(success=>{
    //   this.toast.openSnackBar("This product is sent for approval");
    //   this.closeDialog('yes');
    // },failure => {
    //   this.toast.openSnackBar("Unable to send for approval");
    // })
  }

  someMethod(ev){
    console.log(ev.value)
    this.dataAnalysis.getProjectById(ev.value).subscribe(data=>{
      this.project = data
  console.log(this.project)
  })

  }
}
