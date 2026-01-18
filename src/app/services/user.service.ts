import { Injectable, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject, from, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class UserService {

  user: User = {
    name: "Ochoa Hyde",
    coins: 100,
    moves: []
  }
  // private _user$ = new BehaviorSubject<User | null>(null);
  private _user$ = new BehaviorSubject<User | null>(this.user)
  public user$ = this._user$.asObservable()


  getLoggedUser() {
    return this._user$.value
  }

  addCoins(coins: number) {
    const user = this._user$.value
    if (user) {
      const updatedUser = {...user, coins:user.coins + coins}
      this.user.coins += coins
      this._user$.next(updatedUser)
    }
    this._user$.next(null)
  }
}
