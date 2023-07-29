import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { MainScreenComponent } from './components/main-screen/main-screen.component';

const routes: Routes = [
  { path: 'favorites', component: FavoritesComponent },
  { path: 'main-screen/:cityName', component: MainScreenComponent },
  { path: '', redirectTo: '/main-screen/Tel Aviv', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
