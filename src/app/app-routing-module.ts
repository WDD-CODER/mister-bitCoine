import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { ContactPage } from './pages/contact-page/contact-page';
import { DashBoard } from './pages/dash-board/dash-board';
import { PageNotFound } from './components/page-not-found/page-not-found';
import { ContactDetailsPage } from './pages/contact-details-page/contact-details-page';
import { ContactEdit } from './pages/contact-edit/contact-edit';
import { ContactList } from './components/contact-list/contact-list';

const routes: Routes = [
  { path: 'wallet', component: HomePage },
  {
    path: 'contacts', component: ContactPage, children: [
      { path: 'contact-list', component: ContactList },
      { path: 'edit', component: ContactEdit }
      // path: 'contacts/:contact', component: ContactEdit
    ]
  },
  { path: 'dash-board', component: DashBoard },
  { path: 'details/:contactId', component: ContactDetailsPage },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', component: PageNotFound },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
