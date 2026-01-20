import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject, from, Observable, of } from 'rxjs';

const SINGED_USERS = 'singed-users-db'
const LOGGED_IN_USER = 'singed-users'
@Injectable({
  providedIn: 'root',
})

export class UserService {

  private _singedUsers$ = new BehaviorSubject<User[] | null>(null)
  public singedUsers$ = this._singedUsers$.asObservable()

  // private _LoggedInUser$ = new BehaviorSubject<User | null>(null)
  // public LoggedInUser$ = this._LoggedInUser$.asObservable()

  private _user$ = new BehaviorSubject<User | null>(null)
  public user$ = this._user$.asObservable()

  constructor() {
    // Handling Demo Data, fetching from storage || saving to storage 
    const singedUsers = JSON.parse(localStorage.getItem(SINGED_USERS) || 'null')
    if (!singedUsers || singedUsers.length === 0) return
    else this._singedUsers$.next(singedUsers)

    const loggedInUser = JSON.parse(localStorage.getItem(LOGGED_IN_USER) || 'null')
    if (!loggedInUser) return
    else this._user$.next(singedUsers)
  }



  // user: User = {
  //   name: "Ochoa Hyde",
  //   coins: 100,
  //   moves: []
  // }





  user: User | null = null


  // InitUser() {
  //   const LoggedUser = localStorage.getItem(this.LOGGED_USER)
  //   if (LoggedUser) {

  //   }
  // }

  addCoins(coins: number) {
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
