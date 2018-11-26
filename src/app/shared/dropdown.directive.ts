import { Directive, HostListener, ElementRef, Renderer2, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  constructor(private elRef: ElementRef, private renderer: Renderer2) { }
@HostBinding('class.open') isOpened = false;
  @HostListener('click') onmouseenter() {
    this.isOpened = !this.isOpened;
  }
}
