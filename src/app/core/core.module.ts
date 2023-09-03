import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { LandingComponent } from './components/landing/landing.component';
import { CardComponent } from './components/card/card.component';




@NgModule({
  declarations: [
    HeaderComponent,
    LandingComponent,
    CardComponent
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
