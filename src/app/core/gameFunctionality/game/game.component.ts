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

    constructor(private accountService: AccountService,
                private gameService: GameService,
                private router: Router) {
        this.showGame = false;
        this.names = [];
        this.cards = {};
        this.user = {};
    }

    async ngOnInit(): Promise<void> {
        console.log(this.accountService.currentUser().access_token)
        this.userToken = this.accountService.currentUser().access_token;
        this.userId = this.accountService.currentUser().user.id;
        this.names = window.history.state.names;
        if (this.names === undefined) {
            this.router.navigateByUrl('gameSettings')
        }
        console.log(this.names)
        this.user = this.accountService.currentUser().user;
        await this.getAllCards(this.userId, this.userToken);
    }

    getAllCards(userId: number, userToken: string) {
        this.gameService.getAllCards(userId, userToken).pipe(first())
            .subscribe({
                next: (event: any) => {
                    this.cards = event;
                    this.showCardText()
                },
            });
        console.log(this.cards)
    }

    cancel() {
        this.router.navigateByUrl('main-menu')
    }

    showName() {
        return this.names[Math.floor(Math.random() * this.names.length)];
    }

    showCardText() {
        var cards = this.cards.map((x: { text: any; }) => {
            return x.text
        });
        return cards[Math.floor(Math.random() * cards.length)];
    }

    next() {
        this.showName();
        this.showCardText();
    }

}