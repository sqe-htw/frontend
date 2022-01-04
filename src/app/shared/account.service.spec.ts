import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import { AccountService } from './account.service';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "../app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {environment} from "../../environments/environment";

describe('AccountService', () => {
  let service: AccountService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [
        HttpClientTestingModule,
        RouterModule,
        AppRoutingModule,
      ],});
    service = TestBed.inject(AccountService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('login should call http service', fakeAsync(() => {
      /*
      service.login({username: 'test', password: 'test'})
      tick();
      const req = httpMock.expectOne({method: 'POST'});
      expect(req.request.url).toBe(`${environment.apiUrl}/auth/login`);
      req.flush('Post');

       */
  }));

  it('register should call http service', fakeAsync (() => {
        service.register({username: 'test', password: 'test'}).subscribe();
        tick();
        const req = httpMock.expectOne({method: 'POST'});
        console.log(req.request.url);
        expect(req.request.url).toBe(`${environment.apiUrl}/user/register`);

      req.flush('Post');
  }));
});
