import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Router, RouterModule} from "@angular/router";
import {AppRoutingModule, routes} from "../../../app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {AccountService} from "../../../shared/account.service";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {GameComponent} from "./game.component";
import {GameService} from "../../../shared/game.service";
import {Location} from "@angular/common";
import {RouterTestingModule} from "@angular/router/testing";

describe('GameComponent', () => {
    let component: GameComponent;
    let fixture: ComponentFixture<GameComponent>;
    let de: DebugElement;


    let service: GameService;
    let accountService: AccountService;
    let spy: jasmine.Spy;
    let location: Location;
    let router: Router;


    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                FormsModule,
                ReactiveFormsModule,
                RouterModule,
                AppRoutingModule,
                HttpClientModule,
                RouterTestingModule.withRoutes(routes)
            ],
            providers: [AccountService, GameService],
            declarations: [GameComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GameComponent);
        component = fixture.componentInstance;
        de = fixture.debugElement;

        service = de.injector.get(GameService);
        accountService = de.injector.get(AccountService);

        router = TestBed.inject(Router);
        location = TestBed.inject(Location);

        fixture.detectChanges();
        router.initialNavigation();
    });

    function initCards() {
        component.cards =
           [{id: 1, userId: 1, text: 'trinken'},
            {id: 2, userId: 1, text: 'lese deine letzte gesendete Nachricht vor'},
            {id: 3, userId: 1, text: 'verteile 2 Schlücke'}]

        component.cardTextList = ['trinken', 'lese deine letzte gesendete Nachricht vor', 'verteile 2 Schlücke']
    }

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show the next card', () => {
        component.names = "Max,Paul,Sarah,Anna";
        initCards();
        component.next();
        expect(component.names).toContain(component.displayName)
        expect(component.cardTextList).toContain(component.displayCard)
    });

    it('should paint a name on the card', () => {
        component.names = "Max,Paul,Sarah,Anna"
        component.showName()
        expect(component.names).toContain(component.displayName)
    });

    it('should paint a action on the card', () => {
        initCards();
        component.showCardText()
        expect(component.cardTextList).toContain(component.displayCard)
    });

    it('should paint the next button', () => {
        expect(de.query(By.css('#nextButton')).nativeElement.innerText).toContain('Next');
    });

    it('should paint the cancel button', () => {
        expect(de.query(By.css('#cancelGameButton')).nativeElement.innerText).toContain('Beenden');
    });

});