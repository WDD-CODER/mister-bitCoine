import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, inject, Output } from '@angular/core';

@Directive({
  selector: '[highlight]',
  standalone: true
})
export class Highlight {

@Output('highlight') saveText = new EventEmitter<string>()

private  el = inject(ElementRef)


@HostListener('mouseover')
onMouseOver(){
  this.bgColor = 'red'
this.isEditable = true
}

@HostListener('mouseleave')
onMouseLeave(){
this.bgColor = ''
}

@HostListener('focus')
onFocus(){
this.cursor = 'default'
}

@HostListener('blur')
onBlur(){
this.isEditable = false
this.cursor = 'pointer'
const txt = this.el.nativeElement.innerText
this.saveText.emit(txt)
}

@HostBinding('style.backgroundColor')
bgColor = ''

@HostBinding('contentEditable')
isEditable = false

@HostBinding('style.cursor')
cursor = 'pointer'
}
