import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {first, map} from 'rxjs/operators';

import {environment} from 'src/environments/environment';
import {User, UserAuth} from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    private userSubject: BehaviorSubject<UserAuth>;
    public userObservable: Observable<UserAuth>;

    public userInformation!: UserAuth;
    loggedIn = false;



    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<UserAuth>(JSON.parse(localStorage.getItem("user") || '{}'));
        this.userObservable = this.userSubject.asObservable();
        this.userObservable.subscribe({next: (event: UserAuth) => this.userInformation = event});
    }

    public get userValue(): UserAuth {
        return this.userSubject.value;
    }

    /**
     * Speichere Userdaten und jwt token in lokalem Speicher, User eingeloggt zu lassen
     * @param username
     * @param password
     * @returns Observable<User>
     */
    login(username: string, password: string): Observable<UserAuth> {
        return this.http
            .post<UserAuth>(`${environment.apiUrl}/auth/login`,
                {"username": username, "password": password})
            .pipe(map((result: UserAuth) => {
                //Registration was successful
                this.userInformation = result;
                this.loggedIn = true;
                return result
            }));
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
    register(user: User): Observable<User> {
        console.log("__debug:" + user.username)
        return this.http.post<User>(`${environment.apiUrl}/user/register`, user);
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
                if (id == this.userValue.user.id.toString()) {
                    this.logout();
                }
                return x;
            }));
    }
}
