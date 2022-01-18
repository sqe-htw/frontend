import {Component, OnInit} from "@angular/core";
import {AccountService} from "../../../shared/account.service";
import {Router} from "@angular/router";
import {GameService} from "../../../shared/game.service";
import {first} from "rxjs/operators";

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.sass']
})

export class GameComponent implements OnInit {

    userToken!: string;
    userId!: number;
    user!: any;
    public showGame: any;
    public names: any;
    public cards: any;
    public cardTextList: any;
    public displayName: any;
    public displayCard: any;

    constructor(private accountService: AccountService,
                private gameService: GameService,
                private router: Router) {
        this.showGame = false;
        this.names = [];
        this.cards = {};
        this.cardTextList = {};
        this.user = {};
        this.displayName = "";
        this.displayCard = "";
    }

    async ngOnInit(): Promise<void> {
        this.userToken = this.accountService.currentUser().access_token;
        this.userId = this.accountService.currentUser().user.id;
        this.names = window.history.state.names;
        if (this.names === undefined) {
            this.router.navigateByUrl('gameSettings')
        }
        this.user = this.accountService.currentUser().user;
        await this.getAllCards(this.userId, this.userToken);
    }

    getAllCards(userId: number, userToken: string) {
        this.gameService.getAllCards(userId, userToken).pipe(first())
            .subscribe({
                next: (event: any) => {
                    this.cards = event;
                    this.showCardText()
                    this.showName()
                },
            });
    }

    cancel() {
        this.router.navigateByUrl('main-menu')
    }

    showName() {
        this.displayName =  this.names[Math.floor(Math.random() * this.names.length)];
    }

    showCardText() {
        this.cardTextList = this.cards.map((x: { text: any; }) => {
            return x.text
        });
        this.displayCard = this.cardTextList[Math.floor(Math.random() * this.cardTextList.length)];
    }

    next() {
        this.showName();
        this.showCardText();
    }

}