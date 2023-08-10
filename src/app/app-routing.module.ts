import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LandingComponent } from './core/components/landing/landing.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [

    {
      path: '',component : LandingComponent
    },
    { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },

      
    ]
  },
  {
    path: '**', redirectTo: '', pathMatch: 'full'
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})




export class AppRoutingModule { }
