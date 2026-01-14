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
import { DashBoard } from './pages/dash-board/dash-board';
import { provideHttpClient } from '@angular/common/http';
import { AppFooter } from './components/app-footer/app-footer';
import { GoogleChartsModule } from 'angular-google-charts';
import { MarketPriceChart } from './components/market-price-chart/market-price-chart';
import { MarketTradeVolume } from './components/market-trade-volume/market-trade-volume';
import { MarketBlockSize } from './components/market-block-size/market-block-size';
import { FormsModule } from '@angular/forms';
import { Loader } from './components/loader/loader';

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
    DashBoard,
    AppFooter,
    MarketPriceChart,
    MarketTradeVolume,
    MarketBlockSize,
    Loader,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleChartsModule,
    FormsModule
  ],
  providers: [
    provideHttpClient(),
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
