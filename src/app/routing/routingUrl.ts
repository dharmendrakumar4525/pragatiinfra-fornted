import { Routes } from '@angular/router';

import { AccountInfoComponent } from '../pages/account-info.component';
import { AddProjectComponent } from '../pages/add-project/add-project.component';
import { AddUserComponent } from '../pages/add-user/add-user.component';
import { CalenderComponent } from '../pages/calender/calender.component';
import { DashboardComponent } from '../pages/dashboard.component';
import { DataAnalysisComponent } from '../pages/data-analysis/data-analysis.component';
import { HomeComponent } from '../pages/home.component';
import { LoginComponent } from '../pages/login/login.component';
import { PermissionsComponent } from '../pages/permissions/permissions.component';
import { ProgressSheetComponent } from '../pages/progress-sheet/progress-sheet.component';
import { ProjectsComponent } from '../pages/projects/projects.component';
import { RolesComponent } from '../pages/roles/roles.component';
import { UserManagementComponent } from '../pages/user-management/user-management.component';
import { UsersComponent } from '../pages/users/users.component';
import { ViewProjectComponent } from '../pages/view-project/view-project.component';
import { ForgotpasswordComponent } from '../pages/forgotpassword/forgotpassword.component';
import { ManagePermissionsComponent } from '../pages/manage-permissions/manage-permissions.component';
import { AuthGuard } from '@services//auth.guard';
import { CreatenewpasswordComponent } from '../pages/createnewpassword/createnewpassword.component';
import { UserEditComponent } from '../pages/user-edit/user-edit.component';
import { MasteruserComponent } from '../pages/masteruser/masteruser.component';
import { MasterCreateuserComponent } from '../pages/master-createuser/master-createuser.component';
import { SubActivitiesComponent } from '../pages/sub-activities/sub-activities.component';
import { EditSubActivitiesComponent } from '../pages/edit-sub-activities/edit-sub-activities.component';
import { AddSubActivitiesComponent } from '../pages/add-sub-activities/add-sub-activities.component';
import { EditSubActivityComponent } from '../pages/edit-sub-activity/edit-sub-activity.component';
import { SitemasterComponent } from '../Procurement/sitemaster/sitemaster.component';
import { OrgmasterComponent } from '../Procurement/orgmaster/orgmaster.component';
import { ItemmasterComponent } from '../Procurement/itemmaster/itemmaster.component';
import { VendormasterComponent } from '../Procurement/vendormaster/vendormaster.component';
import { CategorymanagementComponent } from '../Procurement/categorymanagement/categorymanagement.component';
import { PurchaserequestComponent } from '../Procurement/purchaserequest/purchaserequest.component';
import { PurchasereqlistComponent } from '../Procurement/purchasereqlist/purchasereqlist.component';
import { RequisitionapprovalsComponent } from '../Procurement/requisitionapprovals/requisitionapprovals.component';
import { ApprovedsummaryComponent } from '../Procurement/approvedsummary/approvedsummary.component';
import { RejectedsummaryComponent } from '../Procurement/rejectedsummary/rejectedsummary.component';
import { PendingsummaryComponent } from '../Procurement/pendingsummary/pendingsummary.component';
import { RevisedpurchasereqlistComponent } from '../Procurement/revisedpurchasereqlist/revisedpurchasereqlist.component';
import { ApprovedmaterialrequestComponent } from '../Procurement/approvedmaterialrequest/approvedmaterialrequest.component';
import { RejectedpurchaserequestComponent } from '../Procurement/rejectedpurchaserequest/rejectedpurchaserequest.component';
import { PendingpurchaserequestComponent } from '../Procurement/pendingpurchaserequest/pendingpurchaserequest.component';
import { RatecomparativeComponent } from '../Procurement/Ratecomparative/ratecomparative/ratecomparative.component';
import { RcomparativeComponent } from '../Procurement/Ratecomparative/rcomparative/rcomparative.component';
import { RateapprovallistComponent } from '../Procurement/Ratecomparative/rateapprovallist/rateapprovallist.component';
import { RevisedrateapprovallistComponent } from '../Procurement/Ratecomparative/revisedrateapprovallist/revisedrateapprovallist.component';
import { VendorscomparativeapprovedComponent } from '../Procurement/Ratecomparative/vendorscomparativeapproved/vendorscomparativeapproved.component';
import { VendorscomparativerejectedComponent } from '../Procurement/Ratecomparative/vendorscomparativerejected/vendorscomparativerejected.component';
import { VendorscomparativerevisedComponent } from '../Procurement/Ratecomparative/vendorscomparativerevised/vendorscomparativerevised.component';
import { RateapprovalsComponent } from '../Procurement/Ratecomparative/rateapprovals/rateapprovals.component';
import { RateapprovalsummaryComponent } from '../Procurement/Ratecomparative/rateapprovalsummary/rateapprovalsummary.component';
import { RejectedratessummaryComponent } from '../Procurement/Ratecomparative/rejectedratessummary/rejectedratessummary.component';
import { PendingratesComponent } from '../Procurement/Ratecomparative/pendingrates/pendingrates.component';
import { VendorSelectionComponent } from '../Procurement/vendor-selection/vendor-selection.component';
import { RejectReasonComponent } from '../Procurement/reject-reason/reject-reason.component';
import { PolistComponent } from '../Procurement/Purchaseorder/polist/polist.component';
import { PomapproverComponent } from '../Procurement/Purchaseorder/pomapprover/pomapprover.component';
import { ApprovedpoComponent } from '../Procurement/Purchaseorder/approvedpo/approvedpo.component';
import { RejectedpoComponent } from '../Procurement/Purchaseorder/rejectedpo/rejectedpo.component';
import { PendingpoComponent } from '../Procurement/Purchaseorder/pendingpo/pendingpo.component';
import { ApoVendorpostatusComponent } from '../Procurement/Purchaseorder/apo-vendorpostatus/apo-vendorpostatus.component';
import { PomcreatorComponent } from '../Procurement/Purchaseorder/pomcreator/pomcreator.component';
import { PotokenComponent } from '../Procurement/Purchaseorder/potoken/potoken.component';
import { RejectedpomComponent } from '../Procurement/Purchaseorder/rejectedpom/rejectedpom.component';
import { PomcreatorEsignComponent } from '../Procurement/Purchaseorder/pomcreator-esign/pomcreator-esign.component';
import { InventoryComponent } from '../Procurement/inventory/inventory.component';
import { PrstatusComponent } from '../Procurement/prstatus/prstatus.component';

export const routes: Routes = [
  {
    path: 'procurement',
    loadChildren: () => import('./../components/procurment-module/procurment-module.module')
      .then(mod => mod.ProcurmentModuleModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'site',
    loadChildren: () => import('../components/site/site.module')
      .then(mod => mod.SiteModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'category',
    loadChildren: () => import('../components/category/category.module')
      .then(mod => mod.CategoryModule),
    canActivate: [AuthGuard]
  },


  {
    path: 'sub-category',
    loadChildren: () => import('../components/sub-category/sub-category.module')
      .then(mod => mod.SubCategoryModule),
    canActivate: [AuthGuard]
  },


  {
    path: 'vendor',
    loadChildren: () => import('../components/vendor/vendor.module')
      .then(mod => mod.VendorModule),
    canActivate: [AuthGuard]
  },


  {
    path: 'organisation',
    loadChildren: () => import('../components/organisation/organisation.module')
      .then(mod => mod.OrganisationModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'item',
    loadChildren: () => import('../components/item/item.module')
      .then(mod => mod.ItemModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'gst',
    loadChildren: () => import('../components/gst/gst.module')
      .then(mod => mod.GstModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'uom',
    loadChildren: () => import('../components/uom/uom.module')
      .then(mod => mod.UomModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'structure',
    loadChildren: () => import('../components/structure/structure.module')
      .then(mod => mod.StructureModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'location',
    loadChildren: () => import('../components/location/location.module')
      .then(mod => mod.LocationModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'activity',
    loadChildren: () => import('../components/activity/activity.module')
      .then(mod => mod.ActivityModule),
    canActivate: [AuthGuard]
  },

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
    canActivate: [AuthGuard]
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
    canActivate: [AuthGuard]
  },
  {
    path: 'add-project/:id',
    component: AddProjectComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-project/:id/edit-project/:name',
    component: AddProjectComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user-management',
    component: UserManagementComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'roles',
    component: RolesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'permissions',
    component: PermissionsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'manage-permissions',
    component: ManagePermissionsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-user',
    component: AddUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-user/:id',
    component: UserEditComponent,
    canActivate: [AuthGuard]
  },

  { path: 'forgotpassword', component: ForgotpasswordComponent },
  { path: 'createnewpassword', component: CreatenewpasswordComponent },
  { path: 'activities', component: MasteruserComponent, canActivate: [AuthGuard] },
  { path: 'sub-activities', component: SubActivitiesComponent, canActivate: [AuthGuard] },
  { path: 'edit-sub-activity/:id', component: EditSubActivityComponent, canActivate: [AuthGuard] },
  { path: 'add-sub-activities', component: AddSubActivitiesComponent, canActivate: [AuthGuard] },
  { path: 'sitemaster', component: SitemasterComponent, canActivate: [AuthGuard] },
  { path: 'orgmaster', component: OrgmasterComponent, canActivate: [AuthGuard] },
  { path: 'itemmaster', component: ItemmasterComponent, canActivate: [AuthGuard] },
  { path: 'vendormaster', component: VendormasterComponent, canActivate: [AuthGuard] },
  { path: 'categorymanagement', component: CategorymanagementComponent, canActivate: [AuthGuard] },
  { path: 'purchaserequest', component: PurchaserequestComponent, canActivate: [AuthGuard] },
  { path: 'purchasereqlist', component: PurchasereqlistComponent, canActivate: [AuthGuard] },
  { path: 'requisitionapprovals', component: RequisitionapprovalsComponent, canActivate: [AuthGuard] },
  { path: 'approvedsummary', component: ApprovedsummaryComponent, canActivate: [AuthGuard] },
  { path: 'rejectedsummary', component: RejectedsummaryComponent, canActivate: [AuthGuard] },
  { path: 'pendingsummary', component: PendingsummaryComponent, canActivate: [AuthGuard] },
  { path: 'revisedpurchasereqlist', component: RevisedpurchasereqlistComponent, canActivate: [AuthGuard] },
  { path: 'approvedmaterialrequest', component: ApprovedmaterialrequestComponent, canActivate: [AuthGuard] },
  { path: 'rejectedpurchaserequest', component: RejectedpurchaserequestComponent, canActivate: [AuthGuard] },
  { path: 'pendingpurchaserequest', component: PendingpurchaserequestComponent, canActivate: [AuthGuard] },
  { path: 'ratecomparative', component: RatecomparativeComponent, canActivate: [AuthGuard] },
  { path: 'rcomparative', component: RcomparativeComponent, canActivate: [AuthGuard] },
  { path: 'rateapprovallist', component: RateapprovallistComponent, canActivate: [AuthGuard] },
  { path: 'revisedrateapprovallist', component: RevisedrateapprovallistComponent, canActivate: [AuthGuard] },
  { path: 'vendorscomparativeapproved', component: VendorscomparativeapprovedComponent, canActivate: [AuthGuard] },
  { path: 'vendorscomparativerejected', component: VendorscomparativerejectedComponent, canActivate: [AuthGuard] },
  { path: 'vendorscomparativerevised', component: VendorscomparativerevisedComponent, canActivate: [AuthGuard] },
  { path: 'rateapprovals', component: RateapprovalsComponent, canActivate: [AuthGuard] },
  { path: 'rateapprovalsummary', component: RateapprovalsummaryComponent, canActivate: [AuthGuard] },
  { path: 'rejectedratessummary', component: RejectedratessummaryComponent, canActivate: [AuthGuard] },
  { path: 'pendingrates', component: PendingratesComponent, canActivate: [AuthGuard] },
  { path: 'vendor-selection', component: VendorSelectionComponent, canActivate: [AuthGuard] },
  { path: 'reject-reason', component: RejectReasonComponent, canActivate: [AuthGuard] },
  { path: 'polist', component: PolistComponent, canActivate: [AuthGuard] },
  { path: 'pomapprover', component: PomapproverComponent, canActivate: [AuthGuard] },
  { path: 'approvedpo', component: ApprovedpoComponent, canActivate: [AuthGuard] },
  { path: 'rejectedpo', component: RejectedpoComponent, canActivate: [AuthGuard] },
  { path: 'pendingpo', component: PendingpoComponent, canActivate: [AuthGuard] },
  { path: 'apovendorpostatus', component: ApoVendorpostatusComponent, canActivate: [AuthGuard] },
  { path: 'pomcreator', component: PomcreatorComponent, canActivate: [AuthGuard] },
  { path: 'potoken', component: PotokenComponent, canActivate: [AuthGuard] },
  { path: 'rejectedpom', component: RejectedpomComponent, canActivate: [AuthGuard] },
  { path: 'pomcreatoresign', component: PomcreatorEsignComponent, canActivate: [AuthGuard] },
  { path: 'inventory', component: InventoryComponent, canActivate: [AuthGuard] },
  { path: 'prstatus', component: PrstatusComponent, canActivate: [AuthGuard] },


  //{path: 'create-activities', component: MasterCreateuserComponent,canActivate:[AuthGuard]},


  {
    path: 'view-project',
    component: ViewProjectComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'data-analysis', pathMatch: 'full' },
      { path: 'data-analysis/:id', component: DataAnalysisComponent, canActivate: [AuthGuard] },
      { path: 'progress-sheet/:id', component: ProgressSheetComponent, canActivate: [AuthGuard] },
      { path: 'calender/:id', component: CalenderComponent, canActivate: [AuthGuard] }
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

