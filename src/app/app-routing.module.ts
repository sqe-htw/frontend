import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import {MenuComponent} from "./core/main_menu/menu/menu.component";
import { GameComponent } from "./core/gameFunctionality/game/game.component";
import { GameSettingsComponent } from "./core/gameFunctionality/gameSettings/gameSettings.component";
import {LoginComponent} from "./modules/auth/login/login.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'main-menu', component: MenuComponent },
  { path: 'game', component: GameComponent },
  { path: 'gameSettings', component: GameSettingsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
