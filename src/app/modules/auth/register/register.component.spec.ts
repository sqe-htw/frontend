import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Router, RouterModule} from "@angular/router";
import {AuthRoutingModule} from '../auth-routing.module'
import {HttpClientModule} from "@angular/common/http";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {of} from "rxjs";
import {UserRegister} from '../../../models/user';
import {AccountService} from "../../../shared/account.service";
import {RouterTestingModule} from "@angular/router/testing";
import {Location} from "@angular/common";
import { routes } from "../auth-routing.module";


describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let de: DebugElement;

  let service: AccountService;

  let spy: jasmine.Spy;

  let router: Router;

  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        AuthRoutingModule,
        HttpClientModule,
        RouterTestingModule.withRoutes(routes),
      ],
      providers: [ AccountService ],
      declarations: [ RegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    service = de.injector.get(AccountService);

    spy = spyOn(service, 'register').and.returnValue(of({} as UserRegister));


    fixture.detectChanges();
    router.initialNavigation();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have button with register text', () => {
    expect(de.query(By.css('button')).nativeElement.innerText).toContain('Registrieren');
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

  it('should call register one time, with inputted values', () => {
    updateForm('testUsername', 'testPassword');
    component.onSubmit();
    expect(spy).toHaveBeenCalledWith({ username: 'testUsername', password: 'testPassword' });
    expect(spy.calls.all().length).toEqual(1);
  });

  it('should register the user',   () => {
    updateForm('testUsername', 'testPassword');
        component.onSubmit();
        expect(spy).toHaveBeenCalledWith({ username: 'testUsername', password: 'testPassword' });
        expect(component.registerError).toBeFalsy();
      });

  it('should navigate from register to login', fakeAsync(() => {
    router.navigate(['/login'])
    tick();
    expect(location.path()).toBe('/login')
  }));

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

