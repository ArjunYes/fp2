import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
  HostListener,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/shared/services/utility.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @ViewChild('registerTitle', { static: true })
  registerTitleElement!: ElementRef;
  @ViewChild('termsAndConditionsModal') termsAndConditionsModal!: ElementRef;
  showTandC: boolean = false;
  @ViewChild('day') dayInput!: ElementRef;
  submitted = false;
  registerForm: FormGroup;
  today: Date = new Date();
  titleText: string = 'Create an account';
  focusedInvalidField: string | null = null;

  checkValue(acceptorReject: boolean) {
    if (acceptorReject) {
      console.log('Accept');
      this.registerForm.get('terms')?.setValue(true); // Set 'terms' control to true
    } else {
      console.log('Reject');
    }
    this.showTandC = false;
  }

  constructor(
    private formBuilder: FormBuilder,
    private utility: UtilityService,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private router: Router
  ) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const phoneNumberPattern = /^\(\d{3}\)-\d{3}-\d{4}$/;

    this.registerForm = this.formBuilder.group({
      'first-name': [
        '',
        { validators: [Validators.required], updateOn: 'submit' },
      ],
      'last-name': [
        '',
        { validators: [Validators.required], updateOn: 'submit' },
      ],
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
          validators: [
            Validators.required,
            Validators.pattern(passwordPattern),
          ],
          updateOn: 'submit',
        },
      ],
      'confirm-password': [
        '',
        {
          validators: [Validators.required, this.passwordMatchValidator],
          updateOn: 'submit',
        },
      ],
      address: ['', { validators: [Validators.required], updateOn: 'submit' }],
      'phone-number': [
        '',
        {
          validators: [
            Validators.required,
            Validators.pattern(phoneNumberPattern),
          ],
          updateOn: 'submit',
        },
      ],
      terms: [
        false,
        { validators: [Validators.requiredTrue], updateOn: 'submit' },
      ],
    });
  }

  ngOnInit(): void {
    this.titleText = 'Create an account';
    this.registerTitleElement.nativeElement.focus();
  }

  ngAfterViewInit(): void {
    // Set focus on the "Day" input field after a delay
    setTimeout(() => {
      this.dayInput.nativeElement.focus();
    }, 500); // Adjust the delay as needed
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

  login() {
    this.utility.loginRedirect();
    this.showTandC = false;
  }

  onSubmit() {
    this.submitted = true;
    console.log('this is the registerform', this.registerForm);
    if (this.registerForm.valid) {
      this.router.navigate(['/landing']);
      this.showTandC = false;
    } else {
      const invalidFields = Object.keys(this.registerForm.controls).filter(
        (controlName) =>
          this.registerForm.controls[controlName].status !== 'VALID'
      );
      const validFields = Object.keys(this.registerForm.controls).filter(
        (controlName) =>
          this.registerForm.controls[controlName].status == 'VALID'
      );
      if (invalidFields.length > 0) {
        this.focusOnError(invalidFields, validFields);
      }
    }
  }

  passwordMatchValidator: ValidatorFn = (control: AbstractControl) => {
    const password = control.parent?.get('password')?.value;
    const confirmPassword = control.value;

    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    } else {
      return null;
    }
  };

  focusOnError(errorfields: string[], validfields: string[]) {
    console.log('these are valid fields', validfields);

    const invalidField = this.registerForm.get(errorfields[0]);
    if (invalidField) {
      // this.focusedInvalidField = errorfields; // Set the currently focused invalid field
      const errorMessageElement = document.getElementById(
        `${errorfields[0]}-error`
      );
      const errorElement = document.getElementById(`${errorfields[0]}`);
      if (errorElement) {
        this.registerForm.controls[errorfields[0]].markAsTouched();
        //@ts-ignore
        errorMessageElement?.focus();
        setTimeout(() => {
          errorElement.focus();
        }, 1000);
      }
    }
  }

  show() {
    this.showTandC = true; 
  }

  openTermsAndConditionsModal(): void {
    console.log('Opening terms and conditions modal');
    this.showTandC = true;
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
