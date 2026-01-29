import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app-routing-module'; 
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ApplicationConfig } from '@angular/core';

export const  appConfig: ApplicationConfig = {
 providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    provideAnimationsAsync('animations')

]} 

