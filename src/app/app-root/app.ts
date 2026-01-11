import { Component, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { ContactService } from '../services/contact.service';
import { Contact } from '../models/contact.model';
import { CustomRoute } from '../models/custom-routes.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App implements OnInit {

  private contactService = inject(ContactService)

  contacts: Contact[] | undefined
  currRoute: CustomRoute | null = { name: 'wallet', isActive: true, }

  
  customRoutes: CustomRoute[] = [
    { name: 'wallet', isActive: true, },
    { name: 'contacts', isActive: false, },
    { name: 'details', isActive: false, },
    { name: 'dash-board', isActive: false, }
  ]

  setCustomRoutes(route: CustomRoute) {
    console.log("🚀 ~ App ~ setCustomRoutes ~ route:", route)
    this.customRoutes.forEach(r => {
      if (r.name === route.name) {
        r.isActive = true
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
    this.contactService.loadContacts()
      .subscribe({
        error: err => console.log('err', err)
      })
  }


}
