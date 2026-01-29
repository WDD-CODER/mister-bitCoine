import { Component, inject } from '@angular/core';
import { BehaviorSubject, concatMap, delay, distinctUntilChanged, Observable, of, Subject, tap } from 'rxjs';
import { UserService } from '../../services/user.service';
import { Msg } from '../../models/msg.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserMsgService } from '../../services/user-msg.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'user-msg',
  standalone: true,
  templateUrl: './user-msg.html',
  styleUrl: './user-msg.scss',
  imports: [CommonModule]
})
export class UserMsg {

  userMsgService = inject(UserMsgService)

  public msg_ = this.userMsgService.msg_
  
  onCloseMsg($event: MouseEvent) {
    this.userMsgService.CloseMsg()
  }

}
