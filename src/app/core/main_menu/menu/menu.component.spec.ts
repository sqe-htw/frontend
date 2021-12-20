import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "../../../app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {AccountService} from "../../../shared/account.service";
import {UserAuth} from "../../../models/user";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let de: DebugElement;


  let service: AccountService;
  let spy: jasmine.Spy;
  let logoutSpy: jasmine.Spy;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        AppRoutingModule,
        HttpClientModule,
      ],
      providers: [ AccountService ],
      declarations: [ MenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    service = de.injector.get(AccountService);

    spy = spyOn(service, 'currentUser').and.returnValue({user: {username: 'Tester'}} as UserAuth);
    logoutSpy= spyOn(service, 'logout');



    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should paint the play button', () => {
    expect(de.query(By.css('#playButton')).nativeElement.innerText).toContain('Play');
  });

  it('should paint the manage cards button', () => {
    expect(de.query(By.css('#manageCardsButton')).nativeElement.innerText).toContain('Manage Cards');
  });

  it('should paint the logout button', () => {
    expect(de.query(By.css('#logoutButton')).nativeElement.innerText).toContain('Logout');
  });

  it('logout button should logout user', () => {
    component.logout();
    expect(spy).toHaveBeenCalled();
  });
});
