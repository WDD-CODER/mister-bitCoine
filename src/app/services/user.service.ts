import { inject, Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject, from, map, Observable, of, take } from 'rxjs';
import { Contact } from '../models/contact.model';
import { ContactService } from './contact.service';
import { Router } from '@angular/router';
import { Move } from '../models/move.model';

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
    const newUser: User = { ...user }

    this._updateUser(user)
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
      this.router.navigateByUrl('/wallet')
    }
  }

  public addCoins(coins: number) {
    let user = this._user$.value
    if (!user) return
    const updatedUser = { ...user, coins: user.coins += coins }
    this._updateUser(updatedUser)

  }

  public async sendCoins(contactId: string, coinsToSend: number) {
    let user = this._user$.value
    if (!user || user.coins < coinsToSend) {
      return alert('Not enough funds for transfer')
    }


    this.contactService.getContactById(contactId)
      .pipe(
        take(1),
        map(contact => {
          
          let updatedCoins = user.coins -= coinsToSend
          let curMove = { toId: contact._id, to:contact.name , at: Date.now(), amount: coinsToSend }
          
           let UpdatedMoves: Move[] = (!user.moves)?  [curMove] : [...user.moves, curMove]
           
          return {
            user: { ...user, coins: updatedCoins, moves: UpdatedMoves },
            contact: {...contact, coins:(contact.coins || 0) + coinsToSend}
          }

        }
        )
      )
      .subscribe({
        next: data => {
          this.contactService.saveContact(data.contact)
          this._updateUser(data.user)
        },
        error: err => console.log('err', err)
      })
  }

  public _addMove(contact: Contact, amount: number) {
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
