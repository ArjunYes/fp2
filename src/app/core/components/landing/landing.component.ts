import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/shared/services/utility.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {

  @ViewChild('chosenSearch', { static: true }) private inputField: ElementRef | null = null
  constructor( 
    private router: Router,
    private ulility : UtilityService
    ){
  }


  ngOnInit(): void {
    this.setFocus()
  }

  login(){
    this.ulility.loginRedirect();
  }

  register(){
   this.ulility.registerRedirect();
  }

  setFocus(){
    console.log("Hello");
  }

}
