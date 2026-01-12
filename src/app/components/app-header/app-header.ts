import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomRoute } from '../../models/custom-routes.model';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './app-header.html',
  styleUrl: './app-header.scss',
})
export class AppHeader {
  @Input() customRoutes!: CustomRoute[]
  @Output() setRoute = new EventEmitter<CustomRoute>
}
