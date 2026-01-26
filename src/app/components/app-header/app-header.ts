import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomRoute } from '../../models/custom-routes.model';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TextColorPipe } from '../../pipes/Text-color-pipe';
import { ColorPalette } from '../color-palette/color-palette';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './app-header.html',
  styleUrl: './app-header.scss',
  imports:[RouterLink, CommonModule,RouterLink,TextColorPipe,ColorPalette]
})
export class AppHeader {
  
curColor = '#FF5733'  
isOpen = false

    customRoutes: CustomRoute[] = [
    { name: 'wallet', isActive: true, },
    { name: 'contacts', isActive: false, },
    { name: 'details', isActive: false, id: '' },
    { name: 'dash-board', isActive: false, }
  ]

onSetIsOpen(ev:MouseEvent) {
  this.isOpen = !this.isOpen
}

onSetColor(color : string) {
  this.curColor = color
}


}
