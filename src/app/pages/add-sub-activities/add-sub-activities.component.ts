import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RolesService } from '@services/roles.service';
import { TaskService } from '@services/task.service';
import { ToastService } from '@services/toast.service';
import { UsersService } from '@services/users.service';

@Component({
  selector: 'app-add-sub-activities',
  templateUrl: './add-sub-activities.component.html',
  styleUrls: ['./add-sub-activities.component.css']
})
export class AddSubActivitiesComponent implements OnInit {

  hide = true;
  addSubActivitiesForm: FormGroup;

  emailRegex = new RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );
  roles:any;
  activities:any;
  phoneRegex = new RegExp(/^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/);
  constructor( private _fb: FormBuilder, private taskService:TaskService, private router: Router,private userService:UsersService,private toast:ToastService, private roleService:RolesService) { }

  ngOnInit(): void {

    this.taskService.getActivities().subscribe(data=>{
      this.activities = data
      
    })

    this.addSubActivitiesForm = this._fb.group({
      subTaskName: [null, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
     
      taskId: [null, [Validators.required]],
      

      
    });
  }

  get subTaskName(): AbstractControl {
    return this.addSubActivitiesForm.get('subTaskName');
  }
  get taskId(): AbstractControl {
    return this.addSubActivitiesForm.get('taskId');
  }

  addSubActivity(){
    if (this.addSubActivitiesForm.invalid) {
      this.toast.openSnackBar(
        'Enter Valid Details'
      );
      //this.clearForm = true;
      //this.clearForm = true;
      this.addSubActivitiesForm.markAllAsTouched();
      return;
    }


    this.taskService.addSubActibity(this.addSubActivitiesForm.value).subscribe(

      {
        next: (data: any) =>  {
          console.log(data)
         
          this.toast.openSnackBar('Sub Activity Created Successfully');
           this.router.navigate(['/sub-activities']);
           
          
        },
        error: (err) => {
          this.toast.openSnackBar("this sub activity already exits");
          
  
          
  
        }
      }
  
    )
  }

}
