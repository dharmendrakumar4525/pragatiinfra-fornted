import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RolesService } from '@services/roles.service';
import { ToastService } from '@services/toast.service';
import { RequestService } from '@services/https/request.service';
import { AuthService } from '@services/auth/auth.service';
import { UsersService } from '@services/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SnackbarService } from '@services/snackbar/snackbar.service';

@Component({
  selector: 'app-manage-permissions',
  templateUrl: './manage-permissions.component.html',
  styleUrls: ['./manage-permissions.component.scss'],
})
export class ManagePermissionsComponent implements OnInit {
  title = 'CheckList for Parents and Child Structure with Expand/ Collapse';
  data: any;
  permi: any;
  userRolePermissions: any;
  roles: any;
  editPermission: any;
  permissions: any;

  roleForm: FormGroup = this._fb.group({
    role: [null, [Validators.required]],
  });
  roleType: any;

  permissionsObj = {
    dashboard_permissions: null,
  };
  dashboard_permissions;
  newOne: any;
  constructor(
    private httpService: RequestService,
    private _fb: FormBuilder,
    private roleService: RolesService,
    private toast: ToastService,
    private snack: SnackbarService,
    
    private auth: AuthService,
    private userService: UsersService,
    private router: Router
  ) {
    this.data = {};
    this.data.isAllSelected = false;
    this.data.isAllCollapsed = false;

    //List object having hierarchy of parents and its children
    this.data.ParentChildchecklist = [
      {
        id: 1,
        moduleName: 'projects',
        isSelected: false,
        isClosed: false,
        childList: [
          {
            id: 1,
            parent_id: 1,
            value: 'add',
            isSelected: false,
          },

          {
            id: 5,
            parent_id: 1,
            value: 'view',
            isSelected: false,
          },
          {
            id: 3,
            parent_id: 1,
            value: 'Edit',
            isSelected: false,
          },

          {
            id: 6,
            parent_id: 1,
            value: 'Delete',
            isSelected: false,
          },
        ],
      },

      {
        id: 2,
        moduleName: 'progress_sheet',
        isSelected: false,
        isClosed: false,
        childList: [
          {
            id: 2,
            parent_id: 1,
            value: 'edit',
            isSelected: false,
          },
          {
            id: 5,
            parent_id: 1,
            value: 'view',
            isSelected: false,
          },
        ],
      },

      {
        id: 3,
        moduleName: 'calender',
        isSelected: false,
        isClosed: false,
        childList: [
          {
            id: 1,
            parent_id: 1,
            value: 'add',
            isSelected: false,
          },
          {
            id: 5,
            parent_id: 1,
            value: 'view',
            isSelected: false,
          },
          {
            id: 5,
            parent_id: 1,
            value: 'remarks',
            isSelected: false,
          },
        ],
      },

      {
        id: 4,
        moduleName: 'roles',
        isSelected: false,
        isClosed: false,
        childList: [
          {
            id: 1,
            parent_id: 1,
            value: 'add',
            isSelected: false,
          },
          {
            id: 2,
            parent_id: 1,
            value: 'edit',
            isSelected: false,
          },
          {
            id: 3,
            parent_id: 1,
            value: 'delete',
            isSelected: false,
          },
          // {
          //   id: 4,parent_id: 1,value: 'deleteMultiple',isSelected: false
          // },
          {
            id: 5,
            parent_id: 1,
            value: 'view',
            isSelected: false,
          },
        ],
      },

      {
        id: 5,
        moduleName: 'users',
        isSelected: false,
        isClosed: false,
        childList: [
          {
            id: 1,
            parent_id: 1,
            value: 'add',
            isSelected: false,
          },
          {
            id: 2,
            parent_id: 1,
            value: 'edit',
            isSelected: false,
          },
          {
            id: 3,
            parent_id: 1,
            value: 'delete',
            isSelected: false,
          },
          // {
          //   id: 4,parent_id: 1,value: 'deleteMultiple',isSelected: false
          // },
          {
            id: 5,
            parent_id: 1,
            value: 'view',
            isSelected: false,
          },
        ],
      },

      {
        id: 7,
        moduleName: 'members',
        isSelected: false,
        isClosed: false,
        childList: [
          {
            id: 1,
            parent_id: 1,
            value: 'add',
            isSelected: false,
          },
        ],
      },

      {
        id: 4,
        moduleName: 'activities',
        isSelected: false,
        isClosed: false,
        childList: [
          {
            id: 1,
            parent_id: 1,
            value: 'add',
            isSelected: false,
          },
          {
            id: 2,
            parent_id: 1,
            value: 'edit',
            isSelected: false,
          },
          {
            id: 3,
            parent_id: 1,
            value: 'delete',
            isSelected: false,
          },
          // {
          //   id: 4,parent_id: 1,value: 'deleteMultiple',isSelected: false
          // },
          {
            id: 5,
            parent_id: 1,
            value: 'view',
            isSelected: false,
          },
        ],
      },

      {
        id: 4,
        moduleName: 'sub activities',
        isSelected: false,
        isClosed: false,
        childList: [
          {
            id: 1,
            parent_id: 1,
            value: 'add',
            isSelected: false,
          },
          {
            id: 2,
            parent_id: 1,
            value: 'edit',
            isSelected: false,
          },
          {
            id: 3,
            parent_id: 1,
            value: 'delete',
            isSelected: false,
          },
          // {
          //   id: 4,parent_id: 1,value: 'deleteMultiple',isSelected: false
          // },
          {
            id: 5,
            parent_id: 1,
            value: 'view',
            isSelected: false,
          },
        ],
      },

      {
        id: 4,
        moduleName: 'Location',
        isSelected: false,
        isClosed: false,
        childList: [
          {
            id: 1,
            parent_id: 1,
            value: 'add',
            isSelected: false,
          },
          {
            id: 2,
            parent_id: 1,
            value: 'edit',
            isSelected: false,
          },
          {
            id: 3,
            parent_id: 1,
            value: 'delete',
            isSelected: false,
          },
          // {
          //   id: 4,parent_id: 1,value: 'deleteMultiple',isSelected: false
          // },
          {
            id: 5,
            parent_id: 1,
            value: 'view',
            isSelected: false,
          },
        ],
      },
    ];
    this.newOne = [
      {
        id: 1,
        moduleName: 'projects',
        isSelected: false,
        isClosed: false,
        childList: [
          {
            id: 1,
            parent_id: 1,
            value: 'add',
            isSelected: false,
          },

          {
            id: 5,
            parent_id: 1,
            value: 'view',
            isSelected: false,
          },
          {
            id: 3,
            parent_id: 1,
            value: 'Edit',
            isSelected: false,
          },

          {
            id: 6,
            parent_id: 1,
            value: 'Delete',
            isSelected: false,
          },
        ],
      },

      {
        id: 2,
        moduleName: 'progress_sheet',
        isSelected: false,
        isClosed: false,
        childList: [
          {
            id: 2,
            parent_id: 1,
            value: 'edit',
            isSelected: false,
          },
          {
            id: 5,
            parent_id: 1,
            value: 'view',
            isSelected: false,
          },
        ],
      },

      {
        id: 3,
        moduleName: 'calender',
        isSelected: false,
        isClosed: false,
        childList: [
          {
            id: 1,
            parent_id: 1,
            value: 'add',
            isSelected: false,
          },
          {
            id: 5,
            parent_id: 1,
            value: 'view',
            isSelected: false,
          },
          {
            id: 5,
            parent_id: 1,
            value: 'remarks',
            isSelected: false,
          },
        ],
      },

      {
        id: 4,
        moduleName: 'roles',
        isSelected: false,
        isClosed: false,
        childList: [
          {
            id: 1,
            parent_id: 1,
            value: 'add',
            isSelected: false,
          },
          {
            id: 2,
            parent_id: 1,
            value: 'edit',
            isSelected: false,
          },
          {
            id: 3,
            parent_id: 1,
            value: 'delete',
            isSelected: false,
          },
          // {
          //   id: 4,parent_id: 1,value: 'deleteMultiple',isSelected: false
          // },
          {
            id: 5,
            parent_id: 1,
            value: 'view',
            isSelected: false,
          },
        ],
      },

      {
        id: 5,
        moduleName: 'users',
        isSelected: false,
        isClosed: false,
        childList: [
          {
            id: 1,
            parent_id: 1,
            value: 'add',
            isSelected: false,
          },
          {
            id: 2,
            parent_id: 1,
            value: 'edit',
            isSelected: false,
          },
          {
            id: 3,
            parent_id: 1,
            value: 'delete',
            isSelected: false,
          },
          // {
          //   id: 4,parent_id: 1,value: 'deleteMultiple',isSelected: false
          // },
          {
            id: 5,
            parent_id: 1,
            value: 'view',
            isSelected: false,
          },
        ],
      },

      {
        id: 7,
        moduleName: 'members',
        isSelected: false,
        isClosed: false,
        childList: [
          {
            id: 1,
            parent_id: 1,
            value: 'add',
            isSelected: false,
          },
        ],
      },

      {
        id: 4,
        moduleName: 'activities',
        isSelected: false,
        isClosed: false,
        childList: [
          {
            id: 1,
            parent_id: 1,
            value: 'add',
            isSelected: false,
          },
          {
            id: 2,
            parent_id: 1,
            value: 'edit',
            isSelected: false,
          },
          {
            id: 3,
            parent_id: 1,
            value: 'delete',
            isSelected: false,
          },
          // {
          //   id: 4,parent_id: 1,value: 'deleteMultiple',isSelected: false
          // },
          {
            id: 5,
            parent_id: 1,
            value: 'view',
            isSelected: false,
          },
        ],
      },

      {
        id: 4,
        moduleName: 'sub activities',
        isSelected: false,
        isClosed: false,
        childList: [
          {
            id: 1,
            parent_id: 1,
            value: 'add',
            isSelected: false,
          },
          {
            id: 2,
            parent_id: 1,
            value: 'edit',
            isSelected: false,
          },
          {
            id: 3,
            parent_id: 1,
            value: 'delete',
            isSelected: false,
          },
          // {
          //   id: 4,parent_id: 1,value: 'deleteMultiple',isSelected: false
          // },
          {
            id: 5,
            parent_id: 1,
            value: 'view',
            isSelected: false,
          },
        ],
      },

      {
        id: 4,
        moduleName: 'Location',
        isSelected: false,
        isClosed: false,
        childList: [
          {
            id: 1,
            parent_id: 1,
            value: 'add',
            isSelected: false,
          },
          {
            id: 2,
            parent_id: 1,
            value: 'edit',
            isSelected: false,
          },
          {
            id: 3,
            parent_id: 1,
            value: 'delete',
            isSelected: false,
          },
          // {
          //   id: 4,parent_id: 1,value: 'deleteMultiple',isSelected: false
          // },
          {
            id: 5,
            parent_id: 1,
            value: 'view',
            isSelected: false,
          },
        ],
      },
    ];
  }

  ngOnInit(): void {
    this.permissions = JSON.parse(localStorage.getItem('loginData'));
    this.userService.getUserss().subscribe((users) => {
      const currentUser = users.find(
        (user) => user._id === this.permissions.user._id
      );

      if (currentUser) {
    const rolePermission = this.permissions.user.role;
    const GET_ROLE_API_PERMISSION = `/roles/role/${rolePermission}`;
    this.httpService.GET(GET_ROLE_API_PERMISSION, {}).subscribe({
      next: (resp: any) => {
        this.editPermission =
          resp.dashboard_permissions[0].ParentChildchecklist[3].childList[1].isSelected;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.roleService.getRoles().subscribe((data) => {
      this.roles = data;
    });
  } else {
    this.snack.notify('Invalid Credentials - User Details not Valid', 1);
    this.auth.removeUser();
    this.userService.updateLogin('logout');
    this.router.navigate(['/login']);
  }
});
  }

  getPermissions(type) {
    console.log(type);

    this.roleType = type;

    this.roleService.getByRole(type).subscribe((data) => {
      console.log(data);
      this.userRolePermissions = data;

      if (!this.userRolePermissions?.dashboard_permissions.length) {
        this.userRolePermissions.dashboard_permissions = this.newOne;
        this.data.ParentChildchecklist = this.newOne;
      } else {
        this.data.ParentChildchecklist =
          this.userRolePermissions?.dashboard_permissions[0]?.ParentChildchecklist;
      }
    });
  }

  parentCheck(parentObj) {
    for (var i = 0; i < parentObj.childList.length; i++) {
      parentObj.childList[i].isSelected = parentObj.isSelected;
    }
  }

  //Click event on child checkbox
  childCheck(parentObj, childObj) {
    parentObj.isSelected = childObj.every(function (itemChild: any) {
      return itemChild.isSelected == true;
    });
  }

  //Click event on master select
  selectUnselectAll(obj) {
    obj.isAllSelected = !obj.isAllSelected;
    for (var i = 0; i < obj.ParentChildchecklist.length; i++) {
      obj.ParentChildchecklist[i].isSelected = obj.isAllSelected;
      for (var j = 0; j < obj.ParentChildchecklist[i].childList.length; j++) {
        obj.ParentChildchecklist[i].childList[j].isSelected = obj.isAllSelected;
      }
    }
  }

  //Expand/Collapse event on each parent
  expandCollapse(obj) {
    obj.isClosed = !obj.isClosed;
  }

  //Master expand/ collapse event
  expandCollapseAll(obj) {
    for (var i = 0; i < obj.ParentChildchecklist.length; i++) {
      obj.ParentChildchecklist[i].isClosed = !obj.isAllCollapsed;
    }
    obj.isAllCollapsed = !obj.isAllCollapsed;
  }

  //Just to show updated JSON object on view
  stringify(obj) {
    this.permi = obj;

    console.log(this.permi);

    return JSON.stringify(obj);
  }

  async addPermissions() {
    if (this.roleForm.invalid) {
      this.toast.openSnackBar('Please select role');
      //this.clearForm = true;
      //this.clearForm = true;
      this.roleForm.markAllAsTouched();
      return;
    }
    //this.roleForm.value.dashboard_permissions = this.permi

    //console.log(this.roleForm.value)

    // console.log(this.permi)

    // this.permissionsObj.dashboard_permissions = this.permi

    // console.log(this.permissionsObj.dashboard_permissions)

    this.roleService
      .addPermissionsToRoles(this.roleType, this.data)
      .subscribe((data) => {
        console.log(data);
        this.toast.openSnackBar('Permissions updated Successfully');
      });

    //this.roleForm.value
  }

  get taskName(): AbstractControl {
    return this.roleForm.get('taskName');
  }
}
