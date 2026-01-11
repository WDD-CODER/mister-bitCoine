import { Injectable, OnInit } from '@angular/core';
import { storageService } from './async-storage.service';



const MARKET_PRICE_db = 'market-price-db'

type PriceValues = {
  x: number
  y: number
}

type marketPrice = {
  status: string
  name: number
  unit: string,
  period: string,
  description: string
  values: PriceValues[]
}
@Injectable({
  providedIn: 'root',
})

export class BitcoinService {

  savedMarketPrice: marketPrice | null = null


  public async getRate(coins: number) {
    const url = `https://blockchain.info/tobtc?currency=USD&value=${coins}`
    return fetch(url)
      .then(res => {
        if (!res) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => data)
      .catch(err => {
        console.log("🚀 ~ BitcoinService ~ getRate ~ err:", err)
        throw err;
      });
  }

  public async getMarketPrice() {

    const url = 'https://api.blockchain.info/charts/marketprice?timespan=5months&format=json&cors=true'
    console.log('this.savedMarketPrice', this.savedMarketPrice)
    
    // if (!this.savedMarketPrice)
      // const marketPrice = 
      return fetch(url)
        .then(res => {
          console.log('res', res)
          return res.json()
        })
        .then(data => data)
        .catch(err => {
          console.log('err', err)
          throw err
         })

  }
}
