import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {

  @ViewChild('chosenSearch', { static: true }) private inputField: ElementRef | null = null;
  
  ngOnInit(): void {
    this.setFocus()
  }


  setFocus(){
    console.log("Hello");
  }

}
