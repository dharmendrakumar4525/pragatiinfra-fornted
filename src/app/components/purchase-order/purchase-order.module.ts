import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseOrderListComponent } from './purchase-order-list/purchase-order-list.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RateComparativeVendorsModule } from '@component/rate-comparative/rate-comparative-vendors/rate-comparative-vendors.module';
import { CustomMaterialModule } from 'app/ang-material.module';
import { DirectiveModule } from 'app/shared/directives/directive.module';
import { PurchaseOrderUpdateComponent } from './purchase-order-update/purchase-order-update.component';
import { PurchaseOrderDetailsComponent } from './purchase-order-details/purchase-order-details.component';
import { SignaturePadModule } from 'angular2-signaturepad';
import { ESignComponent } from './e-sign/e-sign.component';
import { BillingAddressPopupComponent } from './billing-address-popup/billing-address-popup.component';
import { MailingAddressPopupComponent } from './mailing-address-popup/mailing-address-popup.component';
import { MatIconModule } from '@angular/material/icon';
import { MailPopupComponent } from './mail-popup/mail-popup.component';
const routes: Routes = [
  {
    path: "",
    component: PurchaseOrderListComponent
  },
  {
    path: "details/:id",
    component: PurchaseOrderDetailsComponent
  },
  {
    path: "update/:id",
    component: PurchaseOrderUpdateComponent
  },
];

@NgModule({
  declarations: [
    PurchaseOrderListComponent,
    PurchaseOrderUpdateComponent,
    PurchaseOrderDetailsComponent,
    ESignComponent,
    BillingAddressPopupComponent,
    MailingAddressPopupComponent,
    MailPopupComponent
  ],
  imports: [
    [RouterModule.forChild(routes)],
    CommonModule,
    RouterModule,
    CustomMaterialModule,
    ReactiveFormsModule,
    RateComparativeVendorsModule,
    DirectiveModule,
    SignaturePadModule,
    MatIconModule,
  ]
})
export class PurchaseOrderModule { }
