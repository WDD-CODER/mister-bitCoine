import { Component, inject, Input, OnInit } from '@angular/core';
import { ChartType } from 'angular-google-charts';
import { BitcoinService } from '../../services/bitcoin.service';
import { MarketPrice } from '../../models/market-price.model';
import { Observable } from 'rxjs';

type ChartDataPoint = [
  string,
  number
]

@Component({
  selector: 'market-block-size',
  standalone: false,
  templateUrl: './market-block-size.html',
  styleUrl: './market-block-size.scss',
})
export class MarketBlockSize implements OnInit {

  @Input() blockSize!: MarketPrice

  // Pie Chart Configuration
  private bitcoinService = inject(BitcoinService)

  // blockSize$: Observable<MarketPrice | null> = this.bitcoinService.getBlockSize()
  
  newValues!: ChartDataPoint[]
  pieTitle: string = ''

  ngOnInit(): void {
    if (!this.blockSize) return;
    const newValues = this.blockSize?.values.map((value, idx): ChartDataPoint => {
      let newData = new Date(value.x * 1000).toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' })
      return [newData.toString(), value.y]
    });
    this.pieTitle = this.blockSize.description
    this.newValues = newValues.slice(-5)
  }




  pieType = ChartType.PieChart;

  pieOptions = {
    titlePosition: 'none',
    chartArea: { width: '80%', height: '70%' },
    backgroundColor: 'transparent',
    legend: { position: 'bottom' },
    is3D: true,
    pieHole: 0.4
  };

}
