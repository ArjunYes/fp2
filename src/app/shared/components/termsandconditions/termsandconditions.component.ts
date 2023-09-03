import {
  Component,
  EventEmitter,
  Output,
  ElementRef,
  Renderer2,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'app-termsandconditions',
  templateUrl: './termsandconditions.component.html',
  styleUrls: ['./termsandconditions.component.css'],
})
export class TermsandconditionsComponent {
  @Output() selectedValue = new EventEmitter<boolean>();
  private tabPressCounter = 0; // Initialize the tabPressCounter

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    const element = document.getElementById('mainRegister');
    this.renderer.setStyle(element, 'display', 'none');

    const modalElement = document.getElementById('modal');
    setTimeout(() => {
      modalElement?.focus();
    }, 0);
  }

  acceptDecline(flag: boolean) {
    this.selectedValue.emit(flag);
  }

  resetStyle() {
    const element = document.getElementById('mainRegister');
    this.renderer.setStyle(element, 'display', 'block');
    const btn = document.getElementById('signUpBtn');
    btn?.focus();
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Tab') {
      event.preventDefault();

      this.tabPressCounter++;
      if (this.tabPressCounter % 6 === 0) {
        const modalElement = document.getElementById('modal');
        setTimeout(() => {
          modalElement?.focus();
        }, 0);
      }
    }
  }
}
