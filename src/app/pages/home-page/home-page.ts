import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { BitcoinService } from '../../services/bitcoin.service';
import { filter, Observable, switchMap, tap } from 'rxjs';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  private fb = inject(FormBuilder)
  private router = inject(Router)
  private destroyRef = inject(DestroyRef)

  date = Date.now() - 1000 * 60 ** 2 * 30
  contacts: Contact[] | null = null



  contacts$: Observable<Contact[]> = this.contactService.contacts$
  user$: Observable<User | null> = this.userService.user$


  // url = 'https://jsonplaceholder.typicode.com/todos/1'

  btcRate$: Observable<number> = this.user$.pipe(
    filter((user): user is User => !!user),
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
    this.contacts$.subscribe({
      next: contacts => {
        this.contacts = contacts
      },
      error: err => console.log('err', err)
    })
  }

  onLogout(ev: MouseEvent): void {
    this.userService.logout()
  }

  onChangeName() {
    if (this.contacts) {
      console.log("🚀 ~ HomePage ~ onChangeName ~  this.contacts[0]:", this.contacts[0])
      this.contacts[0].name = 'new'
    }
  }
  onAddCoins(ev: MouseEvent) {
    this.userService.addCoins(100)
  }


}
