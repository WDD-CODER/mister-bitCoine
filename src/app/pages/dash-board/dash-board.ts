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
export class DashBoard{

  private bitcoinService = inject(BitcoinService)

  marketPrice_ = this.bitcoinService.btcMarketPrice_
  tradeVolume_ = this.bitcoinService.btcTradeVolume_
  blockSize_ = this.bitcoinService.btcBlockSize_

}
