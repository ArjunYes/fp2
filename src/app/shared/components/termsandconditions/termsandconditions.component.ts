import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-termsandconditions',
  templateUrl: './termsandconditions.component.html',
  styleUrls: ['./termsandconditions.component.css']
})
export class TermsandconditionsComponent {

  @Output() selectedValue = new EventEmitter<boolean>();
  

  acceptDecline(flag:boolean){
    this.selectedValue.emit(flag);
  }

}
