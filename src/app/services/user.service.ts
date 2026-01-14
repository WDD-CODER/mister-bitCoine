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

  private _user$ = new BehaviorSubject<User>(this.user)
  public user$ = this._user$.asObservable()


  getUser(): User {
    return this.user
  }
}
