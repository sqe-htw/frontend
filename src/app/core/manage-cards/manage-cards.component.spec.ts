import {ComponentFixture, TestBed} from '@angular/core/testing';

import { ManageCardsComponent } from './manage-cards.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Router, RouterModule} from "@angular/router";
import {AppRoutingModule, routes} from "../../app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {AccountService} from "../../shared/account.service";
import {GameService} from "../../shared/game.service";
import {of} from "rxjs";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {Card} from "../../models/card";

describe('ManageCardsComponent', () => {
  let component: ManageCardsComponent;
  let fixture: ComponentFixture<ManageCardsComponent>;

  let de: DebugElement;

  let accountService: AccountService;
  let gameService: GameService;


  let gameService_spy_delete: jasmine.Spy;
  let gameService_spy_create: jasmine.Spy;
  let gameService_spy_get: jasmine.Spy;


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

    gameService_spy_create = spyOn(gameService, 'createCard').and.returnValue(of({} as Card));
    gameService_spy_get = spyOn(gameService, 'getAllCards').and.returnValue(of([] as Card[]));
    gameService_spy_delete = spyOn(gameService, 'deleteCard').and.returnValue(of({} as Card));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have input-field with id cardTextInput', () => {
    expect(de.query(By.css('#cardTextInput'))).toBeDefined();
  });

  it('should call game-service when adding new card', () => {
    updateForm('test text');
    component.userId = 1;
    component.userToken = 'token';

    component.createCard();
    expect(gameService_spy_create).toHaveBeenCalledWith(1, 'token', 'test text');
  });

  it('should call game-service when fetching cards', () => {
    component.getAllCards(1, 'token');
    expect(gameService_spy_get).toHaveBeenCalledWith(1, 'token');
  });

  it('should call game-service when deleting cards', () => {
    component.userId = 1;
    component.userToken = 'token';
    component.deleteCard({id: 1, userId: 1, text: 'test text'} as Card);
    expect(gameService_spy_delete).toHaveBeenCalledWith(1, 'token', 1);
  });

  it('create button should be inactive without input text', () => {
    expect(de.query(By.css('#createButton')).nativeElement.disabled).toBeTruthy();
  });

  it('create button should be active with input text', () => {
    updateForm('text');
    fixture.detectChanges();
    expect(component.form.invalid).toBeFalsy();
    fixture.detectChanges();
    expect(de.query(By.css('#createButton')).nativeElement.disabled).toBeFalsy();
  });


  /**
   * Sets the values of the form programmatically
   * @param text set in the form
   */
  function updateForm(text: string) {
    component.form.controls['cardText'].setValue(text);
  }
});
