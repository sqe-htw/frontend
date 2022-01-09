import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCardsComponent } from './manage-cards.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Router, RouterModule} from "@angular/router";
import {AppRoutingModule, routes} from "../../app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {AccountService} from "../../shared/account.service";
import {GameService} from "../../shared/game.service";
import {of} from "rxjs";
import {UserAuth} from "../../models/user";
import {Location} from "@angular/common";
import {DebugElement} from "@angular/core";

describe('ManageCardsComponent', () => {
  let component: ManageCardsComponent;
  let fixture: ComponentFixture<ManageCardsComponent>;

  let de: DebugElement;

  let accountService: AccountService;
  let gameService: GameService;


  let spy: jasmine.Spy;

  let router: Router;

  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        AppRoutingModule,
        HttpClientModule,
        RouterTestingModule.withRoutes(routes),
      ],
      providers: [ AccountService, GameService ],
      declarations: [ ManageCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement;


    accountService = de.injector.get(AccountService);
    gameService = de.injector.get(GameService);

    //spy = spyOn(service, 'login').and.returnValue(of({} as UserAuth));

    fixture.detectChanges();
    // router.initialNavigation();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
