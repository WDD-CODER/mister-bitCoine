import { Component, inject } from '@angular/core';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'contact-edit',
  standalone: false,
  templateUrl: './contact-edit.html',
  styleUrl: './contact-edit.scss',
})
export class ContactEdit {

  contactService = inject(ContactService)

  contact = this.contactService.getEmptyContact()
  
}
