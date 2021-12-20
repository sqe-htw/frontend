import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MenueComponent } from './main_menue/menue/menue.component';



@NgModule({
  declarations: [ HomeComponent, MenueComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class CoreModule { }
