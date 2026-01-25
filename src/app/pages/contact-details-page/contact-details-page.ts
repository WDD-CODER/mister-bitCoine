import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { combineLatest, filter, map, Observable, tap } from 'rxjs';
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
  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private cd = inject(ChangeDetectorRef)

  public contact$: Observable<Contact | null> = this.route.data.pipe(map(data => data['contact']))
  user$ = this.userService.user$

  public contactMoves$ = combineLatest([this.user$, this.contact$]).pipe(
    filter(([user]) => !!user),
    map(([user, contact]) => {
      console.log("🚀 ~ ContactDetailsPage ~ contact:", contact)
      console.log("🚀 ~ ContactDetailsPage ~ user:", user)
      
     return  user?.moves?.filter(move => move.toId === contact?._id)})
  )
  public showTransferOption: boolean = false

  amountToTransfer: number | null = null;

  ngOnInit(): void {
    setTimeout(() => {
      this.cd.markForCheck()
      this.showTransferOption = true
    }, 1000);
  }

  onSendCoins(contact: Contact) {
    let coins = this.amountToTransfer
    if (!coins) return
    this.userService.addMove(contact, +coins).subscribe({
      next: () => {
        this.amountToTransfer = null
        this.cd.markForCheck()
      },
      error: err => {
        this.amountToTransfer = null
        console.log('err', err)
      }

    })
  }


  onRemoveContact(ev: MouseEvent, id: string) {
    ev.stopPropagation()
    this.contactService.deleteContact(id).subscribe({
      error: err => console.log('err', err),
      complete: () => this.router.navigateByUrl('/contacts')
    })
  }


}
