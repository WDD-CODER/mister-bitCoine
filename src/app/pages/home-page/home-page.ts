import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { BitcoinService } from '../../services/bitcoin.service';
import { filter, Observable, switchMap } from 'rxjs';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { FormBuilder } from '@angular/forms';

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

  date = Date.now() - 1000 * 60 ** 2 * 30
  contacts: Contact[] | null = null
  userNameInput!: string;
  singUp: boolean = true



  contacts$: Observable<Contact[]> = this.contactService.contacts$
  user$: Observable<User | null> = this.userService.user$
  // loggedInUser$: Observable<User | null> = this.userService.LoggedInUser$


  // url = 'https://jsonplaceholder.typicode.com/todos/1'

  btcRate$: Observable<number> = this.user$.pipe(
    filter((user): user is User => !!user),
    switchMap(user => this.bitcoinService.getRateStream(user.coins))
  )

  ngOnInit(): void {

    this.contacts$.subscribe({
      next: contacts => {
        this.contacts = contacts
      },
      error: err => console.log('err', err)
    })
  }

onSingUpUser({target}: SubmitEvent) {
console.log("🚀 ~ HomePage ~ onSingUpUser ~ target:", target)
}

  SetSingUpLogin($event: MouseEvent) {
    this.singUp = !this.singUp
  }

  Login(ev: MouseEvent) {

    // const user = localStorage.getItem(this.SINGED_IN_USERS)
    // console.log("🚀 ~ HomePage ~ Login ~ user:", user)
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
