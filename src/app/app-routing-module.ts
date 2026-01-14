import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { ContactPage } from './pages/contact-page/contact-page';
import { DashBoard } from './pages/dash-board/dash-board';
import { PageNotFound } from './omponents/page-not-found/page-not-found';
import { ContactDetailsPage } from './pages/contact-details-page/contact-details-page';

const routes: Routes = [
  {path:'wallet', component: HomePage},
  {path:'contacts', component: ContactPage},
  {path:'dash-board', component: DashBoard},
  {path:'details', component: ContactDetailsPage},
  {path:'', pathMatch:'full',redirectTo: 'home'},
  {path:'**', component: PageNotFound},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
