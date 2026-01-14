import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { CustomRoute } from '../../models/custom-routes.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'contact-list',
  standalone: false,
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.scss',
})
export class ContactList {

  private contactService = inject(ContactService)
  contacts$: Observable<Contact[]> = this.contactService.contacts$

  @Output() setRoute = new EventEmitter<CustomRoute>

  onSelectContact(contact: Contact) {
    this.setRoute.emit({ name: 'details', isActive: true })
    this.contactService.selectContent(contact._id)
  }


}
