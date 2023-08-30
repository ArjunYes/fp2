import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
  HostListener,
} from '@angular/core';
import { UtilityService } from 'src/app/shared/services/utility.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @ViewChild('registerTitle', { static: true })
  registerTitleElement!: ElementRef;
  @ViewChild('firstNameError', { static: false })
  firstNameError!: ElementRef;
  inputElements: { [key: string]: ElementRef<HTMLInputElement> } = {};
  showTandC: boolean = false;
  submitted = false;
  registerForm: FormGroup;
  registeredUsers: { email: string; password: string }[] = [];
  today: Date = new Date();
  titleText: string = 'Create an account';

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
    private elementRef: ElementRef
  ) {
    this.registerForm = this.formBuilder.group({
      'first-name': ['', Validators.required],
      'last-name': ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          ),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).*$/
          ),
        ],
      ],
      'confirm-password': [
        '',
        [Validators.required, this.passwordMatchValidator],
      ],
      'date-of-birth': ['', Validators.required],
      address: ['', Validators.required],
      'phone-number': [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(\\+\\d{1,2}\\s)?\\(\\d{3}\\)[\\s.-]\\d{3}[\\s.-]\\d{4}$'
          ),
        ],
      ],
      terms: [false, Validators.requiredTrue],
    });
    this.registerForm
      .get('date-of-birth')
      ?.setValidators(this.dateOfBirthValidator);
  }

  focusOnError(fieldName: string) {
    const invalidField = this.registerForm.get(fieldName);

    if (invalidField && invalidField.invalid && invalidField.touched) {
      const errorElement = document.getElementById(`${fieldName}-error`);
      if (errorElement) {
        errorElement.focus(); 
        errorElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
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
      }
    } else {
      this.markFormGroupTouched(this.registerForm);
    }

    const firstNameControl = this.registerForm.get('first-name');
    if (firstNameControl?.invalid) {
      this.firstNameError.nativeElement.tabIndex = 1;
      this.focusOnError('first-name');
    } else {
      this.firstNameError.nativeElement.tabIndex = -1;
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

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
