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
export class ContactDetailsPage implements OnInit {

  private contactService = inject(ContactService)


  @Input() customRoutes!: CustomRoute[]
  @Output() setRoute = new EventEmitter<CustomRoute>

  contact: Contact | null = null

  async ngOnInit() {
    const routId = this.customRoutes.find(r => r.name === 'details')?.id
    if (routId) {
      const contact = this.contactService.getContactById(routId)
        .pipe(
          tap(contact => this.contact = contact)
        )
        .subscribe({
          next: contact => console.log('contact', contact),
          error: err => console.log('err', err)
        })
    }

  }
}
