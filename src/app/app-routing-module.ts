import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { ContactPage } from './pages/contact-page/contact-page';
import { DashBoard } from './pages/dash-board/dash-board';
import { PageNotFound } from './components/page-not-found/page-not-found';
import { ContactDetailsPage } from './pages/contact-details-page/contact-details-page';
import { authGuard } from './guards/auth-guard';
import { contactResolver } from './resolvers/contact-resolver';
import { ContactEditReactive } from './pages/contact-edit-reactive/contact-edit-reactive';
import { Signup } from './pages/signup/signup';
import { Transaction } from './components/transaction/transaction';
import { noAuthGuard } from './guards/no-auth-guard';

export const routes: Routes = [
  {
    path: 'wallet', component: HomePage
    , children: [
      {
        path: 'transaction',
        loadComponent: () => import('./components/transaction/transaction').then(m => m.Transaction)
      },
    ]
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/signup/signup').then(m => m.Signup)
    ,
    canActivate: [noAuthGuard]

  },
  {
    path: 'contacts',
    loadComponent: () => import('./pages/contact-page/contact-page').then(m => m.ContactPage),
    children: [
      {
        path: 'edit',
        loadComponent: () => import('./pages/contact-edit-reactive/contact-edit-reactive').then(m => m.ContactEditReactive),
      },
    ], canActivate: [authGuard]
  },
  {
    path: 'dash-board',
    loadComponent: () => import('./pages/dash-board/dash-board').then(m => m.DashBoard),
    canActivate: [authGuard]

  },
  {
    path: 'details/:contactId',
    loadComponent: () => import('./pages/contact-details-page/contact-details-page').then(m => m.ContactDetailsPage),
    children: [
      {
        path: 'edit',
        loadComponent: () => import('./pages/contact-edit-reactive/contact-edit-reactive').then(m => m.ContactEditReactive),
        resolve: { contact: contactResolver }
      }
    ]
    , canActivate: [authGuard], resolve: { contact: contactResolver }
  },
  { path: '', pathMatch: 'full', redirectTo: 'wallet' },
  {
    path: '**',
    loadComponent: () => import('./components/page-not-found/page-not-found').then(m => m.PageNotFound),

  },
];
// @NgModule({
//   imports: [RouterModule.forRoot(routes, { useHash: true })],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
