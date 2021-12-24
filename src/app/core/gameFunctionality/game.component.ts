import {Component, OnInit} from "@angular/core";
import {AccountService} from "../../shared/account.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.sass']
})

export class GameComponent implements OnInit {

    userName!: String;
    public showGame: any;

    constructor(private accountService: AccountService,
                private router: Router) {
        this.showGame = false;
    }

    ngOnInit(): void {
        this.userName = this.accountService.currentUser().user.username;
    }

    cancel(){
        this.router.navigateByUrl('main-menu')
    }

    play(){
        this.showGame = true
    }

    next(){

    }

}