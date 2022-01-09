import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../shared/account.service";
import {GameService} from "../../shared/game.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-manage-cards',
  templateUrl: './manage-cards.component.html',
  styleUrls: ['./manage-cards.component.sass']
})
export class ManageCardsComponent implements OnInit {

  constructor(private accountService: AccountService,
              private gameService: GameService,
              private router: Router) { }

  ngOnInit(): void {
  }

}
