import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { LandingComponent } from './components/landing/landing.component';




@NgModule({
  declarations: [
    HeaderComponent,
    LandingComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    HeaderComponent,
    LandingComponent
  ]
})
export class CoreModule { }
