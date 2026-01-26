import { Component, computed, DestroyRef, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { BitcoinService } from '../../services/bitcoin.service';
import { filter, map, Observable, switchMap, tap } from 'rxjs';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { FormBuilder } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Move } from '../../models/move.model';
import { CommonModule } from '@angular/common';
import { Highlight } from '../../diractives/highlight';

@Component({
  selector: 'home-page',
  standalone: true,
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  imports: [CommonModule, RouterOutlet, Highlight]
})

export class HomePage implements OnInit {

  // private contactService = inject(ContactService)
  private userService = inject(UserService)
  private bitcoinService = inject(BitcoinService)
  private router = inject(Router)
  // private destroyRef = inject(DestroyRef)

  date = Date.now() - 1000 * 60 ** 2 * 30
  // contacts: Contact[] | null = null

  // contacts$: Observable<Contact[]> = this.contactService.contacts$
  // contacts_= this.contactService.contacts_

  
  public user_ = this.userService.user_

  userMoves_ = computed(() => {
    const user = this.user_()
    if (!user) return []
    return user?.moves ? user.moves.slice(-3) : []
  })

  btcRate_ = toSignal(
    toObservable(this.user_)
      .pipe(
        filter(user => !!user),
        switchMap(user => this.bitcoinService.getRateStream(user.coins))
      )
  )

  ngOnInit(): void {
    if (!this.user_()) this.router.navigateByUrl('/signup')
  }

  onSaveTxt(txt: string) {
    console.log("🚀 ~ HomePage ~ onSaveTxt ~ txt:", txt)
  }

  makeTransaction($event: PointerEvent) {
    this.router.navigateByUrl('/wallet/transaction')
  }


  onLogout(ev: MouseEvent): void {
    this.userService.logout().subscribe({
      next: () => this.router.navigateByUrl('/signup'),
      error: err => console.log('err', err)
    })

  }

  // onAddCoins(ev: MouseEvent) {
  //   this.userService.addCoins(100)
  // }


}
