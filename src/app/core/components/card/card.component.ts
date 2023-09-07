import { Component, Output, EventEmitter, Input, ElementRef, Renderer2, HostListener } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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
      cardholderName: [''],
      cardNumber: [''],
      expiryDate: [''],
      cvv: ['']
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
      if (this.tabPressCounter % 7 === 0) {
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
    this.payClicked.emit();
  }
}
