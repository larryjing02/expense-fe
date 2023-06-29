import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../model/User';
import { UrlSerializer } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    var current = localStorage.getItem('currentUser') ?? "";
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(current));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  login(username: string, password: string) {
    return this.http.post<any>(`/api/authenticate`, { username, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        this.loggedIn.next(true);
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.setItem('currentUser', "");
    this.loggedIn.next(false);
  }
}
