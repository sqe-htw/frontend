import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../shared/account.service";
import {GameService} from "../../shared/game.service";
import {Router} from "@angular/router";
import {first} from "rxjs/operators";
import {Card} from "../../models/card";

@Component({
  selector: 'app-manage-cards',
  templateUrl: './manage-cards.component.html',
  styleUrls: ['./manage-cards.component.sass']
})
export class ManageCardsComponent implements OnInit {

  userToken!: string;
  userId!: number;
  public cards: Card[] = [];

  constructor(private accountService: AccountService,
              private gameService: GameService,
              private router: Router) { }

  async ngOnInit(): Promise<void> {
    console.log(this.accountService.currentUser().access_token)
    this.userToken = this.accountService.currentUser().access_token;
    this.userId = this.accountService.currentUser().user.id;

    await this.getAllCards(this.userId, this.userToken);
  }

  getAllCards(userId: number, userToken: string) {
    this.gameService.getAllCards(userId, userToken).pipe(first())
        .subscribe({
          next: (cards: Card[]) => {
            console.log(cards);
            this.cards = cards;
          },
        });
    console.log(this.cards)
  }

}
