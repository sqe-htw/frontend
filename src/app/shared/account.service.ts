import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;


  constructor(
      private router: Router,
      private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem("user")|| '{}'));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
      return this.userSubject.value;
  }

  /**
   * Speichere Userdaten und jwt token in lokalem Speicher, User eingeloggt zu lassen
   * @param username 
   * @param password 
   * @returns 
   */
  login(username:string, password:string) {

  }

  /**
   * Entferne Nutzer vom lokalen Speicher und setze aktuellen user auf null
   */
  logout() {

  }

  /**
   * Registriere User
   * @param user 
   * @returns 
   */
  register(user: User) {
    console.log("__debug:" +user.username)
      return this.http.post(`${environment.apiUrl}/register`, user);
  }

  /**
   * 
   * @returns Alle aktiven Nutzer (vom Server)
   */
  getAll() {
      //return this.http.get<User[]>(`${environment.apiUrl}/register`);
  }

  /**
   * Stellt Anfrage auf Server. Übermittlung der User-ID, Rückgabe ist der User
   * @param id des Users (s. Model)
   * @returns gib User mit spezifischer ID zurück
   */
  getById(id: string) {
      //return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  }



  /**
   * automatische Abmeldung, wenn der angemeldete Benutzer seinen eigenen Datensatz gelöscht hat
   * @param id User-ID
   * @returns 
   */
  delete(id: string) {
      return this.http.delete(`${environment.apiUrl}/users/${id}`)
          .pipe(map(x => {
              if (id == this.userValue.id) {
                  this.logout();
              }
              return x;
          }));
  }
}