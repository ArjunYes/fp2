import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
  HostListener,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/shared/services/utility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @ViewChild('loginTitle', { static: true })
  loginTitleElement!: ElementRef;
  submitted = false;
  loginForm: FormGroup;
  loginTitle: string = 'Sign in to your account';

  constructor(
    private router: Router,
    private utility: UtilityService,
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        {
          validators: [Validators.required, Validators.pattern(emailPattern)],
          updateOn: 'submit',
        },
      ],
      password: [
        '',
        {
          validators: [Validators.required],
          updateOn: 'submit',
        },
      ],
    });
  }

  focusOnError(errorField: string) {
    const errorMessageElement = document.getElementById(`${errorField}-error`);
    const errorElement = document.getElementById(`${errorField}`);
    if (errorElement) {
      this.loginForm.controls[errorField].markAsTouched();
      //@ts-ignore
      errorMessageElement?.focus();
      console.log('error message element', errorMessageElement);
      setTimeout(() => {
        errorElement.focus();
      }, 1000);
    }
  }

  ngOnInit(): void {
    this.loginTitle = 'Sign in to your account';
    this.loginTitleElement.nativeElement.focus();
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

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      // Add the authentication logic here if needed, otherwise this code assumes that any valid email and non-empty password is accepted

      this.router.navigate(['/dashboard']);
    } else {
      const invalidFields = Object.keys(this.loginForm.controls).filter(
        (controlName) => this.loginForm.controls[controlName].status !== 'VALID'
      );
      if (invalidFields.length > 0) {
        console.log('invalid fields', invalidFields);
        this.focusOnError(invalidFields[0]);
      }
    }
  }

  login() {}

  register() {
    this.utility.registerRedirect();
  }
}
