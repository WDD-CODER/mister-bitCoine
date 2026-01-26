import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/app-routing-module'; 
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideBrowserGlobalErrorListeners } from '@angular/core';
import { App } from './app/app-root/app';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideBrowserGlobalErrorListeners(),
    provideAnimationsAsync('animations')
  ]
}).catch(err => console.error(err));

// import { platformBrowser } from '@angular/platform-browser';
// import { AppModule } from './app/app-module';

// platformBrowser().bootstrapModule(AppModule, {
//   ngZoneEventCoalescing: true,
// })
//   .catch(err => console.error(err));
