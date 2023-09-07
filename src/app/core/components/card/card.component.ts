import { Component, Output, EventEmitter, Input, ElementRef, Renderer2, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl  } from '@angular/forms';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Output() closeCard = new EventEmitter<void>();
  @Output() payClicked = new EventEmitter<void>();
  @Input() selectedAmount?: number;
  private tabPressCounter = 0;

  paymentForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private renderer: Renderer2, private el: ElementRef) {
    this.paymentForm = this.formBuilder.group({
      cardholderName: ['', Validators.required],
      cardNumber: ['', Validators.compose([Validators.required, Validators.pattern(/^\d{16}$/)])],
      expiryDate: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/), // Pattern for MM/YY format
          this.validateExpiryDate // Custom validator
        ]
      ],
      cvv: ['', Validators.compose([Validators.required, Validators.pattern(/^\d{3}$/)])]
    });
  }

  ngOnInit(): void {
    const element = document.getElementById('main-dashboard');
    this.renderer.setStyle(element, 'display', 'none');

    const cardElement = document.getElementById('cardTitle');
    setTimeout(() => {
      cardElement?.focus();
    }, 0);
  }

  resetStyle() {
    const element = document.getElementById('main-dashboard');
    this.renderer.setStyle(element, 'display', 'flex');
    const dashboardTitle = document.getElementById('dashboardTitle');
    dashboardTitle?.focus();
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Tab') {
      event.preventDefault();

      this.tabPressCounter++;
      if (this.tabPressCounter % 8 === 0) {
        const cardElement = document.getElementById('cardTitle');
        setTimeout(() => {
          cardElement?.focus();
        }, 0);
      }
    }
  }

  close() {
    this.closeCard.emit();
    this.resetStyle();
  }

  onPay() {
    this.submitted = true;

    if (this.paymentForm.valid) {
      this.payClicked.emit();
    } else {
      this.clearErrorMessages();

      let firstErrorField: string | null = null;
      for (const controlName in this.paymentForm.controls) {
        const control = this.paymentForm.get(controlName);
        if (control?.invalid) {
          firstErrorField = controlName;
          const errorMessage = this.getErrorMessage(controlName);
          this.setErrorMessage(controlName, errorMessage);
          break;
        }
      }

      if (firstErrorField) {
        const errorMessage = this.getErrorMessage(firstErrorField);
        this.announceErrorMessage(errorMessage);

        const fieldInput = document.getElementById(`${firstErrorField}`);
        setTimeout(() => {
          if (fieldInput) {
            fieldInput.focus();
          }
        }, 100); 
      }
    }
  }

  setErrorMessage(fieldName: string, message: string) {
    const errorElement = document.getElementById(`${fieldName}Error`);
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
      errorElement.setAttribute('aria-live', 'assertive'); 
    }
  }

  validateExpiryDate(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    if (!value) {
      return null;
    }
  
    const parts = value.split('/');
    const month = parseInt(parts[0], 10);
    const year = parseInt(parts[1], 10);
  
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100; // Get the last two digits of the current year (e.g., 21 for 2021)
  
    if (
      year < currentYear || // Check if the entered year is less than the current year
      (year === currentYear && month < currentDate.getMonth() + 1) || // Check if the entered year is the same as the current year and the month is in the past
      year < 23 || // Check if the entered year is less than '23'
      year > 99 || // Check if the entered year is greater than '99'
      month < 1 || month > 12
    ) {
      return { invalidExpiryDate: true };
    }
  
    return null;
  }




getErrorMessage(fieldName: string): string {
  const control = this.paymentForm.get(fieldName);
  if (control?.hasError('required')) {
    const fieldNameFormatted = fieldName
      .split(/(?=[A-Z])/)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
    return `${fieldNameFormatted} is required.`;
  } else if (control?.hasError('pattern')) {
    const fieldNameFormatted = fieldName
      .split(/(?=[A-Z])/)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
    return `Invalid ${fieldNameFormatted} format.`;
  }
  return 'Field error.';
}



  clearErrorMessages() {
    for (const controlName in this.paymentForm.controls) {
      const errorElement = document.getElementById(`${controlName}Error`);
      if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
        errorElement.removeAttribute('aria-live'); 
      }
    }
  }

  announceErrorMessage(message: string) {
    const liveRegion = document.getElementById('liveRegion');
    if (liveRegion) {
      liveRegion.textContent = message;
      liveRegion.style.display = 'block';
      liveRegion.setAttribute('aria-live', 'assertive'); 

      setTimeout(() => {
        liveRegion.textContent = '';
        liveRegion.style.display = 'none';
        liveRegion.removeAttribute('aria-live'); 
      }, 2000); 
    }
  }
}
