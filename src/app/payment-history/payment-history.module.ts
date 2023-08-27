import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentListingComponent } from './payment-listing/payment-listing.component';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  
  {
    path: '', component: PaymentListingComponent, 
  },

]




@NgModule({
  declarations: [
    PaymentListingComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})




export class PaymentHistoryModule { 


  constructor(){
    console.log("Hello")
  }


}
