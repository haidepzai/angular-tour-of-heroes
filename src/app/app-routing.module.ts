import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';


/*
A typical Angular Route has two properties:

path: a string that matches the URL in the browser address bar.
component: the component that the router should create when navigating to this route.
*/
const routes: Routes = [
  { path: 'heroes', component: HeroesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, //navigate to the dashboard automatically
  { path: 'detail/:id', component: HeroDetailComponent }, //parameterized route
];

@NgModule({
  // adds the RouterModule to the AppRoutingModule imports array and configures it with the routes in one step by calling RouterModule.forRoot():
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] //available throughout the app.
})
export class AppRoutingModule { }