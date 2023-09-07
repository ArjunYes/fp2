import { Component, Output, EventEmitter, Renderer2, HostListener } from '@angular/core';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent {
  @Output() closeModal = new EventEmitter<void>();
  private tabPressCounter = 0;
  constructor(private renderer: Renderer2, ) {}

  ngOnInit(): void {
    const successTitle = document.getElementById('successTitle');
    setTimeout(() => {
      successTitle?.focus();
    }, 0);
  }

  onCloseModal() {
    this.closeModal.emit();
    this.resetStyle()
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
      if (this.tabPressCounter % 4 === 0) {
        const successTitle = document.getElementById('successTitle');
        setTimeout(() => {
          successTitle?.focus();
        }, 0);
      }
    }
  }
}
