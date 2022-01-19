import {Component, OnInit} from "@angular/core";
import {AccountService} from "../../../shared/account.service";
import {Router} from "@angular/router";
import {GameService} from "../../../shared/game.service";

@Component({
    selector: 'app-gameSettings',
    templateUrl: './gameSettings.component.html',
    styleUrls: ['./gameSettings.component.sass']
})

export class GameSettingsComponent implements OnInit {

    userToken!: string;
    public names: any;
    public cardText: any;

    constructor(private accountService: AccountService,
                private gameService: GameService,
                private router: Router) {
        this.names = [];
        this.cardText = [];
    }

    ngOnInit(): void {
        this.userToken = this.accountService.currentUser().access_token;
    }

    cancel(){
        this.router.navigateByUrl('main-menu')
    }

    play(name:string){
        if(name.length !== 0){
            this.names = name.split(",")
            this.router.navigateByUrl('game', {state: {names: this.names}});
        }
    }

}