import { Component, DestroyRef, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { BitcoinService } from '../../services/bitcoin.service';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'home-page',
  standalone: false,
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {

  private userService = inject(UserService)
  private bitcoinService = inject(BitcoinService)

  user$: Observable<User> = this.userService.user$
  btcRate$: Observable<number> = this.user$.pipe(
    switchMap(user => this.bitcoinService.getRateStream(user.coins))
  ) 

  onAddCoins(ev:MouseEvent) {
    this.userService.addCoins(100)
}



}
