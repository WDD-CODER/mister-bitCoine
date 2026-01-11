import { Component, DestroyRef, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { BitcoinService } from '../../services/bitcoin.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'home-page',
  standalone: false,
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {

  private userService = inject(UserService)
  private bitcoinService = inject(BitcoinService)
  private destroyRef = inject(DestroyRef)

  user: User | null = null
  btcRate: number | undefined

  async ngOnInit() {
    this.userService.getUser()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({next: user => this.user = user })

    this.bitcoinService.btcRate$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: btcRate => this.btcRate = btcRate
      })
  }


}
