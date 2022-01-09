import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, UrlTree} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {first, map} from 'rxjs/operators';

import {environment} from 'src/environments/environment';
import {Card} from '../models/card';

@Injectable({
    providedIn: 'root'
})
export class GameService {

    private cardSubject: BehaviorSubject<Array<Card>>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.cardSubject = new BehaviorSubject<Array<Card>>(JSON.parse(localStorage.getItem("card") || '{}'));
        this.cardSubject.subscribe({next: (v) => console.log(v ?? '')});
        this.cardSubject.subscribe({
            next: (card) => localStorage.setItem("card", JSON.stringify(card))
        })
    }

    getAllCards(userId:number, accessToken:string): Observable<Array<Card>> {
        return this.http.get<Array<Card>>(`${environment.apiUrl}/cards/getAllCards/${userId}`,{headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            })}).pipe(
            map(result => {
                console.log(result)
                this.cardSubject.next(result);
                return result;
            }));

    }

    createCard(userId:number, accessToken:string, cardText: string): Observable<Card> {

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        };
        const body = {"text": cardText};

        const httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        });

        return this.http.post<Card>(
            `${environment.apiUrl}/cards/createCard`,
            body,
            {headers});
    }
}
