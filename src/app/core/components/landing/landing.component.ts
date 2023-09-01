import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {
  @ViewChild('pageTitle') pageTitleElement!: ElementRef;
  @ViewChild('paragraph') paragraphElement!: ElementRef;
  @ViewChild('loginButton') loginButtonElement!: ElementRef;
  @ViewChild('signupLink') signupLinkElement!: ElementRef;
  @ViewChild('image') imageElement!: ElementRef;
  @ViewChild('copyright') copyrightElement!: ElementRef;
  @ViewChild('medipayLogo') medipayLogoElement!: ElementRef;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      if (this.pageTitleElement) {
        this.pageTitleElement.nativeElement.focus();
        this.setupFocusLoop();
      }
    }, 1000);
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  register(): void {
    this.router.navigate(['/register']);
  }

  private focusableElements: ElementRef[] = [];

  private setupFocusLoop(): void {
    if (
      !this.pageTitleElement ||
      !this.paragraphElement ||
      !this.loginButtonElement ||
      !this.signupLinkElement ||
      !this.imageElement ||
      !this.copyrightElement ||
      !this.medipayLogoElement
    ) {
      return;
    }

    this.focusableElements = [
      this.pageTitleElement,
      this.paragraphElement,
      this.loginButtonElement,
      this.signupLinkElement,
      this.imageElement,
      this.copyrightElement,
      this.medipayLogoElement,
    ];

    this.focusableElements.forEach((element, index) => {
      this.renderer.listen(element.nativeElement, 'blur', () => {
        const nextIndex = (index + 1) % this.focusableElements.length;
        this.focusableElements[nextIndex].nativeElement.focus();
      });
    });
  }
}
