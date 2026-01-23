import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Observable } from 'rxjs';
import { Contact } from '../../models/contact.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'contact-details-page',
  standalone: false,
  templateUrl: './contact-details-page.html',
  styleUrl: './contact-details-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactDetailsPage implements OnInit {


  private contactService = inject(ContactService)
  private userService = inject(UserService)
  private router = inject(Router)
  private cd = inject(ChangeDetectorRef)

  public contact$: Observable<Contact | null> = this.contactService.selectedContact$

  public showTransferOption: boolean  = false

  amountToTransfer: number | null = null;

  ngOnInit(): void {
    setTimeout(() => {
      this.cd.markForCheck()
      this.showTransferOption = true
    }, 1000);
  }

  onSendCoins(contactId: string) {
    let coins = this.amountToTransfer
    if (!coins) return
    this.userService.addMove(contactId, +coins)
    this.cd.markForCheck()
  }


  onRemoveContact(ev: MouseEvent, id: string) {
    ev.stopPropagation()
    this.contactService.deleteContact(id).subscribe({
      error: err => console.log('err', err),
      complete: () => this.router.navigateByUrl('/contacts')
    })
  }


}
