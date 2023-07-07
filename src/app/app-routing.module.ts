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
    // {
    //   path: 'case',
    //   loadChildren: () => import('./case/case.module').then(module => module.CaseModule)
    // },
    // {
    //   path: 'qc',
    //   loadChildren: () => import('./quality-check/quality-check.module').then(module => module.QualityCheckModule)
    // },
    // {
    //   path: 'audit-requests',
    //   loadChildren: () => import('./audit-requests/audit-requests.module').then(module => module.AuditRequestsModule)
    // },
    // {
    //   path: 'closing-requests',
    //   loadChildren: () => import('./closing-requests/closing-requests.module').then(module => module.ClosingRequestsModule)
    // },
    // {
    //   path: '401', component: AccessDeniedComponent
    // },
    // {
    //   path: '', redirectTo: 'package', pathMatch: 'full'
    // }
    ]
  },
  {
    path: '**', redirectTo: '', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})




export class AppRoutingModule { }
