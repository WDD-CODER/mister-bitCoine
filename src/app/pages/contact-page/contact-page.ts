import { Component, inject, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'contact-page',
  standalone: false,
  templateUrl: './contact-page.html',
  styleUrl: './contact-page.scss',
})
export class ContactPage implements OnInit {

  private contactService = inject(ContactService)

  contacts: Contact[] | undefined

  ngOnInit(): void {
    this.contactService.contacts$.subscribe({
      next: contacts => this.contacts = contacts
    })
  }



}
