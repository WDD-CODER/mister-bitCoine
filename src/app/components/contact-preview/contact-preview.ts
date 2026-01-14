import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { CustomRoute } from '../../models/custom-routes.model';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'contact-preview',
  standalone: false,
  templateUrl: './contact-preview.html',
  styleUrl: './contact-preview.scss',
})
export class ContactPreview {

  contactService = inject(ContactService)

  @Input() contact!: Contact

  onRemoveContact(ev:MouseEvent ,id: string) {
    ev.stopPropagation()
    this.contactService.deleteContact(id).subscribe({
      error: err => console.log('err', err)
    })
  }


  GoToUserDetails(id: string) {
    return id
  }


}
