import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

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

@NgModule({
  imports:      [ AppRoutingModule, BrowserModule,ReactiveFormsModule, FormsModule, CoreModule, SharedModule, CustomMaterialModule,FlexLayoutModule, BrowserAnimationsModule ],
  declarations: [ AppComponent, HomeComponent, DashboardComponent, AccountInfoComponent, AddProjectComponent, ViewProjectComponent, DataAnalysisComponent, CalenderComponent, ProgressSheetComponent, ProjectsComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
