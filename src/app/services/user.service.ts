import { Injectable, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject, from, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class UserService {

private _user$ = new BehaviorSubject<User| null>(null)
public user$ = this._user$.asObservable()
  
  user: User | null = null

  getUser(): Observable<User> {
    return of({name: "Ochoa Hyde",coins: 100 ,moves: []})
  }
}
