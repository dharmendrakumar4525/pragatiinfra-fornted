import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { GET_SITE_API } from '@env/api_path';
import { RolesService } from '@services/roles.service';
import { ToastService } from '@services/toast.service';
import { UsersService } from '@services/users.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  hide = true;
  editUserForm: FormGroup;

  emailRegex = new RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );
  phoneRegex = new RegExp(/^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/);
  roles: any;
  siteList: any[] = [];
  user: any;

  constructor(
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private userService: UsersService,
    private toast: ToastService,
    private roleService: RolesService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.initializeForm();

    // Load user data and site list in parallel
    this.activeRoute.params.subscribe(params => {
      const userId = params['id'];

      forkJoin([
        this.userService.getUserById(userId),
        this.roleService.getRoles(),
        this.http.get<any>(`${environment.api_path}${GET_SITE_API}`)
      ]).subscribe(([userData, rolesData, sitesData]) => {
        this.user = userData;
        this.roles = rolesData;
        this.siteList = sitesData.data;
       
        const siteIds = this.user.sites.map((site: { _id: string }) => site._id);

        // Ensure the form is patched with the correct values
        this.editUserForm.patchValue({
          name: this.user.name,
          email: this.user.email,
          role: this.user.role,
          phone: this.user.phone,
          sites: siteIds,

        });

        // Debugging: Log form value after patching
        console.log('Form value after patching:', this.editUserForm.value);
      });
    });
  }

  initializeForm(): void {
    this.editUserForm = this.fb.group({
      name: [null, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      email: [null, [Validators.required, Validators.pattern(this.emailRegex)]],
      phone: [null, [Validators.required, Validators.pattern(this.phoneRegex)]],
      role: [null, [Validators.required]],
      sites: [[], Validators.required],
      password: [null]
    });
  }

  get name(): AbstractControl {
    return this.editUserForm.get('name');
  }

  get email(): AbstractControl {
    return this.editUserForm.get('email');
  }

  get phone(): AbstractControl {
    return this.editUserForm.get('phone');
  }

  get role(): AbstractControl {
    return this.editUserForm.get('role');
  }

  get sites(): AbstractControl {
    return this.editUserForm.get('sites');
  }

  updateUser(): void {
    if (this.editUserForm.invalid) {
      this.toast.openSnackBar('Enter Valid Details');
      this.editUserForm.markAllAsTouched();
      return;
    }

    console.log(this.editUserForm);
    
    this.userService.editUser(this.editUserForm.value, this.user['_id']).subscribe({
      next: () => {
        this.toast.openSnackBar('User Updated Successfully');
        this.router.navigate(['/users']);
      },
      error: () => {
        this.toast.openSnackBar('Something went wrong. Unable to Update User');
      }
    });
  }
}

