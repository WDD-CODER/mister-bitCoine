import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject, from, Observable, of } from 'rxjs';

const SINGED_USERS = 'signed-users-db'
const LOGGED_IN_USER = 'signed-user'
@Injectable({
  providedIn: 'root',
})

export class UserService {

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
    else this._user$.next(signedUsers)
  }

  public setLoggedUser(user: User): void {
    const coins = 0
    const newUser: User = { ...user, coins }
    localStorage.setItem(LOGGED_IN_USER, JSON.stringify(newUser))

    let signedUsers = this._signedUsers$.value
    if (!signedUsers) {
      signedUsers = [newUser]
      localStorage.setItem(SINGED_USERS, JSON.stringify(signedUsers))
    }
    else if (!signedUsers.some(u => u.name === newUser.name)) {
      signedUsers.push(newUser)
      localStorage.setItem(SINGED_USERS, JSON.stringify(signedUsers))
    }

    this._user$.next(newUser)
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
      localStorage.setItem(LOGGED_IN_USER, JSON.stringify(user))
      this._user$.next(user)
    }
  }

  public addCoins(coins: number) {
    // const user = this._user$.value
    // if (user) {
    //   const updatedUser = { ...user, coins: user.coins + coins }
    //   this.user.coins += coins
    //   this._user$.next(updatedUser)
    // }
    if (this.user) {
      const updatedUser = { ...this.user, coins: this.user.coins + coins }
      this.user.coins += coins
      this._user$.next(updatedUser)
    }
    this._user$.next(null)
  }
}
