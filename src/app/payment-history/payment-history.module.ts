import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentListingComponent } from './payment-listing/payment-listing.component';



@NgModule({
  declarations: [
    PaymentListingComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PaymentHistoryModule { 


  constructor(){
    console.log("Hello")
  }


}
