import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RateApprovalListComponent } from './rate-approval-list/rate-approval-list.component';
import { RateApprovalUpdateComponent } from './rate-approval-update/rate-approval-update.component';
import { RateApprovalStatusUpdateComponent } from './rate-approval-status-update/rate-approval-status-update.component';
import { RateComparativeVendorsModule } from '@component/rate-comparative/rate-comparative-vendors/rate-comparative-vendors.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CustomMaterialModule } from 'app/ang-material.module';
import { DirectiveModule } from 'app/shared/directives/directive.module';
import { VendorRateListingComponent } from './vendor-rate-listing/vendor-rate-listing.component';

const routes: Routes = [
  {
    path: "",
    component: RateApprovalListComponent
  },
  {
    path: "update/:id",
    component: RateApprovalUpdateComponent
  },

];

@NgModule({
  declarations: [
    RateApprovalListComponent,
    RateApprovalUpdateComponent,
    RateApprovalStatusUpdateComponent,
    VendorRateListingComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CustomMaterialModule,
    ReactiveFormsModule,
    RateComparativeVendorsModule,
    DirectiveModule,
    [RouterModule.forChild(routes)],
  ]
})
export class RateApprovalModule { }
