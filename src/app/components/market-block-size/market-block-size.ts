import { Component, inject, Input, OnInit } from '@angular/core';
import { ChartType, GoogleChart } from 'angular-google-charts';
import { BitcoinService } from '../../services/bitcoin.service';
import { MarketPrice } from '../../models/market-price.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

type ChartDataPoint = [
  string,
  number
]

@Component({
  selector: 'market-block-size',
  standalone: true,
  templateUrl: './market-block-size.html',
  styleUrl: './market-block-size.scss',
  imports:[GoogleChart,CommonModule]
})
export class MarketBlockSize implements OnInit {

  private bitcoinService = inject(BitcoinService)

  blockSize$: Observable<MarketPrice | null> = this.bitcoinService.getBlockSize()
  blockSize_ = this.bitcoinService.btcBlockSize_

  newValues!: ChartDataPoint[]
  pieTitle: string = ''

  ngOnInit(): void {
    const blockSize = this.blockSize_()
    if (blockSize) {
       const newValues = blockSize.values.map((value, idx): ChartDataPoint => {
          let newData = new Date(value.x * 1000).toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' })
          return [newData.toString(), value.y]
        });
        this.pieTitle = blockSize.description
        this.newValues = newValues.slice(-5)
    }
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
