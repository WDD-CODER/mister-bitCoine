import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, inject, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[clickOutSide]',
  standalone: false
})
export class ClickOutSide implements OnInit {

  @Output() clickOutSide = new EventEmitter()

  isMounting = true

  ngOnInit(): void {
    setTimeout(() => this.isMounting = false);
  }

  private el = inject(ElementRef)

  @HostListener('document:click', ['$event'])
  onClick(ev: MouseEvent) {
    if (this.isMounting) return

    const isClickOutSide = !this.el.nativeElement.contains(ev.target)

    if (isClickOutSide) {
      this.clickOutSide.emit('')
    }
  }

  @HostBinding('class')
  class = 'click-outside'
}
