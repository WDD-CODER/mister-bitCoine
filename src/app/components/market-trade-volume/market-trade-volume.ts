import { Component, inject, Input } from '@angular/core';
import { BitcoinService } from '../../services/bitcoin.service';
import { ChartType } from 'angular-google-charts';
import { MarketPrice } from '../../models/market-price.model';
import { Observable } from 'rxjs';


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


  private bitcoinService = inject(BitcoinService)
  
  public tradeVolume$: Observable<MarketPrice> = this.bitcoinService.getTradeVolume()

  newValues!: ChartDataPoint[]
  barTitle: string = '';
  barType: ChartType = ChartType.BarChart; // Or ChartType.ColumnChart for vertical bars

  ngOnInit(): void {
    this.tradeVolume$.subscribe({
      next: tradeVolume => {
        if (!tradeVolume) return
        const newValues = tradeVolume?.values.map((value): ChartDataPoint => {
          let newData = new Date(value.x * 1000).toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' })
          return [newData.toString(), value.y]
        });
        this.barTitle = tradeVolume.description
        this.newValues = newValues.splice(-10)
      },
      error: err => console.log('Error', err)
    })

  }

  options = {
    chartArea: { width: '80%', height: '70%' },
    backgroundColor: 'transparent',
    legend: { position: 'bottom' }
  };
}
