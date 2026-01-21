import { Component, DestroyRef, inject } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Contact } from '../../models/contact.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mustContainHash, nameTaken, OnlyEnglishLetters } from '../../costume-validators/contact.validator/contact.validator';

@Component({
  selector: 'contact-edit-reactive',
  standalone: false,
  templateUrl: './contact-edit-reactive.html',
  styleUrl: './contact-edit-reactive.scss',
})
export class ContactEditReactive {

  private contactService = inject(ContactService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private destroyRef = inject(DestroyRef)
  private fb = inject(FormBuilder)

  contactForm!: FormGroup
  editing = false
  newContact: Contact | null = null

  constructor() {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, OnlyEnglishLetters], nameTaken(this.contactService) ],
      email: ['', [Validators.required, mustContainHash]],
      phone: ['', [Validators.required, Validators.minLength(6)]],
      birthday: [this._formatTime(Date.now())],
    })

  }

  ngOnInit(): void {
    this.route.data.pipe(
      map(data => data['contact']),
      filter(contact => contact),
      tap(() => this.editing = true),
      takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: contact => {
          const contactToEdit = { ...contact, birthday: this._formatTime(contact.birthday || Date.now()) }
          this.contactForm.patchValue(contactToEdit),
            this.newContact = contactToEdit
        },
        error: err => console.log('Error', err)
      })

  }

  private _formatTime(date: Date | string | number) {
    return new Date(date).toISOString().slice(0, 10)
  }

  // handleBirthdayChange(str: Date) {
  //   if (this.newContact) 
  //   this.newContact.birthday = str
  // }


  onSaveContact(ev: SubmitEvent) {
    if ( this.contactForm.invalid){
      this.contactForm.markAllAsTouched()
      return
    }
    const contactToEdit = { ...this.newContact, ...this.contactForm.value }
    contactToEdit.birthday = new Date(contactToEdit.birthday).getTime()
    this.contactService.saveContact(contactToEdit)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        error: err => console.log('err', err),
        complete: () => this.router.navigateByUrl('/contacts')
      })

  }

  onBack = () => {
    if (this.editing && this.newContact) {
      this.router.navigateByUrl(`/details/${this.newContact._id}`)
    }
    else this.router.navigateByUrl('/contacts')
  }

}
