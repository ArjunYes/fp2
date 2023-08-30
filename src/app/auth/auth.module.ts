import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../shared/shared.module'
import { ReactiveFormsModule } from '@angular/forms';


export const routes: Routes = [
 
 
  {
    path: 'login', component: LoginComponent, 
  },
  
  {
    path: 'register', component: RegisterComponent, 
  },
  
 

]


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
