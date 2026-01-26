import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomRoute } from '../../models/custom-routes.model';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './app-header.html',
  styleUrl: './app-header.scss',
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
