import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './main_menue/menu/menu.component';



@NgModule({
  declarations: [ HomeComponent, MenuComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class CoreModule { }
