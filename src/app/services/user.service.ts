import { inject, Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject, filter, from, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';
import { Contact } from '../models/contact.model';
import { ContactService } from './contact.service';
import { Router } from '@angular/router';
import { Move } from '../models/move.model';
import { ReceiveMove } from '../models/receive-move.model';
import { UtilService } from './util.service';
import { storageService } from './async-storage.service';
import { UserMsgService } from './user-msg.service';


const SINGED_USERS = 'signed-users-db'
@Injectable({
  providedIn: 'root',
})

export class UserService {

  utilService = inject(UtilService)
  userMsgService = inject(UserMsgService)
  contactService = inject(ContactService)
  router = inject(Router)

  // private _signedUsers$ = new BehaviorSubject<User[] | null>(this.utilService.LoadFromStorage())
  // public signedUsers$ = this._signedUsers$.asObservable()

  // private _user$ = new BehaviorSubject<User | null>(this.utilService.LoadUserFromSession())
  // public user$ = this._user$.asObservable()
  
  private _users_ = signal<User[] | null>(this.utilService.LoadFromStorage())
  public users_ = this._users_.asReadonly()

  private _user_ = signal<User | null>(this.utilService.LoadUserFromSession())
  public user_ = this._user_.asReadonly()

  public signup(newUser: User) {
    return from(storageService.query<User>(SINGED_USERS)).pipe(
      map(users => users.find(_user => _user.name === newUser.name)),
      switchMap(user => user ?
        of(user)
        :
        from(storageService.post(SINGED_USERS, newUser))),
      tap(user => {
        this.userMsgService.onSetSuccessMsg('Signup Successfully ')
        this._saveUserLocal(user)
      }),
    )
  }


  public logout() {
    return of(null).pipe(
      tap(() => this._saveUserLocal(null))
    )
  }

  public login(userName: string) {
    return from(storageService.query<User>(SINGED_USERS)).pipe(
      map(users => users.find(_user => _user.name === userName)),
      filter(user => !!user),
      tap(user => {
        this._saveUserLocal(user as User)
      }),
    )
  }

  public addCoins(coins: number) {
    let user = this.user_()

    if (!user) return
    const UpdatedCoins = user.coins + coins
    const moveToAdd: Move = { toId: '', to: user.name, at: Date.now(), amount: coins }

    const updatedMoves = user.moves ? [...user.moves, moveToAdd] : [moveToAdd]
    const updatedUser = { ...user, coins: UpdatedCoins, moves: updatedMoves }
    this.userMsgService.onSetSuccessMsg('Add Coins Successfully ')

    this._updateUser(updatedUser)
    this.router.navigateByUrl('/wallet')
  }

  public addMove(contact: Contact, amount: number): Observable<User | null> {
    const user = { ...this._getLoggedInUser() }

    if (!amount) return of(null)

    if (!user.coins || user.coins < amount) return throwError(() => 'Not enough funds for transfer')

    let updatedCoins = user.coins - amount
    let curMoveFrom: Move = this._createMove(contact, amount)
    let curMoveTo: ReceiveMove = this._createReceiveMove(user, amount)

    const UpdatedUser = { ...user, coins: updatedCoins, moves: (!user.moves) ? [curMoveFrom] : [...user.moves, curMoveFrom], _id: user._id! }
    const updatedContact = { ...contact, coins: (contact.coins || 0) + amount, receivedMove: (!contact.receivedMove) ? [curMoveTo] : [...contact.receivedMove, curMoveTo] }


    return this.contactService.saveContact(updatedContact).pipe(
      switchMap(() => from(storageService.put(SINGED_USERS, UpdatedUser))),
      tap(() => this._saveUserLocal(UpdatedUser))
    );

  }


  private _updateUser(user: User): void {
    this._users_.update(prevUsers => {
      const users = prevUsers ? [...prevUsers] : []
      const idx = users.findIndex(u => u.name === user.name)
      if (idx !== -1) {
        users[idx] = user
      } else {
        users.push(user)
      }
      return users
    })
    this._saveUserLocal(user)
}

_saveUserLocal(user: User | null): void {
  this._user_.set(user && { ...user })
    this.utilService.saveUserToSession(user)
}

_clearSessionStorage() {
  console.log('variable')

  sessionStorage.clear()
  this._user_.set(null)
}

_getLoggedInUser(): User {
  return this._user_()!
}
_createMove(moveTo: Contact, amount: number): Move {
  return {
    toId: moveTo._id,
    to: moveTo.name,
    at: Date.now(),
    amount
  }
}

_createReceiveMove(moveFrom: User, amount: number): ReceiveMove {
  return {
    receivedFrom: moveFrom.name,
    at: Date.now(),
    amount
  }
}
}
