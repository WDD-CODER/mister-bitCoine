import { Component, inject, OnInit } from '@angular/core';
import { BitcoinService } from '../../services/bitcoin.service';
import { MarketPrice } from '../../models/market-price.model';
import { MarketBlockSize } from '../../components/market-block-size/market-block-size';
import { MarketPriceChart } from '../../components/market-price-chart/market-price-chart';
import { MarketTradeVolume } from '../../components/market-trade-volume/market-trade-volume';
import { CommonModule } from '@angular/common';
import { GoogleChartsModule } from 'angular-google-charts';

type ChartDataPoint = [
  string,
  number
]

@Component({
  selector: 'dash-board',
  standalone: true,
  templateUrl: './dash-board.html',
  styleUrl: './dash-board.scss',
  imports:[GoogleChartsModule,MarketBlockSize,MarketPriceChart,MarketTradeVolume,CommonModule]
})
export class DashBoard implements OnInit {

  private bitcoinService = inject(BitcoinService)

  marketPrice: MarketPrice | null = null
  tradeVolume: MarketPrice | null = null
  blockSize: MarketPrice | null = null

  ngOnInit(): void {
    this.bitcoinService.btcMarketPrice$.subscribe({
      next: marketPrice => {
        if (!marketPrice) return;
        this.marketPrice = marketPrice
      },
      error: err => console.log('err', err)
    })
    this.bitcoinService.btcTradeVolume$.subscribe({
      next: tradeVolume => {
        if (!tradeVolume) return;
        this.tradeVolume = tradeVolume
      },
      error: err => console.log('err', err)
    })

    this.bitcoinService.btcBlockSize$.subscribe({
      next: blockSize => {
        if (!blockSize) return;
        this.blockSize = blockSize
      },
      error: err => console.log('err', err)
    })



  }
}
