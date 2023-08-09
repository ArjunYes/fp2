import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {

  @ViewChild('chosenSearch', { static: true }) private inputField: ElementRef | null = null
  constructor( private router: Router){
  }


  ngOnInit(): void {
    this.setFocus()
  }

  login(){
    this.router.navigate(['/login']);
  }

  register(){
    this.router.navigate(['/register']);
  }

  setFocus(){
    console.log("Hello");
  }

}
