import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { CustomRoute } from '../../models/custom-routes.model';

@Component({
  selector: 'contact-preview',
  standalone: false,
  templateUrl: './contact-preview.html',
  styleUrl: './contact-preview.scss',
})
export class ContactPreview {

  @Output() setRoute = new EventEmitter<CustomRoute>


  GoToUserDetails(id: string) {

  }

  @Input() contact: Contact | null = null

}
