import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/shared/services/utility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent {

constructor(
  private router : Router,
  private utility : UtilityService
){}

register(){
  this.utility.registerRedirect();
}



}
