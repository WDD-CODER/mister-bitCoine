import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BitcoinService {

  public async getRate(coins: number) {
    const url = `https://blockchain.info/tobtc?currency=USD&value=${coins}`
    return fetch(url)
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => data)
      .catch(err => {
        console.log("🚀 ~ BitcoinService ~ getRate ~ err:", err)
        throw err;
      });
  }

}
