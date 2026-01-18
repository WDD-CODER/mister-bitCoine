import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, map, switchMap } from 'rxjs';

@Component({
  selector: 'contact-edit',
  standalone: false,
  templateUrl: './contact-edit.html',
  styleUrl: './contact-edit.scss',
})
export class ContactEdit implements OnInit {

  contactService = inject(ContactService)
  route = inject(ActivatedRoute)
  router = inject(Router)

  newContact = this.contactService.getEmptyContact()


  private destroyRef = inject(DestroyRef)

  ngOnInit(): void {
    this.route.data.pipe(
      map(data => data['contact']),
      filter(contact => {
        console.log("🚀 ~ ContactEdit ~ ngOnInit ~ contact:", contact)
        
        return contact}),
      // switchMap(contactId => this.contactService.getContactById(contactId)),
      takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: contact => this.newContact = contact,
        error: err => console.log('Error', err)
      })

  }

  onCloseModal() {
   const modal =  document.querySelector('dialog')
   console.log("🚀 ~ ContactEdit ~ onCloseModal ~ modal:", modal)
   modal?.close()
  }


  handleBirthdayChange(str: Date) {
    console.log("🚀 ~ ContactEdit ~ handelbirthdayChange ~ str:", str)
    this.newContact.birthday = str
  }


  onSaveContact(ev: SubmitEvent) {
    if (!this.newContact.email || !this.newContact.name || !this.newContact.phone) {
      console.log("🚀 ~ ContactEdit ~ onSaveContact ~ this.newContact.email:", this.newContact)
      return alert('Missing info!')
    }

    this.contactService.saveContact(this.newContact as Contact)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        error: err => console.log('err', err),
        complete: this.onBack
      })
  }

  onBack = () => {
    this.router.navigateByUrl('/contacts')
  }

}
