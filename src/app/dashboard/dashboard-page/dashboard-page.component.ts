import {
  Component,
  OnInit,
  ChangeDetectorRef,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Renderer2,
  HostListener,
} from '@angular/core';
import { Router } from '@angular/router';
import * as data from '../../../assets/data/data.json';

interface User {
  fName: string;
  lName: string;
  email: string;
  dob: string;
  hospitals: {
    id: number;
    visitDate: string;
    doctorName: string;
    amountToPay: number;
    selectedForPayment: boolean;
  }[];
  password: string;
  address: string;
  phoneNumber: string;
  imageUrl: string;
}

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
})
export class DashboardPageComponent implements OnInit {
  loggedInUser: string | null = null;
  user: User | null = null;
  showProfileMenu: boolean = false;
  isCardVisible = false;
  selectedAmount: number = 0;
  showSuccess: boolean = false;
  isPayButtonClicked = false;
  @ViewChild('dashboardTitle', { static: true })
  dashboardTitleElement!: ElementRef;
  dashboardTitle: string = 'Dashboard';
  windowWidth: number = window.innerWidth;

  constructor(
    private cdr: ChangeDetectorRef,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.windowWidth = window.innerWidth;
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth;
    });
    this.dashboardTitle = 'Dashboard';
    this.dashboardTitleElement.nativeElement.focus();

    this.loggedInUser = localStorage.getItem('loggedInUser');
    if (this.loggedInUser) {
      const userData = (data as any).default;
      this.user =
        userData.users.find((u: User) => u.email === this.loggedInUser) || null;
    }
  }


  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Tab') {
      event.preventDefault();

      const focusableElements = Array.from(
        this.elementRef.nativeElement.querySelectorAll('[tabindex]')
      ) as HTMLElement[];

      const focusedIndex = focusableElements.findIndex(
        (element) => element === document.activeElement
      );

      if (event.shiftKey) {
        const prevIndex = focusedIndex - 1;
        const nextIndex =
          prevIndex >= 0 ? prevIndex : focusableElements.length - 1;

        focusableElements[nextIndex].focus();
      } else {
        const nextIndex = (focusedIndex + 1) % focusableElements.length;

        focusableElements[nextIndex].focus();
      }
    }
  }

  viewHideProfileMenu() {
    this.showProfileMenu = !this.showProfileMenu;
  }

  calculateTotalPayment(): number {
    if (this.user && this.user.hospitals) {
      this.updateSelectedAmount(
        this.user.hospitals
          .filter((visit) => visit.selectedForPayment)
          .reduce((total, visit) => total + visit.amountToPay, 0)
      );

      return this.selectedAmount;
    }

    return 0;
  }

  calculateBillCount(): number {
    if (this.user && this.user.hospitals) {
      return this.user.hospitals.filter((visit) => visit.selectedForPayment)
        .length;
    }
    return 0;
  }

  showCard() {
    this.isCardVisible = true;
  }

  hideCard() {
    this.isCardVisible = false;
  }

  updateSelectedAmount(newAmount: number) {
    this.selectedAmount = newAmount;
  }

  onPay() {
    this.showSuccess = true;
    this.isCardVisible = false;
  }

  closeSuccessModal() {
    this.showSuccess = false;
    this.resetStyle();
  }

  showSuccessModal() {
    this.showSuccess = true;
  }

  onPayButtonClick(): void {
    this.isPayButtonClicked = true;

    if (this.calculateBillCount() > 0) {
      this.showCard();
      this.updateSelectedAmount(this.calculateTotalPayment());
    }
  }

  resetStyle() {
    const element = document.getElementById('main-dashboard');
    this.renderer.setStyle(element, 'display', 'flex');
    const dashboardTitle = document.getElementById('dashboardTitle');
    dashboardTitle?.focus();
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/landing']);
  }

  navigateToDashboard() {
    event?.preventDefault();
    window.location.href = '/dashboard';  }

    getWindowWidth() {
      return this.windowWidth;
    }
}
