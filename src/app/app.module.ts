import { NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
//import { FullCalendarModule } from '@fullcalendar/angular';
import { AccountInfoComponent } from './pages/account-info.component';
import { DashboardComponent } from './pages/dashboard.component';
import { HomeComponent } from './pages/home.component';
import { AddProjectComponent } from './pages/add-project/add-project.component';
import { ViewProjectComponent } from './pages/view-project/view-project.component';
import { DataAnalysisComponent } from './pages/data-analysis/data-analysis.component';
import { CalenderComponent } from './pages/calender/calender.component';
import { ProgressSheetComponent } from './pages/progress-sheet/progress-sheet.component';
import { CustomMaterialModule } from './ang-material.module';
import { ProjectsComponent } from './pages/projects/projects.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddTasksComponent } from './pages/add-tasks/add-tasks.component';
import { AddSubTasksComponent } from './pages/add-sub-tasks/add-sub-tasks.component';
import {  NgCircleProgressModule }from 'ng-circle-progress';
import { LoginComponent } from './pages/login/login.component';
import { AddMemberComponent } from './pages/add-member/add-member.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { UsersComponent } from './pages/users/users.component';
import { RolesComponent } from './pages/roles/roles.component';
import { PermissionsComponent } from './pages/permissions/permissions.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { ForgotpasswordComponent } from './pages/forgotpassword/forgotpassword.component';
import { NewRoleComponent } from './pages/new-role/new-role.component';
import { NewPermissionComponent } from './pages/new-permission/new-permission.component';
import { AddDataComponent } from './pages/add-data/add-data.component';
import { ManagePermissionsComponent } from './pages/manage-permissions/manage-permissions.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import { AuthGuard } from './services/auth.guard';
import { CreatenewpasswordComponent } from './pages/createnewpassword/createnewpassword.component';

// FullCalendarModule.registerPlugins([ // register FullCalendar plugins
//   dayGridPlugin,
//   interactionPlugin
// ]);


@NgModule({
  imports:      [ AppRoutingModule, BrowserModule,ReactiveFormsModule,HttpClientModule, FormsModule, CoreModule, SharedModule, CustomMaterialModule,
    FlexLayoutModule,
    FullCalendarModule ,
    NgCircleProgressModule.forRoot({

    
      radius:60,
      space:-10,
      outerStrokeGradient:false,
      outerStrokeWidth:20,
      outerStrokeGradientStopColor:'false',
      innerStrokeColor:'false',
      showInnerStroke: true,
      innerStrokeWidth:10,
      subtitle:'',
      title:'',
      animateTitle: false,
      animationDuration:100,
      showUnits:true,
      showBackground:false,
      clockwise:true,
      startFromZero:false,
     
      
    }),
   
     BrowserAnimationsModule,
  ],
  declarations: [ AppComponent, HomeComponent, DashboardComponent, AccountInfoComponent, AddProjectComponent, ViewProjectComponent, DataAnalysisComponent, CalenderComponent, ProgressSheetComponent, ProjectsComponent, AddTasksComponent, AddSubTasksComponent,LoginComponent, AddMemberComponent, UserManagementComponent, UsersComponent, RolesComponent, PermissionsComponent, AddUserComponent,
    ForgotpasswordComponent, NewRoleComponent,NewPermissionComponent, AddDataComponent, ManagePermissionsComponent,CreatenewpasswordComponent],
    providers:[AuthGuard],
    schemas: [
      CUSTOM_ELEMENTS_SCHEMA,
      //NO_ERRORS_SCHEMA
    ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
