import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, UrlTree} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {first, map} from 'rxjs/operators';

import {environment} from 'src/environments/environment';
import {User, UserAuth, UserRegister} from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    private blnLoggedIn = new BehaviorSubject<boolean>(false);
    currentLoggedIn = this.blnLoggedIn.asObservable();

    private userSubject: BehaviorSubject<UserAuth>;
    loggedIn = false;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<UserAuth>(JSON.parse(localStorage.getItem("user") || '{}'));
        this.userSubject.subscribe({next: (v) => console.log(v ?? '')});
        this.userSubject.subscribe({
            next: (user) => localStorage.setItem("user", JSON.stringify(user))
        })
    }

    public get userValue(): UserAuth {
        return this.userSubject.value as UserAuth;
    }

    public currentUser(): UserAuth{
        return this.userSubject.value;
    }

    canActivate(route: ActivatedRouteSnapshot): boolean|UrlTree {
        if(this.userSubject.value.access_token != null){
            return true;
        }
        return this.router.parseUrl('/login');
    }

    /**
     * Speichere Userdaten und jwt token in lokalem Speicher, User eingeloggt zu lassen
     * @param user the user object with username and password set
     * @returns Observable<UserAuth> includes the token and user without password
     */
    login(user: User): Observable<UserAuth> {
        return this.http
            .post<UserAuth>(`${environment.apiUrl}/auth/login`,
                {"username": user.username, "password": user.password})
            .pipe(map((result: UserAuth) => {
                // Registration was successful
                // Save the users id and token
                this.userSubject.next(result);
                this.blnLoggedIn.next(true);
                this.changeLoginState(true);
                return result
            }));
    }

    /**
     * Entferne Nutzer vom lokalen Speicher und setze aktuellen user auf null
     */
    logout() {
        this.userSubject.next({} as UserAuth);
        this.changeLoginState(false);
        this.loggedIn = false;
    }

    /**
     * Registriere User
     * @param user the user object with username and password set
     * @returns Observable<User> the user object with also the id set
     */
    register(user: UserRegister): Observable<User> {
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

    changeLoginState(status: boolean){
        this.blnLoggedIn.next(status);
    }

}
