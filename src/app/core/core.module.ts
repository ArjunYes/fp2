import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { LandingComponent } from './landing/landing.component';



@NgModule({
  declarations: [
    HeaderComponent,
    LandingComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    HeaderComponent
  ]
})
export class CoreModule { }
