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
const routes: Routes = [
  {
    path: 'dpr',
    component: ProjectsComponent
  },
  {
    path: 'dashbaord',
    component: DashboardComponent
  },
  {
    path: 'account',
    component: AccountInfoComponent
  },
  {
    path: 'add-project',
    component: AddProjectComponent
  },
  {
    path: 'user-management',
    component: UserManagementComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'roles',
    component: RolesComponent
  },
  {
    path: 'permissions',
    component: PermissionsComponent
  },
  {
    path: 'add-user',
    component: AddUserComponent
  },
  {path: 'forgotpassword', component: ForgotpasswordComponent},
  {
    path: 'view-project',
    component: ViewProjectComponent,
    children: [
      {path: '', redirectTo: 'data-analysis', pathMatch:'full'}, 
      {path: 'data-analysis', component: DataAnalysisComponent},
      {path: 'progress-sheet', component: ProgressSheetComponent},
      {path: 'calender', component: CalenderComponent}, 
      {path: 'login', component: LoginComponent},
      {path: 'forgotpassword', component: ForgotpasswordComponent},
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