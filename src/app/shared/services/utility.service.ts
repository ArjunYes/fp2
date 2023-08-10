import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  constructor(
    private router: Router
  ) { }

  loginRedirect(){
    this.router.navigate(['/login']);
  }

  registerRedirect(){
    this.router.navigate(['/register']);
  }


}