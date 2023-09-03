import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LandingComponent } from './core/components/landing/landing.component';
import { CardComponent } from './core/components/card/card.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { 
        path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) 
      },

      { 
        path: 'history', loadChildren: () => import('./payment-history/payment-history.module').then(m => m.PaymentHistoryModule) 
      },

    {
      path: '',component : LandingComponent
    },

    {
      path: 'card',component : CardComponent
    },
    
      
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
