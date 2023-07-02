import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_ENDPOINTS } from '../constants/api-endpoints';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private currentUserSubject: BehaviorSubject<Object>;
  public currentUser: Observable<Object>;

  constructor(private http: HttpClient) {
    var current = localStorage.getItem('currentUser') ?? "{}";
    this.currentUserSubject = new BehaviorSubject<Object>(JSON.parse(current));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Object {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return this.currentUserValue != null && Object.keys(this.currentUserValue).length > 0;
  }

  login(username: string, password: string) {
    return this.http.post<any>(API_ENDPOINTS.AUTHENTICATE, { username, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  register(username: string, password: string, firstName: string, lastName: string) {
    return this.http.post<any>(API_ENDPOINTS.REGISTER, {
        "Username": username,
        "Password": password,
        "FirstName": firstName,
        "LastName": lastName })
      .pipe(map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.setItem('currentUser', "{}");
    this.currentUserSubject.next({});
  }
}
