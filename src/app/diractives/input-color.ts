import { Directive, ElementRef, HostBinding, HostListener, inject, Input, input, OnInit } from '@angular/core';

@Directive({
  selector: '[inputColor]',
  standalone: true
})
export class InputColor implements OnInit {

  private el = inject(ElementRef)


  @Input('inputColor') defaultColor = '' 
  ngOnInit(): void {
  }

  @HostListener('keydown', ['$event'])

  onKeyDown(ev:KeyboardEvent){
// this.el.nativeElement.style.backgroundColor = this._getRandomColor()
this.bgColor = this.defaultColor ||  this._getRandomColor()
  }

  @HostBinding('style.backgroundColor')
  bgColor=''

  private _getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }


}
