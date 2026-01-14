import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CustomRoute } from '../../models/custom-routes.model';
import { ContactService } from '../../services/contact.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'contact-details-page',
  standalone: false,
  templateUrl: './contact-details-page.html',
  styleUrl: './contact-details-page.scss',
})
export class ContactDetailsPage {

  private contactService = inject(ContactService)

  @Output() setRoute = new EventEmitter<CustomRoute>

  contact$: Observable<Contact | null> = this.contactService.selectedContact$

}
