import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { NewRoleComponent } from '../new-role/new-role.component';
import { MatDialog } from '@angular/material/dialog';
import { NewPermissionComponent } from '../new-permission/new-permission.component';
import { RolesService } from '@services/roles.service';
import { MatTableDataSource } from '@angular/material/table';
import { ToastService } from '@services/toast.service';
import { RoleEditComponent } from '../role-edit/role-edit.component';
import { SelectionModel } from '@angular/cdk/collections';
import { RolesDeleteMultipleComponent } from '../roles-delete-multiple/roles-delete-multiple.component';
import { RecentActivityService } from '@services/recent-activity.service';
import * as moment from 'moment';
import { NoPermissionsComponent } from '../no-permissions/no-permissions.component';
import { RequestService } from '@services/https/request.service';
import { AuthService } from '@services/auth/auth.service';
import { UsersService } from '@services/users.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import { Router, ActivatedRoute } from '@angular/router';

export interface PeriodicElement {
  SelectAll: string;
  sNo: string;
  role: string;
  Action: string;
}
@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
})
export class RolesComponent implements OnInit {
  selection = new SelectionModel<any>(true, []);

  animal: string;
  name: string;
  roles: any;
  checked = false;
  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  hidePageSize = false;
  showPageSizeOptions = false;
  showFirstLastButtons = true;
  disabled = false;
  displayedColumns = ['SelectAll', 'sNo', 'role', 'Action'];
  dataSource = null;
  pageEvent: PageEvent;
  permissions: any;
  rolesPermissionsView: any;
  rolesPermissionsEdit: any;
  rolesPermissionsAdd: any;
  rolesPermissionsDelete: any;
  rolesPermissionsDeleteMul: any;

  viewPermission: any;
  editPermission: any;
  addPermission: any;
  deletePermission: any;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput
        .split(',')
        .map((str) => +str);
    }
  }
  recentActivities: any;
  recentActivitiesLen: any;
  constructor(
    private httpService: RequestService,
    public dialog: MatDialog,
    private _dialog: MatDialog,
    private snack: SnackbarService,
    private auth: AuthService,
    private userService: UsersService,
    private recentActivityService: RecentActivityService,
    private roleService: RolesService,
    private toast: ToastService,
    private router: Router
  ) {}
  addRole() {
    if (!this.addPermission) {
      const dialogRef = this._dialog.open(NoPermissionsComponent, {
        width: '30%',
        panelClass: [
          'custom-modal',
          'animate__animated',
          'animate__fadeInDown',
        ],
        data: "you don't have permissions to add role",
        //data: supply
      });
      return;
    }
    const dialogRef = this._dialog.open(NewRoleComponent, {
      width: '30%',
      panelClass: ['custom-modal', 'animate__animated', 'animate__fadeInDown'],
      //data: supply
    });
    dialogRef.afterClosed().subscribe((status) => {
      console.log(status);
      if (status === 'yes') {
        this.roleService.getRoles().subscribe((data) => {
          //this.spinner.hide()
          this.roles = data;
          this.dataSource = new MatTableDataSource(this.roles);
          this.dataSource.paginator = this.paginator;
          console.log(this.roles);
        });
        // this.filterSubject.next(this.filterForm.value);
      }
      if (status === 'no') {
      }
    });
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
        this.addPermission =
          resp.dashboard_permissions[0].ParentChildchecklist[3].childList[0].isSelected;
        this.editPermission =
          resp.dashboard_permissions[0].ParentChildchecklist[3].childList[1].isSelected;
        this.deletePermission =
          resp.dashboard_permissions[0].ParentChildchecklist[3].childList[2].isSelected;
        this.viewPermission =
          resp.dashboard_permissions[0].ParentChildchecklist[3].childList[3].isSelected;
      },
      error: (err) => {
        console.log(err);
      },
    });
    //console.log(this.progressPermissionsView)
    //console.log(this.progressPermissionsEdit)

    this.roleService.getRoles().subscribe((data) => {
      //this.spinner.hide()
      this.roles = data;
      this.dataSource = new MatTableDataSource(this.roles);
      this.dataSource.paginator = this.paginator;
      console.log(this.roles);
    });
    this.recentActivityService.getRecentAtivities().subscribe((data) => {
      this.recentActivities = data;
      for (let single of this.recentActivities) {
        single.time = moment(single.createdAt).fromNow();
      }
      this.recentActivitiesLen = this.recentActivities.length;
    });

  } else {
    this.snack.notify('Invalid Credentials - User Details not Valid', 1);
    this.auth.removeUser();
    this.userService.updateLogin('logout');
    this.router.navigate(['/login']);
  }
});
  }

  //dataSource = ELEMENT_DATA;

  deleteRole(id) {
    if (!this.deletePermission) {
      const dialogRef = this._dialog.open(NoPermissionsComponent, {
        width: '30%',
        panelClass: [
          'custom-modal',
          'animate__animated',
          'animate__fadeInDown',
        ],
        data: "you don't have permissions to delete role",
        //data: supply
      });
      return;
    }

    this.roleService.deleteRole(id).subscribe({
      next: (data: any) => {
        console.log(data);
        this.toast.openSnackBar('Role deleted Successfully');
        this.roleService.getRoles().subscribe((data) => {
          //this.spinner.hide()
          this.roles = data;
          this.dataSource = new MatTableDataSource(this.roles);
          this.dataSource.paginator = this.paginator;
          console.log(this.roles);
        });
      },
      error: (err) => {
        this.toast.openSnackBar('Something went wrong. Unable to delete role');
      },
    });
  }

  editRole(ele) {
    if (!this.editPermission) {
      const dialogRef = this._dialog.open(NoPermissionsComponent, {
        width: '30%',
        panelClass: [
          'custom-modal',
          'animate__animated',
          'animate__fadeInDown',
        ],
        data: "you don't have permissions to edit role",
        //data: supply
      });
      return;
    }

    const dialogRef = this._dialog.open(RoleEditComponent, {
      width: '30%',
      panelClass: ['custom-modal', 'animate__animated', 'animate__fadeInDown'],
      data: ele,
    });
    dialogRef.afterClosed().subscribe((status) => {
      console.log(status);
      if (status === 'yes') {
        this.roleService.getRoles().subscribe((data) => {
          //this.spinner.hide()
          this.roles = data;
          this.dataSource = new MatTableDataSource(this.roles);
          this.dataSource.paginator = this.paginator;
          console.log(this.roles);
        });
        // this.filterSubject.next(this.filterForm.value);
      }
      if (status === 'no') {
      }
    });
  }

  applyFilter(filterValue: any) {
    filterValue = filterValue.target.value.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  isAllSelected() {
    if (this.dataSource) {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    } else {
      return false;
    }
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.dataSource) {
      this.isAllSelected()
        ? this.selection.clear()
        : this.dataSource.data.forEach((row) => this.selection.select(row));
    }
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row`;
  }

  deleteMultipleDialog() {
    if (!this.deletePermission) {
      const dialogRef = this._dialog.open(NoPermissionsComponent, {
        width: '30%',
        panelClass: [
          'custom-modal',
          'animate__animated',
          'animate__fadeInDown',
        ],
        data: "you don't have permissions to delete role",
        //data: supply
      });
      return;
    }

    if (this.selection.selected.length === 0) {
      this.toast.openSnackBar('Please select roles to delete');
      return;
    }
    const idArray = this.selection.selected.map((single) => single._id);
    console.log(idArray);
    const dialogRef = this._dialog.open(RolesDeleteMultipleComponent, {
      width: '30%',
      panelClass: ['custom-modal', 'animate__animated', 'animate__fadeInDown'],
      data: idArray,
    });
    dialogRef.afterClosed().subscribe((status) => {
      console.log(status);
      if (status === 'yes') {
        this.selection.clear();
        this.roleService.getRoles().subscribe((data) => {
          //this.spinner.hide()
          this.roles = data;
          this.dataSource = new MatTableDataSource(this.roles);
          this.dataSource.paginator = this.paginator;
          console.log(this.roles);
        });
      }
      if (status === 'no') {
      }
    });
  }
}

// const ELEMENT_DATA: PeriodicElement [] = [

//   {SelectAll:'' , No: '1', Name: 'Safiya', Email: 'abc@gmail.com',Roles:'develop',
//   Action:'', },
//   {SelectAll:'' , No: '2', Name: 'Safiya', Email: 'abc@gmail.com',Roles:'develop',
//   Action:'', },
//   {SelectAll:'' , No: '3', Name: 'Safiya', Email: 'abc@gmail.com',Roles:'develop',
//   Action:'', },

//   {SelectAll:'' , No: '4', Name: 'Safiya', Email: 'abc@gmail.com',Roles:'develop',
//   Action:'', },
//   {SelectAll:'' , No: '4', Name: 'Safiya', Email: 'abc@gmail.com',Roles:'develop',
//   Action:'', },
//   {SelectAll:'' , No: '4', Name: 'Safiya', Email: 'abc@gmail.com',Roles:'develop',
//   Action:'', },
//   {SelectAll:'' , No: '4', Name: 'Safiya', Email: 'abc@gmail.com',Roles:'develop',
//   Action:'', },

// ];

// const ELEMENT_DATA: PeriodicElement [] = [

//   {SelectAll:'' , No: '1', Name: 'Admin', Action:'', },
//   {SelectAll:'' , No: '2', Name: 'Employee', Action:'', },

// ];
