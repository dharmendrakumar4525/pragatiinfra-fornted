import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountInfoComponent } from './pages/account-info.component';
import { AddProjectComponent } from './pages/add-project/add-project.component';
import { CalenderComponent } from './pages/calender/calender.component';
import { DashboardComponent } from './pages/dashboard.component';
import { DataAnalysisComponent } from './pages/data-analysis/data-analysis.component';
import { HomeComponent } from './pages/home.component';
import { ProgressSheetComponent } from './pages/progress-sheet/progress-sheet.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ViewProjectComponent } from './pages/view-project/view-project.component';

const routes: Routes = [
  {
    path: 'dpr',
    component: ProjectsComponent
  },
  {
    path: 'dashbaord',
    component: DashboardComponent
  },
  {
    path: 'account',
    component: AccountInfoComponent
  },
  {
    path: 'add-project',
    component: AddProjectComponent
  },
  {
    path: 'view-project',
    component: ViewProjectComponent,
    children: [
      {path: '', redirectTo: 'data-analysis', pathMatch:'full'}, 
      {path: 'data-analysis', component: DataAnalysisComponent},
      {path: 'progress-sheet', component: ProgressSheetComponent},
      {path: 'calender', component: CalenderComponent}, 

    ]
  },
  {
    path: '**',
    redirectTo: 'dpr',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {}