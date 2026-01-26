import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { CustomRoute } from '../../models/custom-routes.model';
import { Observable } from 'rxjs';
import { ContactFilter } from '../contact-filter/contact-filter';
import { ContactPreview } from '../contact-preview/contact-preview';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'contact-list',
  standalone: true,
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.scss',
  imports:[ContactFilter,ContactPreview,RouterLink,CommonModule]
})
export class ContactList {

  private contactService = inject(ContactService)
  // contacts$: Observable<Contact[]> = this.contactService.contacts$
  contacts_ = this.contactService.contacts_ 

  onSelectContact(contact: Contact) {
    this.contactService.selectContent(contact._id)
  }


}
