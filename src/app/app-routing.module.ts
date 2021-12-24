import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import {MenuComponent} from "./core/main_menu/menu/menu.component";
import { GameComponent } from "./core/gameFunctionality/game.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'main-menu', component: MenuComponent },
  { path: 'game', component: GameComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
