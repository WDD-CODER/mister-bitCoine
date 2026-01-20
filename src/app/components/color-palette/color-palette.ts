import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { colorPikerAnimation } from '../../../assets/animations/animations';

@Component({
  selector: 'color-palette',
  standalone: false,
  templateUrl: './color-palette.html',
  styleUrl: './color-palette.scss',
  animations: [
colorPikerAnimation
  ]
})
export class ColorPalette {

  @Input() curColor: string = ''
  @Input() isOpen!: boolean
  @Output() colorChange = new EventEmitter()
  @Output() isOpenChange = new EventEmitter()

  colors: string[] = [
    '#ffa033', // Persimmon
    '#33FF57', // Guacamole
    '#3357FF', // Royal Blue
    '#F333FF', // Fuchsia
    '#33FFF3', // Turquoise
    '#F3FF33'  // Lemon
  ];

  // onSetIsOn($event: MouseEvent) {
  //   this.isOpen = !this.isOpen
  // }

}
