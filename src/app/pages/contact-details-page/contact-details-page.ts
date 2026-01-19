import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CustomRoute } from '../../models/custom-routes.model';
import { ContactService } from '../../services/contact.service';
import { BehaviorSubject, lastValueFrom, map, Observable, switchMap, tap } from 'rxjs';
import { Contact } from '../../models/contact.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'contact-details-page',
  standalone: false,
  templateUrl: './contact-details-page.html',
  styleUrl: './contact-details-page.scss',
})
export class ContactDetailsPage {


  private contactService = inject(ContactService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)


  public contact$: Observable<Contact> = this.route.data.pipe(
    map(data => data['contact'])
  )

  onRemoveContact(ev: MouseEvent, id: string) {
    ev.stopPropagation()
    this.contactService.deleteContact(id).subscribe({
      error: err => console.log('err', err),
      complete: () => this.router.navigateByUrl('/contacts')

    })
  }

  onBack(): void {
    this.router.navigateByUrl('/contacts')
  }


}
