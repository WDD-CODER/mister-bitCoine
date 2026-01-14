import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { CustomRoute } from '../../models/custom-routes.model';

@Component({
  selector: 'contact-page',
  standalone: false,
  templateUrl: './contact-page.html',
  styleUrl: './contact-page.scss',
})
export class ContactPage {
  @Output() setRoute = new EventEmitter<CustomRoute>
}
