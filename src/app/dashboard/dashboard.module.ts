import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';


export const routes: Routes = [
  
  {
    path: '', component: DashboardPageComponent, 
  },

]



@NgModule({
  declarations: [
    DashboardPageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    CoreModule,
    
  ]
})
export class DashboardModule {



  
 }
