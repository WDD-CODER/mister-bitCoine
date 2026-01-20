import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { BitcoinService } from '../../services/bitcoin.service';
import { filter, Observable, switchMap } from 'rxjs';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';

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

  date = Date.now() - 1000 * 60 ** 2 * 30
  contacts: Contact[] | null = null

  contacts$: Observable<Contact[]> = this.contactService.contacts$
  url = 'https://jsonplaceholder.typicode.com/todos/1'
  
  user$: Observable<User | null> = this.userService.user$
  btcRate$: Observable<number> = this.user$.pipe(
    filter((user): user is User => !!user),
    switchMap(user => this.bitcoinService.getRateStream(user.coins))
  )

    ngOnInit(): void {

      this.contacts$.subscribe({
        next:contacts => {          
          this.contacts = contacts},
        error: err => console.log('err', err)
      })
  }


  onAddCoins(ev: MouseEvent) {
    this.userService.addCoins(100)
  }



}
