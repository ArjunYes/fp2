import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsandconditionsComponent } from './components/termsandconditions/termsandconditions.component';



@NgModule({
  declarations: [
    TermsandconditionsComponent,
  ],
  imports: [
    CommonModule
  ],
  exports :[
    TermsandconditionsComponent
  ]
})
export class SharedModule { }
