import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app-root/app';
import { ContactFilter } from './components/contact-filter/contact-filter';
import { ContactList } from './components/contact-list/contact-list';
import { ContactPreview } from './components/contact-preview/contact-preview';
import { Input } from './components/input/input';
import { ContactDetailsPage } from './pages/contact-details-page/contact-details-page';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Loader } from './components/loader/loader';
import { PageNotFound } from './components/page-not-found/page-not-found';
import { ContactEditReactive } from './pages/contact-edit-reactive/contact-edit-reactive';
import { ColorPalette } from './components/color-palette/color-palette';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DateDescriptionPipe } from './pipes/date-description-pipe';
import { FilterArr} from './pipes/filter-arr-pipe';
import { SimpleList } from './components/simple-list/simple-list';
import { FetchData } from './pipes/fetch-data-pipe';
import {  TextColorPipe } from './pipes/Text-color-pipe';
import { SignupLogin } from './components/signup-login/signup-login';

@NgModule({
  declarations: [
    App,
    ContactFilter,
    ContactList,
    ContactPreview,
    Input,
    ContactDetailsPage,
    ContactPage,
    HomePage,
    AppHeader,
    DashBoard,
    AppFooter,
    MarketPriceChart,
    MarketTradeVolume,
    MarketBlockSize,
    Loader,
    PageNotFound,
    // ContactEdit,
    ContactEditReactive,
    ColorPalette,
    DateDescriptionPipe,
    FilterArr,
    SimpleList,
    FetchData,
    TextColorPipe,
    SignupLogin,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleChartsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideHttpClient(),
    provideBrowserGlobalErrorListeners(),
    provideAnimationsAsync('animations')
  ],
  bootstrap: [App]
})
export class AppModule { }
