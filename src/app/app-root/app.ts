import { Component, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { ContactService } from '../services/contact.service';
import { Contact } from '../models/contact.model';
import { CustomRoute } from '../models/custom-routes.model';
import { BitcoinService } from '../services/bitcoin.service';
import { LoaderService } from '../services/loader-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App implements OnInit {

  private contactService = inject(ContactService)
  private bitcoinService = inject(BitcoinService)
  private loaderService = inject(LoaderService)

  contacts: Contact[] | undefined
  currRoute: CustomRoute | null = { name: 'wallet', isActive: true, }


  customRoutes: CustomRoute[] = [
    { name: 'wallet', isActive: true, },
    { name: 'contacts', isActive: false, },
    { name: 'details', isActive: false, id: '' },
    { name: 'dash-board', isActive: false, }
  ]

  setCustomRoutes(route: CustomRoute) {
    this.customRoutes.forEach(r => {
      if (r.name === route.name) {
        r.isActive = true
        if (route.id) {
          r.id = route.id
        }
      }
      else r.isActive = false
    })
    this.currRouteName()
  }

  currRouteName() {
    const res = this.customRoutes.find(route => route.isActive);
    if (!res) return
    return this.currRoute = res
  }

  activeRouteName() {
    return this.currRoute?.name || '';
  }

  ngOnInit(): void {
    this.loaderService.osSetIsLoading(true)
    this.contactService.loadContacts()
      .subscribe({
        next: () => this.loaderService.osSetIsLoading(false),
        error: err => console.log('err', err)
      })

    this.bitcoinService.getRate(100).subscribe({
      error: err => console.log('err', err)
    })

    this.bitcoinService.getMarketPrice()
      .subscribe({
        error: err => console.log('err', err)
      })

    this.bitcoinService.getBlockSize()
      .subscribe({
        error: err => console.log('err', err)
      })

    this.bitcoinService.getTradeVolume()
      .subscribe({
        error: err => console.log('err', err)
      })
  }


}
