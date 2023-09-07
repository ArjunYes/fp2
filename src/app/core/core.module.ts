import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { LandingComponent } from './components/landing/landing.component';
import { CardComponent } from './components/card/card.component';
import { SuccessComponent } from './components/card/success/success.component';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    HeaderComponent,
    LandingComponent,
    CardComponent,
    SuccessComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports:[
    HeaderComponent,
    LandingComponent,
    CardComponent,
    SuccessComponent
  ]
})
export class CoreModule { }
