import { Component, inject } from '@angular/core';
import { BehaviorSubject, concatMap, delay, distinctUntilChanged, Observable, of, Subject, tap } from 'rxjs';
import { UserService } from '../../services/user.service';
import { Msg } from '../../models/msg.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserMsgService } from '../../services/user-msg.service';

@Component({
  selector: 'user-msg',
  standalone: false,
  templateUrl: './user-msg.html',
  styleUrl: './user-msg.scss',
})
export class UserMsg {

  userMsgService = inject(UserMsgService)

  msg$: Observable<Msg | null> = this.userMsgService.msg$

  onCloseMsg($event: MouseEvent) {
    this.userMsgService.CloseMsg()
  }

}
