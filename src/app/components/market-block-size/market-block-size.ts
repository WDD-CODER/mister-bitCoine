import { Component, inject, OnInit } from '@angular/core';
import { ChartType } from 'angular-google-charts';
import { BitcoinService } from '../../services/bitcoin.service';
import { MarketPrice } from '../../models/market-price.model';

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

  // Pie Chart Configuration
  private bitcoinService = inject(BitcoinService)
blockSize:MarketPrice | null = null
newValues!:ChartDataPoint[]

  ngOnInit(): void {
    this.bitcoinService.btcBlockSize$.subscribe({
      next: blockSize => {
        if (!blockSize) return;
        const newValues = blockSize?.values.map((value,idx): ChartDataPoint => {
          let newData = new Date(value.x * 1000).toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' })
          return [newData.toString(), value.y]
        });
        this.blockSize = blockSize
        this.pieTitle = blockSize.description
        this.newValues = newValues.slice(-5)
      },
      error: err => console.log('err', err)
    })

  }


  pieTitle = ''
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
