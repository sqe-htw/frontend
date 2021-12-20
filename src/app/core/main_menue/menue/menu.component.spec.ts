import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "../../../app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {AccountService} from "../../../shared/account.service";
import {LoginComponent} from "../../../modules/auth/login/login.component";
import {of} from "rxjs";
import {UserAuth} from "../../../models/user";
import {DebugElement} from "@angular/core";

describe('MenueComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let de: DebugElement;


  let service: AccountService;
  let spy: jasmine.Spy;

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


    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
