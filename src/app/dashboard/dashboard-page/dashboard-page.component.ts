import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent {

  showProfileMenu : boolean = false;

  ngOnInit(): void {
    console.log("Dashboard");
  }

  viewHideProfileMenu(){
    this.showProfileMenu = !this.showProfileMenu;
  }



// user  ={
// 	fName :,
// 	lName : ,
// 	email :,
// 	dob :,
// 	hospitals : [],
//   password:
// address :
// phoneNumber
// }



// hospital = { 
// 	id : 1248,
// 	visitDate : 12/3/2000,
// 	doctorName : "sds",
// 	amountToPay : 

// 	}





}
