import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountInfoComponent } from './pages/account-info.component';
import { AddProjectComponent } from './pages/add-project/add-project.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { CalenderComponent } from './pages/calender/calender.component';
import { DashboardComponent } from './pages/dashboard.component';
import { DataAnalysisComponent } from './pages/data-analysis/data-analysis.component';
import { HomeComponent } from './pages/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PermissionsComponent } from './pages/permissions/permissions.component';
import { ProgressSheetComponent } from './pages/progress-sheet/progress-sheet.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { RolesComponent } from './pages/roles/roles.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { UsersComponent } from './pages/users/users.component';
import { ViewProjectComponent } from './pages/view-project/view-project.component';
import { ForgotpasswordComponent } from './pages/forgotpassword/forgotpassword.component';
import { ManagePermissionsComponent } from './pages/manage-permissions/manage-permissions.component';
import { AuthGuard } from './services/auth.guard';
import { CreatenewpasswordComponent } from './pages/createnewpassword/createnewpassword.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dpr',
    pathMatch: 'prefix',
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dpr',
    component: ProjectsComponent,
    canActivate:[AuthGuard]
  },
  // {
  //   path: 'dashbaord',
  //   component: DashboardComponent,
  // },
  // {
  //   path: 'account',
  //   component: AccountInfoComponent
  // },
  {
    path: 'add-project',
    component: AddProjectComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'add-project/:id',
    component: AddProjectComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'user-management',
    component: UserManagementComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'roles',
    component: RolesComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'permissions',
    component: PermissionsComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'manage-permissions',
    component: ManagePermissionsComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'add-user',
    component: AddUserComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'edit-user/:id',
    component: UserEditComponent,
    canActivate:[AuthGuard]
  },
  {path: 'forgotpassword', component: ForgotpasswordComponent},
  {path: 'createnewpassword', component: CreatenewpasswordComponent,
  canActivate:[AuthGuard],},

  {
    path: 'view-project',
    component: ViewProjectComponent,
    canActivate:[AuthGuard],
    children: [
      {path: '', redirectTo: 'data-analysis', pathMatch:'full'}, 
      {path: 'data-analysis/:id', component: DataAnalysisComponent,canActivate:[AuthGuard]},
      {path: 'progress-sheet/:id', component: ProgressSheetComponent,canActivate:[AuthGuard]},
      {path: 'calender/:id', component: CalenderComponent,canActivate:[AuthGuard]} 
      //{path: 'login', component: LoginComponent},
      //{path: 'forgotpassword', component: ForgotpasswordComponent},
      
    
    ]
  },
  {
    path: '**',
    redirectTo: 'dpr',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {}