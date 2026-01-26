import { inject, Injectable } from '@angular/core';
import { UserService } from './user.service';
import { BehaviorSubject, concatMap, delay, distinctUntilChanged, of, Subject, tap } from 'rxjs';
import { Msg } from '../models/msg.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})

export class UserMsgService {

  private _msg = new BehaviorSubject<Msg | null>(null)
  public msg$ = this._msg.asObservable().pipe(distinctUntilChanged())

  private _msgQueue$ = new Subject<Msg>()
  private _msgQueueTimeOut$ = this._msgQueue$.pipe(
    concatMap(msg => {
      return of(msg).pipe(
        delay(0),
        tap(msg => this._msg.next(msg)),
        delay(1500),
        tap(() => this._msg.next(null))
      )
    })
  )

  constructor() {
    this._msgQueueTimeOut$.pipe(takeUntilDestroyed()).subscribe()
  }

  CloseMsg() {
    this._msg.next(null)
  }

  private _setMsg(msg: Msg) {
    this._msgQueue$.next(msg)
  }

  public onSetSuccessMsg(txt: string) {
    this._setMsg({ txt, type: 'success' })
  }
  public onSetErrorMsg(txt: string) {
    this._setMsg({ txt, type: 'error' })
  }



}
