import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Router, RouterModule} from "@angular/router";
import {AppRoutingModule, routes} from "../../../app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {AccountService} from "../../../shared/account.service";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {GameService} from "../../../shared/game.service";
import {Location} from "@angular/common";
import {GameSettingsComponent} from "./gameSettings.component";
import {RouterTestingModule} from "@angular/router/testing";

describe('GameSettingsComponent', () => {
    let component: GameSettingsComponent;
    let fixture: ComponentFixture<GameSettingsComponent>;
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
            providers: [ AccountService, GameService ],
            declarations: [ GameSettingsComponent ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        router = TestBed.inject(Router);
        location = TestBed.inject(Location);

        fixture = TestBed.createComponent(GameSettingsComponent);
        component = fixture.componentInstance;
        de = fixture.debugElement;

        service = de.injector.get(GameService);
        accountService = de.injector.get(AccountService);

        fixture.detectChanges();
        router.initialNavigation();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should paint the play button', () => {
        expect(de.query(By.css('#playButton')).nativeElement.innerText).toContain('Start');
    });

    it('should paint the cancel button', () => {
        expect(de.query(By.css('#cancelButton')).nativeElement.innerText).toContain('Abbrechen');
    });

    it('should not start by not entering players', fakeAsync(() => {
        var names = ""
        component.play(names);
        tick();
        spyOn(location, 'path').and.returnValue('/gameSettings')
        spyOn(router, 'navigate').and.stub();
        expect(location.path()).toBe('/gameSettings')
    }));
});