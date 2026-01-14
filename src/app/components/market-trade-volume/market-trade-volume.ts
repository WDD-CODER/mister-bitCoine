import { Component, inject, Input } from '@angular/core';
import { BitcoinService } from '../../services/bitcoin.service';
import { ChartType } from 'angular-google-charts';
import { MarketPrice } from '../../models/market-price.model';


type ChartDataPoint = [
  string,
  number
]

@Component({
  selector: 'market-trade-volume',
  standalone: false,
  templateUrl: './market-trade-volume.html',
  styleUrl: './market-trade-volume.scss',
})

export class MarketTradeVolume {

  @Input() tradeVolume!: MarketPrice

  private bitcoinService = inject(BitcoinService)
  newValues!: ChartDataPoint[]

  barTitle: string = '';
  barType: ChartType = ChartType.BarChart; // Or ChartType.ColumnChart for vertical bars

  ngOnInit(): void {
    if (!this.tradeVolume) return
    const newValues = this.tradeVolume?.values.map((value): ChartDataPoint => {
      let newData = new Date(value.x * 1000).toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' })
      return [newData.toString(), value.y]
    });
    this.barTitle = this.tradeVolume.description
    this.newValues = newValues.splice(-10)
  }

  options = {
    chartArea: { width: '80%', height: '70%' },
    backgroundColor: 'transparent',
    legend: { position: 'bottom' }
  };
}
