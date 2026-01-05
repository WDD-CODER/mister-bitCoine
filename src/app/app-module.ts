import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app-root/app';
import { ContactFilter } from './components/contact-filter/contact-filter';
import { ContactList } from './components/contact-list/contact-list';
import { ContactPreview } from './components/contact-preview/contact-preview';
import { Input } from './components/input/input';
import { ContactDetailsPage } from './pages/contact-details-page/contact-details-page';
import { ContactEditPage } from './pages/contact-edit-page/contact-edit-page';
import { ContactPage } from './pages/contact-page/contact-page';
import { HomePage } from './pages/home-page/home-page';
import { AppHeader } from './components/app-header/app-header';

@NgModule({
  declarations: [
    App,
    ContactFilter,
    ContactList,
    ContactPreview,
    Input,
    ContactDetailsPage,
    ContactEditPage,
    ContactPage,
    HomePage,
    AppHeader,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
