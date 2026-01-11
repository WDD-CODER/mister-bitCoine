import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { BitcoinService } from '../../services/bitcoin.service';

@Component({
  selector: 'home-page',
  standalone: false,
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {

  private userService = inject(UserService)
  private bitcoinService = inject(BitcoinService)


  user: User | null = null
  btc: string | null = null

  async ngOnInit() {
    this.user = this.userService.getUser()
    this.btc = await this.bitcoinService.getRate(this.user.coins)
  }


}
