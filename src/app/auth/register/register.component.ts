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
import { UtilityService } from 'src/app/shared/services/utility.service';
import { TermsandconditionsComponent } from 'src/app/shared/components/termsandconditions/termsandconditions.component';

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
  submitted = false;
  registerForm: FormGroup;
  registeredUsers: { email: string; password: string }[] = [];
  today: Date = new Date();
  titleText: string = 'Create an account';
  focusedInvalidField: string | null = null;

  checkValue(acceptorReject: boolean) {
    if (acceptorReject) {
      console.log('Accept');
    } else {
      console.log('reject');
    }
    this.showTandC = false;

    // acceptorReject ? console.log("Accept") : console.log("reject");
  }

  constructor(
    private formBuilder: FormBuilder,
    private utility: UtilityService,
    private renderer: Renderer2,
    private elementRef: ElementRef,
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
      'date-of-birth': [
        '',
        {
          validators: [Validators.required, this.validDateValidator()],
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

  validDateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const selectedDate = new Date(value);
      const currentDate = new Date();

      if (selectedDate >= currentDate) {
        return { invalidDate: true };
      }

      return null;
    };
  }

  ngOnInit(): void {
    this.titleText = 'Create an account';
    this.registerTitleElement.nativeElement.focus();
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
      const formData = this.registerForm.value;
      if (this.registeredUsers.some((user) => user.email === formData.email)) {
        this.registerForm.get('email')?.setErrors({ userExists: true });
      } else {
        this.registeredUsers.push({
          email: formData.email,
          password: formData.password,
        });
        localStorage.setItem('userData', JSON.stringify(this.registeredUsers));
        this.registerForm.reset();
        this.submitted = false;
        this.focusedInvalidField = null;
      }
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

  dateOfBirthValidator(control: AbstractControl) {
    if (control.value) {
      const currentDate = new Date();
      const selectedDate = new Date(control.value);

      const selectedDateWithoutTime = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate()
      );
      const currentDateWithoutTime = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      );

      if (selectedDateWithoutTime <= currentDateWithoutTime) {
        return { invalidDate: true };
      }
    }
    return null;
  }



  show() {
    this.showTandC = true; // Assuming this controls the visibility of the modal
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
