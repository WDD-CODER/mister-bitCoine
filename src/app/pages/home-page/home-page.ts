import { Component, DestroyRef, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { BitcoinService } from '../../services/bitcoin.service';
import { filter, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'home-page',
  standalone: false,
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {

  private userService = inject(UserService)
  private bitcoinService = inject(BitcoinService)

  user$: Observable<User | null> = this.userService.user$
  btcRate$: Observable<number> = this.user$.pipe(
    filter((user): user is User => !!user),
    switchMap(user => this.bitcoinService.getRateStream(user.coins))
  ) 

  onAddCoins(ev:MouseEvent) {
    this.userService.addCoins(100)
}



}
