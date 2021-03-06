import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import {MenuComponent} from "../../core/main_menu/menu/menu.component";
import {AccountService} from "../../shared/account.service";
import {ManageCardsComponent} from "../../core/manage-cards/manage-cards.component";

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'main-menu', canActivate: [AccountService], component: MenuComponent},
  { path: 'manage-cards', canActivate: [AccountService], component: ManageCardsComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
