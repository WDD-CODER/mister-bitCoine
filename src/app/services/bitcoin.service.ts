import { Injectable, OnInit, signal } from '@angular/core';
import { storageService } from './async-storage.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, from, interval, Observable, of, retry, switchMap, tap, timer } from 'rxjs';
import { MarketPrice } from '../models/market-price.model';



const MARKET_PRICE_DB = 'market-price-db'
const BLOCK_SIZE_DB = 'block-size-db'
const TRADING_VOLUME_DB = 'trading-volume-db'
@Injectable({
  providedIn: 'root',
})

export class BitcoinService {

  constructor(private http: HttpClient) { }

  private _btcRate_ = signal<number>(0)
  public btcRate_ = this._btcRate_.asReadonly()

  private _btcMarketPrice_ = signal<MarketPrice | null>(null)
  public btcMarketPrice_ = this._btcMarketPrice_.asReadonly()

  private _btcBlockSize_ = signal<MarketPrice | null>(null)
  public btcBlockSize_ = this._btcBlockSize_.asReadonly()

  private _btcTradeVolume_ = signal<MarketPrice | null>(null)
  public btcTradeVolume_ = this._btcTradeVolume_.asReadonly()


  public getRateStream(coins: number): Observable<number> {
    return timer(0, 1000)
      .pipe(
        switchMap(() => this.getRate(coins)
        ))
  }

  public getRate(coins: number) {
    const url = `https://blockchain.info/tobtc?currency=USD&value=${coins}`
    return from(this.http.get<number>(url))
      .pipe(
        tap(rate => this._btcRate_.set(rate)),
        retry(2)
      )
  }

  public getMarketPrice() {
    const url = 'https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true'
    var cachedData = localStorage.getItem(MARKET_PRICE_DB)

    if (cachedData) {
      let data = JSON.parse(cachedData) as MarketPrice
      this._btcMarketPrice_.set(data)
      return of(data)
    }

    return from(this.http.get<MarketPrice>(url))
      .pipe(
        tap(marketPrice => {
          localStorage.setItem(MARKET_PRICE_DB, JSON.stringify(marketPrice))
          this._btcMarketPrice_.set(marketPrice)
        }),
        retry(2)
      )
  }

  public getBlockSize() {
    const url = 'https://api.blockchain.info/charts/avg-block-size?timespan=5months&format=json&cors=true'
    var cachedData = localStorage.getItem(BLOCK_SIZE_DB)

    if (cachedData) {
      let data = JSON.parse(cachedData) as MarketPrice
      this._btcBlockSize_.set(data)
      return of(data)
    }

    return from(this.http.get<MarketPrice>(url))
      .pipe(
        tap(BlockSize => {
          localStorage.setItem(BLOCK_SIZE_DB, JSON.stringify(BlockSize))
          this._btcBlockSize_.set(BlockSize)
        }),
        retry(2)
      )
  }

  public getTradeVolume() {
    const url = 'https://api.blockchain.info/charts/trade-volume?timespan=5months&format=json&cors=true'
    var cachedData = localStorage.getItem(TRADING_VOLUME_DB)

    if (cachedData) {
      let data = JSON.parse(cachedData) as MarketPrice
      this._btcTradeVolume_.set(data)
      return of(data)
    }

    return from(this.http.get<MarketPrice>(url))
      .pipe(
        tap(BlockSize => {
          localStorage.setItem(TRADING_VOLUME_DB, JSON.stringify(BlockSize))
          this._btcBlockSize_.set(BlockSize)
        }),
        retry(2)
      )
  }

}
