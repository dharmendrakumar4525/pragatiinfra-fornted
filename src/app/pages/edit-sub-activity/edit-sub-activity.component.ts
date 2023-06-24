import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RolesService } from '@services/roles.service';
import { TaskService } from '@services/task.service';
import { ToastService } from '@services/toast.service';
import { UsersService } from '@services/users.service';
@Component({
  selector: 'app-edit-sub-activity',
  templateUrl: './edit-sub-activity.component.html',
  styleUrls: ['./edit-sub-activity.component.css']
})
export class EditSubActivityComponent implements OnInit {

  hide = true;
  editSubActivityForm: FormGroup;

  emailRegex = new RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );
  roles:any;
  //user:any;
  subActivity:any;
  activities:any;
  phoneRegex = new RegExp(/^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/);
  constructor( private activeRoute: ActivatedRoute,private _fb: FormBuilder,private router: Router,private userService:UsersService,private toast:ToastService, private roleService:RolesService,
    private taskService:TaskService) { }

  ngOnInit(): void {

    this.activeRoute.params.subscribe((params:any) => {


      this.taskService.getSubActivityById(params.id).subscribe(data=>{
        this.subActivity = data

        this.editSubActivityForm.patchValue(this.subActivity)

    console.log(this.subActivity)
    })

    });

    this.taskService.getActivities().subscribe(data=>{
      this.activities = data
      
    })

    this.editSubActivityForm = this._fb.group({
      subTaskName: [null, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
     
      taskId: [null, [Validators.required]],
      

      
    });
  }

  get subTaskName(): AbstractControl {
    return this.editSubActivityForm.get('subTaskName');
  }
  get taskId(): AbstractControl {
    return this.editSubActivityForm.get('taskId');
  }

  // get password(): AbstractControl {
  //   return this.addUserForm.get('password');
  // }
  // get cPassword(): AbstractControl {
  //   return this.addUserForm.get('cPassword');
  // }

  updateSubActivity(){
    if (this.editSubActivityForm.invalid) {
      this.toast.openSnackBar(
        'Enter Valid Details'
      );
      //this.clearForm = true;
      //this.clearForm = true;
      this.editSubActivityForm.markAllAsTouched();
      return;
    }



    this.taskService.editSubActivity(this.editSubActivityForm.value,this.subActivity._id).subscribe(

      {
        next: (data: any) =>  {
          console.log(data)
         
          this.toast.openSnackBar('Sub activity Updated Successfully');
           this.router.navigate(['/sub-activities']);
           
          
        },
        error: (err) => {
          this.toast.openSnackBar("this sub activity already exits");
          
  
          
  
        }
      }
  
    )
  }

}
