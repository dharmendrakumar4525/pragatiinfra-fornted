import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component/app.component';
import { AppRoutingModule } from './routing/app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
import { NgCircleProgressModule } from 'ng-circle-progress';
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
import { AuthGuard } from '@services/auth.guard';
import { CreatenewpasswordComponent } from './pages/createnewpassword/createnewpassword.component';
import { NoPermissionsComponent } from './pages/no-permissions/no-permissions.component';
import { RoleEditComponent } from './pages/role-edit/role-edit.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';
import { UsersDeleteMultipleComponent } from './pages/users-delete-multiple/users-delete-multiple.component';
import { RolesDeleteMultipleComponent } from './pages/roles-delete-multiple/roles-delete-multiple.component';
import { SearchPipe } from '@services/search.pipe';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { SubActivitySearchPipe } from '@services/subActivity.pipe';
import { MasteruserComponent } from './pages/masteruser/masteruser.component';
import { MasterCreateuserComponent } from './pages/master-createuser/master-createuser.component';
import { InnerAddMemberComponent } from './pages/inner-add-member/inner-add-member.component';
import { EditActivityComponent } from './pages/edit-activity/edit-activity.component';
import { EditSubActivityComponent } from './pages/edit-sub-activity/edit-sub-activity.component';
import { TaskDeleteMulActivityComponent } from './pages/task-delete-mul-activity/task-delete-mul-activity.component';
import { DeleteMulSubActivityComponent } from './pages/delete-mul-sub-activity/delete-mul-sub-activity.component';
import { SubActivitiesComponent } from './pages/sub-activities/sub-activities.component';
import { EditSubActivitiesComponent } from './pages/edit-sub-activities/edit-sub-activities.component';
import { AddSubActivitiesComponent } from './pages/add-sub-activities/add-sub-activities.component';
import { MenuSearchPipe } from '@services/menuSearch.pipe';
import { CommonModule } from '@angular/common';
import { SitemasterComponent } from './Procurement/sitemaster/sitemaster.component';
import { OrgmasterComponent } from './Procurement/orgmaster/orgmaster.component';
import { ItemmasterComponent } from './Procurement/itemmaster/itemmaster.component';
import { VendormasterComponent } from './Procurement/vendormaster/vendormaster.component';
import { CategorymanagementComponent } from './Procurement/categorymanagement/categorymanagement.component';
import { PurchaserequestComponent } from './Procurement/purchaserequest/purchaserequest.component';
import { PurchasereqlistComponent } from './Procurement/purchasereqlist/purchasereqlist.component';
import { RequisitionapprovalsComponent } from './Procurement/requisitionapprovals/requisitionapprovals.component';
import { ApprovedsummaryComponent } from './Procurement/approvedsummary/approvedsummary.component';
import { RejectedsummaryComponent } from './Procurement/rejectedsummary/rejectedsummary.component';
import { PendingsummaryComponent } from './Procurement/pendingsummary/pendingsummary.component';
import { RevisedpurchasereqlistComponent } from './Procurement/revisedpurchasereqlist/revisedpurchasereqlist.component';
import { ApprovedmaterialrequestComponent } from './Procurement/approvedmaterialrequest/approvedmaterialrequest.component';
import { RejectedpurchaserequestComponent } from './Procurement/rejectedpurchaserequest/rejectedpurchaserequest.component';
import { PendingpurchaserequestComponent } from './Procurement/pendingpurchaserequest/pendingpurchaserequest.component';
import { RatecomparativeComponent } from './Procurement/Ratecomparative/ratecomparative/ratecomparative.component';
import { RcomparativeComponent } from './Procurement/Ratecomparative/rcomparative/rcomparative.component';
import { RateapprovallistComponent } from './Procurement/Ratecomparative/rateapprovallist/rateapprovallist.component';
import { RevisedrateapprovallistComponent } from './Procurement/Ratecomparative/revisedrateapprovallist/revisedrateapprovallist.component';
import { VendorscomparativeapprovedComponent } from './Procurement/Ratecomparative/vendorscomparativeapproved/vendorscomparativeapproved.component';
import { VendorscomparativerejectedComponent } from './Procurement/Ratecomparative/vendorscomparativerejected/vendorscomparativerejected.component';
import { VendorscomparativerevisedComponent } from './Procurement/Ratecomparative/vendorscomparativerevised/vendorscomparativerevised.component';
import { RateapprovalsComponent } from './Procurement/Ratecomparative/rateapprovals/rateapprovals.component';
import { RateapprovalsummaryComponent } from './Procurement/Ratecomparative/rateapprovalsummary/rateapprovalsummary.component';
import { RejectedratessummaryComponent } from './Procurement/Ratecomparative/rejectedratessummary/rejectedratessummary.component';
import { PendingratesComponent } from './Procurement/Ratecomparative/pendingrates/pendingrates.component';
import { VendorSelectionComponent } from './Procurement/vendor-selection/vendor-selection.component';
import { RejectReasonComponent } from './Procurement/reject-reason/reject-reason.component';
import { AddRemarksComponent } from './pages/add-remarks/add-remarks.component';
import { ProjectDeletePopupComponent } from './pages/project-delete-popup/project-delete-popup.component';
import { PolistComponent } from './Procurement/Purchaseorder/polist/polist.component';
import { PomapproverComponent } from './Procurement/Purchaseorder/pomapprover/pomapprover.component';
import { ApprovedpoComponent } from './Procurement/Purchaseorder/approvedpo/approvedpo.component';
import { RejectedpoComponent } from './Procurement/Purchaseorder/rejectedpo/rejectedpo.component';
import { PendingpoComponent } from './Procurement/Purchaseorder/pendingpo/pendingpo.component';
import { ApoVendorpostatusComponent } from './Procurement/Purchaseorder/apo-vendorpostatus/apo-vendorpostatus.component';
import { PomcreatorComponent } from './Procurement/Purchaseorder/pomcreator/pomcreator.component';
import { PotokenComponent } from './Procurement/Purchaseorder/potoken/potoken.component';
import { RejectedpomComponent } from './Procurement/Purchaseorder/rejectedpom/rejectedpom.component';
import { PomcreatorEsignComponent } from './Procurement/Purchaseorder/pomcreator-esign/pomcreator-esign.component';
import { InventoryComponent } from './Procurement/inventory/inventory.component';
import { PrstatusComponent } from './Procurement/prstatus/prstatus.component';
import { ModifyRemarksComponent } from './pages/modify-remarks/modify-remarks.component';
import { CookieModule } from 'ngx-cookie';
import { NgxLocalStorageModule } from 'ngx-localstorage';
import { LocationPopupModule } from '@component/project/location-popup/location-popup.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ConfirmationPopupModule } from '@component/project/confirmation-popup/confirmation-popup.module';
import { MinTableDateModule } from '@pipe/min-table-date/min-table-date.module';
import { DirectiveModule } from './shared/directives/directive.module';
import { JwtModule } from "@auth0/angular-jwt";

export function tokenGetter() {
  return 'TOKNE';
}

@NgModule({
  imports: [AppRoutingModule, BrowserModule, ReactiveFormsModule, HttpClientModule, FormsModule, CoreModule, SharedModule, CustomMaterialModule,
    FlexLayoutModule,
    JwtModule.forRoot({
      config: {
          tokenGetter: tokenGetter,
          allowedDomains: ['localhost:4200/'],
          disallowedRoutes: ['']
      }
  }),
    FullCalendarModule,
    MatTooltipModule,
    NgxLocalStorageModule.forRoot(),
    CommonModule,
    CookieModule.withOptions(),
    NgCircleProgressModule.forRoot({
      radius: 60,
      space: -10,
      outerStrokeGradient: false,
      outerStrokeWidth: 20,
      outerStrokeGradientStopColor: 'false',
      innerStrokeColor: 'false',
      showInnerStroke: true,
      innerStrokeWidth: 10,
      subtitle: '',
      title: '',
      animateTitle: false,
      animationDuration: 100,
      showUnits: true,
      showBackground: false,
      clockwise: true,
      startFromZero: false,


    }),
    BrowserAnimationsModule,
    LocationPopupModule,
    ConfirmationPopupModule,
    MinTableDateModule,
    DirectiveModule
  ],
  declarations: [AppComponent, HomeComponent, SearchPipe, SubActivitySearchPipe, DashboardComponent, AccountInfoComponent, AddProjectComponent, ViewProjectComponent, DataAnalysisComponent, CalenderComponent, ProgressSheetComponent, ProjectsComponent, AddTasksComponent, AddSubTasksComponent, LoginComponent, AddMemberComponent, UserManagementComponent, UsersComponent, RolesComponent, PermissionsComponent, AddUserComponent,
    ForgotpasswordComponent, NewRoleComponent, NewPermissionComponent, AddDataComponent, ManagePermissionsComponent, CreatenewpasswordComponent, NoPermissionsComponent, RoleEditComponent, UserEditComponent, UsersDeleteMultipleComponent, RolesDeleteMultipleComponent, AboutUsComponent, MasteruserComponent, MasterCreateuserComponent, InnerAddMemberComponent, EditActivityComponent, EditSubActivityComponent, TaskDeleteMulActivityComponent, DeleteMulSubActivityComponent, SubActivitiesComponent, EditSubActivitiesComponent, AddSubActivitiesComponent, SitemasterComponent,
    OrgmasterComponent, ItemmasterComponent, VendormasterComponent, CategorymanagementComponent, PurchaserequestComponent, PurchasereqlistComponent, RequisitionapprovalsComponent, ApprovedsummaryComponent, RejectedsummaryComponent, PendingsummaryComponent, RevisedpurchasereqlistComponent, ApprovedmaterialrequestComponent, RejectedpurchaserequestComponent, PendingpurchaserequestComponent, RatecomparativeComponent, RcomparativeComponent, RateapprovallistComponent, RevisedrateapprovallistComponent, VendorscomparativeapprovedComponent, VendorscomparativerejectedComponent,
    VendorscomparativerevisedComponent, RateapprovalsComponent, RateapprovalsummaryComponent, RejectedratessummaryComponent, PendingratesComponent, VendorSelectionComponent, RejectReasonComponent, AddRemarksComponent, ProjectDeletePopupComponent, PolistComponent, PomapproverComponent, ApprovedpoComponent, RejectedpoComponent, PendingpoComponent, ApoVendorpostatusComponent, PomcreatorComponent, PotokenComponent, RejectedpomComponent, PomcreatorEsignComponent, InventoryComponent, PrstatusComponent, ModifyRemarksComponent],
  providers: [AuthGuard],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    //NO_ERRORS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
