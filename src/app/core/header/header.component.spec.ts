import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Router, RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {of} from "rxjs";
import {User, UserRegister} from '../../models/user';
import {AccountService} from "../../shared/account.service";
import {RouterTestingModule} from "@angular/router/testing";
import {Location} from "@angular/common";
import { routes } from "../../app-routing.module";
import { HeaderComponent } from './header.component';



describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let de: DebugElement;

  let userService: AccountService;

  let spy: jasmine.Spy;

  let router: Router;

  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        HttpClientModule,
        RouterTestingModule.withRoutes(routes),
      ],
      providers: [ AccountService ],
      declarations: [ HeaderComponent ]
    })
        .compileComponents();
  });

  beforeEach(() => {

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    userService = de.injector.get(AccountService);

    fixture.detectChanges();
    router.initialNavigation();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ask user to log in if not logged in after ngOnInit', () => {
    userService.loggedIn = true;
    component.ngOnInit();
    expect(component.userName).toContain(userService.currentUser().user.username);
  });

  it('navigate to "main-menu" takes you to /main-menu', fakeAsync(() => {
    userService.loggedIn = true;
    router.navigate(['main-menu']);
    tick();
    expect(location.path()).toBe('/main-menu');
  }));

  it('navigate to "reset-password" takes you to /reset-password', fakeAsync(() => {
    router.navigate(['reset-password']);
    tick();
    expect(location.path()).toBe('/reset-password');
  }));

});
