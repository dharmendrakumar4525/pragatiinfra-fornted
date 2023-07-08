import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PurchaseRequestComponent } from './purchase-request/purchase-request.component';
import { PurchaseRequestDetailsComponent } from './purchase-request-details/purchase-request-details.component';
import { CustomMaterialModule } from 'app/ang-material.module';

import { ReactiveFormsModule } from '@angular/forms';
import { PurchaseRequestListComponent } from './purchase-request-list/purchase-request-list.component';
const routes: Routes = [
  {
    path: "",
    component: PurchaseRequestComponent
  },

  {
    path: "prList",
    component: PurchaseRequestListComponent
  },
  {
    path: ":id",
    component: PurchaseRequestDetailsComponent
  },
];


@NgModule({
  declarations: [PurchaseRequestComponent, PurchaseRequestDetailsComponent,PurchaseRequestListComponent],
  imports: [
    CustomMaterialModule,
    CommonModule,
    ReactiveFormsModule,
    [RouterModule.forChild(routes)],
  ]
})
export class ProcurmentModuleModule { }
