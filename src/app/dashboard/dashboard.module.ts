import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  
  {
    path: 'dashboard', component: DashboardPageComponent, 
  },

]



@NgModule({
  declarations: [
    DashboardPageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DashboardModule {



  
 }
