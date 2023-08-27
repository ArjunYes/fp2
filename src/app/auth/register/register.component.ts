import { Component } from '@angular/core';
import { UtilityService } from 'src/app/shared/services/utility.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  showTandC : boolean = false;


  checkValue(acceptorReject:boolean){
    if(acceptorReject){
      console.log("Accept");
    }else{
      console.log("reject");
    }
    this.showTandC = false;

    // acceptorReject ? console.log("Accept") : console.log("reject");

  }

  constructor(private utility: UtilityService){
  }

  login(){
    this.utility.loginRedirect();
    this.showTandC = false;
  }

}
