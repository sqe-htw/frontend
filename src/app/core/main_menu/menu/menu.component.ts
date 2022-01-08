import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../../shared/account.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {

    userName!: String;

    constructor(private accountService: AccountService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.userName = this.accountService.currentUser().user.username;
    }

    logout() {
      this.accountService.logout();
      this.router.navigateByUrl('');
    }

    play() {
        this.router.navigateByUrl('gameSettings');
    }

}
