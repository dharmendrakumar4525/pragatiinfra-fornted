import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDataComponent } from './add-data/add-data.component';
import { ListingComponent } from './listing/listing.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from 'app/ang-material.module';
const routes: Routes = [
  {
    path: "",
    component: ListingComponent
  },
];

@NgModule({
  declarations: [
    AddDataComponent,
    ListingComponent
  ],
  imports: [
    CustomMaterialModule,
    CommonModule,
    ReactiveFormsModule,
    [RouterModule.forChild(routes)],
  ]
})
export class StructureModule { }
