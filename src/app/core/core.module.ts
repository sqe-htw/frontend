import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './main_menu/menu/menu.component';
import { GameComponent } from './gameFunctionality/game/game.component';
import { GameSettingsComponent } from './gameFunctionality/gameSettings/gameSettings.component';
import { ManageCardsComponent } from './manage-cards/manage-cards.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [ HomeComponent, MenuComponent, GameComponent, GameSettingsComponent, ManageCardsComponent ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule
    ]
})
export class CoreModule { }
