import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "../../../app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {of} from "rxjs";
import {User, UserAuth} from '../../../models/user';
import {AccountService} from "../../../shared/account.service";
import {first} from "rxjs/operators";



describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de: DebugElement;

  let serviceStub: any;

  beforeEach(async () => {

    serviceStub = {
      login: () => {
        console.log('stub called');
        return 'test';
      }
    };

    await TestBed.configureTestingModule({
      imports: [
          FormsModule,
        ReactiveFormsModule,
        RouterModule,
        AppRoutingModule,
        HttpClientModule
      ],
      providers: [{ provide: AccountService, useValue: serviceStub }],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have button with login text', () => {
    expect(de.query(By.css('button')).nativeElement.innerText).toContain('Einloggen');
  });

  it('submitted value should be initially false', () => {
    expect(component.submitted).toBeFalsy();
  });

  it('submit method should toggle submitted value', () => {
    expect(component.submitted).toBeFalsy();
    component.onSubmit();
    expect(component.submitted).toBeTruthy();
  });

  function updateForm(username: string, password: string) {
    component.form.controls['username'].setValue(username);
    component.form.controls['password'].setValue(password);
  }

});
