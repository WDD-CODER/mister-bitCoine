import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, map, switchMap, tap } from 'rxjs';

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
  editing = false
  newContact = this.contactService.getEmptyContact()


  private destroyRef = inject(DestroyRef)

  ngOnInit(): void {
    this.route.data.pipe(
      map(data => data['contact']),
      filter(contact => contact),
      tap(()=> this.editing = true),
      takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: contact => this.newContact = contact,
        error: err => console.log('Error', err)
      })

  }

  // onCloseModal() {
  //   const modal = document.querySelector('dialog')
  //   modal?.close()
  // }


  handleBirthdayChange(str: Date) {
    this.newContact.birthday = str
  }


  onSaveContact(ev: SubmitEvent) {
    if (!this.newContact.email || !this.newContact.name || !this.newContact.phone) {
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
    console.log("🚀 ~ ContactEdit ~ this.editing:", this.editing)
    if (this.editing) {
          this.router.navigateByUrl(`/details/${this.newContact._id}`)
    }
   else this.router.navigateByUrl('/contacts')
  }

}
