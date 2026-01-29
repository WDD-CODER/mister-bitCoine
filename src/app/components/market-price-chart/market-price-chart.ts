import { Component, inject, Input, OnInit } from '@angular/core';
import { ChartType, GoogleChart } from 'angular-google-charts';
import { MarketPrice } from '../../models/market-price.model';
import { BitcoinService } from '../../services/bitcoin.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

type ChartDataPoint = [
  string,
  number
]

@Component({
  selector: 'market-price-chart',
  standalone: true,
  templateUrl: './market-price-chart.html',
  styleUrl: './market-price-chart.scss',
  imports:[GoogleChart,CommonModule]
})

export class MarketPriceChart implements OnInit {


  private bitcoinService = inject(BitcoinService)
  
  public marketPrice_ = this.bitcoinService.btcMarketPrice_

  newValues!: ChartDataPoint[]
  title: string = ''

  ngOnInit(): void {
    const marketPrice = this.marketPrice_()
if (marketPrice) {
          const newValues = marketPrice.values.map((value): ChartDataPoint => {
          let newData = new Date(value.x * 1000).toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' })
          return [newData.toString(), value.y]
        })
        this.title = marketPrice.description;
        this.newValues = newValues
      }
}


  type = ChartType.LineChart;

  columnNames = ['Date', 'Price'];

  options = {
    hAxis: {
      title: 'Month',
      titleTextStyle: { fontSize: 14 },
      textStyle: { fontSize: 11 },
      slantedText: true,
      slantedTextAngle: 40
    },
    vAxis: { title: 'USD' },

    colors: ['#f2a900'],
    curveType: 'function',
    legend: { position: 'bottom' },

    chartArea: {
      left: '15%',
      top: '10%',
      width: '100%',
      height: '65%'
    },
    animation: {
      startup: true,
      duration: 1000,
      easing: 'out'
    }
  };

}
