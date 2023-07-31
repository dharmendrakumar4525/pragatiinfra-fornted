import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DirectiveModule } from 'app/shared/directives/directive.module';
import { PurchaseRequestComponent } from './purchase-request/purchase-request.component';
import { PurchaseRequestDetailsComponent } from './purchase-request-details/purchase-request-details.component';
import { CustomMaterialModule } from 'app/ang-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PurchaseRequestListComponent } from './purchase-request-list/purchase-request-list.component';
import { RevisePurchaseRequestComponent } from './revise-purchase-request/revise-purchase-request.component';
import { UpdatePrStatusComponent } from './update-pr-status/update-pr-status.component';

const routes: Routes = [
  {
    path: "",
    component: PurchaseRequestComponent
  },

  {
    path: "prlist",
    component: PurchaseRequestListComponent
  },
  {
    path: "details/:id",
    component: PurchaseRequestDetailsComponent
  },
  {
    path: "update/:id",
    component: UpdatePrStatusComponent
  },
  {
    path: "revise/:id",
    component: RevisePurchaseRequestComponent
  },

];


@NgModule({
  declarations: [PurchaseRequestComponent, PurchaseRequestDetailsComponent, PurchaseRequestListComponent, RevisePurchaseRequestComponent, UpdatePrStatusComponent],
  imports: [
    CustomMaterialModule,
    CommonModule,
    ReactiveFormsModule,
    DirectiveModule,
    [RouterModule.forChild(routes)],
  ]
})
export class ProcurmentModuleModule { }
