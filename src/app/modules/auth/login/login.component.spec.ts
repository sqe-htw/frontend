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



describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
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
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    service = de.injector.get(AccountService);

    spy = spyOn(service, 'login').and.returnValue(of({} as UserAuth));


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

  it('form should be updated', () => {
    updateForm('testUsername', 'testPassword');
    expect(component.form.value.username).toEqual('testUsername');
    expect(component.form.value.password).toEqual('testPassword');

  })

  it('should call login on time and update the view', () => {
    updateForm('testUsername', 'testPassword');

    component.onSubmit();
    expect(spy).toHaveBeenCalledWith({ username: 'testUsername', password: 'testPassword' });
    expect(spy.calls.all().length).toEqual(1);
  });

  /**
   * Sets the values of the login form programmatically
   * @param username set in the form
   * @param password set in the form
   */
  function updateForm(username: string, password: string) {
    component.form.controls['username'].setValue(username);
    component.form.controls['password'].setValue(password);
  }

});
