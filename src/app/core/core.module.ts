import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './main_menu/menu/menu.component';
import { GameComponent } from './gameFunctionality/game.component';



@NgModule({
  declarations: [ HomeComponent, MenuComponent, GameComponent ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class CoreModule { }
