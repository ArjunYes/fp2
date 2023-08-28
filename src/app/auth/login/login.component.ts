import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/shared/services/utility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent {
  public loginForm: FormGroup;

constructor(
  private router : Router,
  private utility : UtilityService
){
  this.loginForm = new FormGroup({
    email: new FormControl(null, Validators.compose([Validators.required])),
    password: new FormControl(null, Validators.compose([Validators.required]))
  })


}

login(){
  alert("Logged in ")
  console.log(this.loginForm.value)
}


register(){
  this.utility.registerRedirect();
}



}
