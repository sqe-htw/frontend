import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../shared/account.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  userName!: String;
  loggedIn!: boolean;
  constructor(private accountService: AccountService,
              private router: Router) { }

  ngOnInit(): void {
    this.accountService.currentLoggedIn.subscribe(currentLoggedIn => this.loggedIn = currentLoggedIn);
    this.userName = this.accountService.currentUser().user.username;
  }

  /**
   * Falls User eingeloggt ist, navigiere bei click aufs Logo zum Spielhauptmenü.
   * Andernfalls navigiere zum router-outlet
   */
  navigate(){
    console.log(this.loggedIn)
    if(this.loggedIn == false){
      this.router.navigateByUrl('');
    }else{
      this.router.navigateByUrl('main-menu');
    }
  }


  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('');
  }

  resetPassword() {
    this.router.navigateByUrl('reset-password');
  }

}
