import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../shared/account.service";
import {GameService} from "../../shared/game.service";
import {Router} from "@angular/router";
import {first} from "rxjs/operators";
import {Card} from "../../models/card";
import {UserAuth} from "../../models/user";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-manage-cards',
  templateUrl: './manage-cards.component.html',
  styleUrls: ['./manage-cards.component.sass']
})
export class ManageCardsComponent implements OnInit {

  userToken!: string;
  userId!: number;
  public cards: Card[] = [];

  public createError: boolean = false;
  public loading: boolean = false;
  submitted = false;
  public valid = false;

  form!: FormGroup;

  constructor(private accountService: AccountService,
              private gameService: GameService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  async ngOnInit(): Promise<void> {
    this.form = this.formBuilder.group({
      cardText: ['', [Validators.required, Validators.minLength(1)]]
    });
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

  async deleteCard(card: Card){
    console.log(`delete card ${card.id}`);

    await this.gameService.deleteCard(this.userId, this.userToken, card.id)
        .subscribe(value => this.getAllCards(this.userId, this.userToken));
  }

  get f() { return this.form.controls; }

  async createCard(): Promise<void> {
    console.log("__debug: onSubmit create text component");

    // this.submitted = true;

    if (this.form.invalid) {
      this.valid = false;
      return;
    }
    this.valid = true;

    console.log("Value:" +this.form.value.cardText);
    // this.loading = true;

    await this.gameService.createCard(this.userId, this.userToken, this.form.value.cardText)
        .subscribe(value => this.getAllCards(this.userId, this.userToken));

    this.form.reset();

  }

}
