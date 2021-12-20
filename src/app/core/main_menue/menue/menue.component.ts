import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../../shared/account.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-menue',
    templateUrl: './menue.component.html',
    styleUrls: ['./menue.component.sass']
})
export class MenueComponent implements OnInit {

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

}
