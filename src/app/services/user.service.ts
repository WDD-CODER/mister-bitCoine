import { inject, Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { Contact } from '../models/contact.model';
import { ContactService } from './contact.service';
import { Router } from '@angular/router';

const SINGED_USERS = 'signed-users-db'
const LOGGED_IN_USER = 'signed-user'
@Injectable({
  providedIn: 'root',
})

export class UserService {

  contactService = inject(ContactService)
  router = inject(Router)

  private _signedUsers$ = new BehaviorSubject<User[] | null>(null)
  public signedUsers$ = this._signedUsers$.asObservable()

  private _user$ = new BehaviorSubject<User | null>(null)
  public user$ = this._user$.asObservable()

  user: User | null = null

  constructor() {
    // Handling Demo Data, fetching from storage || saving to storage 
    const signedUsers = JSON.parse(localStorage.getItem(SINGED_USERS) || 'null')
    if (!signedUsers || signedUsers.length === 0) return
    else this._signedUsers$.next(signedUsers)

    const loggedInUser = JSON.parse(localStorage.getItem(LOGGED_IN_USER) || 'null')
    if (!loggedInUser) return
    else this._user$.next(loggedInUser)
  }

  public setSignedUser(user: User): void {
    const coins = 0
    const newUser: User = { ...user, coins }

    this._updateUser(newUser)
  }

  public logout(): void {
    localStorage.removeItem(LOGGED_IN_USER)
    this._user$.next(null)
  }

  public login(userName: string): void {
    const users = this._signedUsers$.value
    if (users && users.length === 0) return console.log('no signed users')
    let user = users?.find(user => user.name === userName)
    if (user) {
      this._updateUser(user)
    }
  }

  public addCoins(coins: number) {
    let user = this._user$.value
    if (!user) return
    const updatedUser = { ...user, coins: user.coins += coins }
    this._updateUser(updatedUser)

  }

  public sendCoins(contactId: string, coinsToSend: number) {
    if (!this._user$.value) return

    if (this._user$.value?.coins < coinsToSend) {
      return alert('Not enough funds for transfer')
    }

    let curUser = this._user$.value

    this.contactService.getContactById(contactId)
      .subscribe({
        next: contact => {
          const updatedContact = { ...contact, coins: contact.coins ? contact.coins += coinsToSend : coinsToSend }
          this.contactService.saveContact(updatedContact)

        },
        error: err => console.log('err', err)

      })


    let updatedCoins = this._user$.value.coins -= coinsToSend
    this._updateUser({ ...this._user$.value, coins: updatedCoins })

    // this.router.navigateByUrl('/contacts')
  }

  public _addMove(contact: Contact, amount: number) {
    console.log("🚀 ~ UserService ~ _addMove ~ contact:", contact)
    console.log("🚀 ~ UserService ~ _addMove ~ amount:", amount)
  }

  private _updateUser(user: User): void {
    localStorage.setItem(LOGGED_IN_USER, JSON.stringify(user))
    let signedUsers = this._signedUsers$.value
    if (!signedUsers) {
      signedUsers = [user]
      localStorage.setItem(SINGED_USERS, JSON.stringify(signedUsers))
    }
    else if (!signedUsers.some(u => u.name === user.name)) {
      signedUsers.push(user)
      localStorage.setItem(SINGED_USERS, JSON.stringify(signedUsers))
    }
    else {
      const idx = signedUsers.findIndex(u => u.name === user.name)
      if (idx) {
        signedUsers.splice(idx, 1, user)
        localStorage.setItem(SINGED_USERS, JSON.stringify(signedUsers))
        this._signedUsers$.next(signedUsers)
      }
    }
    this._user$.next(user)
  }
}
