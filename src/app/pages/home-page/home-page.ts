import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { BitcoinService } from '../../services/bitcoin.service';
import { filter, map, Observable, switchMap, tap } from 'rxjs';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Move } from '../../models/move.model';

@Component({
  selector: 'home-page',
  standalone: false,
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})

export class HomePage implements OnInit {

  private contactService = inject(ContactService)
  private userService = inject(UserService)
  private bitcoinService = inject(BitcoinService)
  private router = inject(Router)
  private destroyRef = inject(DestroyRef)

  date = Date.now() - 1000 * 60 ** 2 * 30
  contacts: Contact[] | null = null

  contacts$: Observable<Contact[]> = this.contactService.contacts$

  user$: Observable<User | null> = this.userService.user$

  userMoves$: Observable<Move[] | undefined> = this.userService.user$.pipe(
    filter(user => !!user),
    map(user => user?.moves ? user.moves.slice(-3) : [])
  )

  btcRate$: Observable<number> = this.user$.pipe(
    filter(user => !!user),
    switchMap(user => this.bitcoinService.getRateStream(user.coins))
  )

  ngOnInit(): void {
    this.user$.pipe(
      tap(user => {
        if (!user) this.router.navigateByUrl('/signup')
      }),
      takeUntilDestroyed(this.destroyRef)
    )
      .subscribe()

  }

  onSaveTxt(txt:string) {
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
