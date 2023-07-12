import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDataComponent } from './add-data/add-data.component';
import { EditDataComponent } from './edit-data/edit-data.component';
import { ListingComponent } from './listing/listing.component';
import { Routes,RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from 'app/ang-material.module';
const routes: Routes = [
  {
    path: "add",
    component: AddDataComponent
  },

  {
    path: "",
    component: ListingComponent
  },
  {
    path: "edit/:id",
    component: EditDataComponent
  },
];

@NgModule({
  declarations: [
    AddDataComponent,
    EditDataComponent,
    ListingComponent
  ],
  imports: [
    CustomMaterialModule,
    CommonModule,
    ReactiveFormsModule,
    [RouterModule.forChild(routes)],
  ]
})
export class SubCategoryModule { }
