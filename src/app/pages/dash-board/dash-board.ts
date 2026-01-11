import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MarketPrice } from '../../models/market-price.model';
import { BitcoinService } from '../../services/bitcoin.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'dash-board',
  standalone: false,
  templateUrl: './dash-board.html',
  styleUrl: './dash-board.scss',
})
export class DashBoard implements OnInit {

  marketPrice: MarketPrice | null = null

  private bitcoinService = inject(BitcoinService)
  private destroyRef = inject(DestroyRef)


  ngOnInit() {
    this.bitcoinService.btcMarketPrice$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: marketPrice =>this.marketPrice = marketPrice,
        error: err => console.log('err', err)
      })
  }


}
