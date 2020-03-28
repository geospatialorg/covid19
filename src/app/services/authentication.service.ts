import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';

import {User} from '../models';
import {environment} from 'src/environments/environment';

@Injectable({providedIn: 'root'})

export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;


  constructor(private http: HttpClient, public router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
    // return JSON.parse(localStorage.getItem('currentUser'));
  }

  login(userId: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/authentication/login`, {user_id: userId, password}).pipe(map(data => {
      if (data.user && data.user.token) {
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        this.currentUserSubject.next(data.user);
      }

      return data;
    }));
  }

  updateToken(token: string) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    currentUser.token = token;

    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    this.currentUserSubject.next(currentUser);
  }

  getToken() {
    return JSON.parse(localStorage.getItem('currentUser')).token;
  }

  setToken(user: any): Observable<any> {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);

    return this.currentUserSubject.asObservable();
  }

  get token() {
    return JSON.parse(localStorage.getItem('currentUser')).token;
  }

  logout() {
    return this.http.get<any>(`${environment.apiUrl}/administration/setLogout`, {});
  }

  clearSession() {


    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    // return this.router.navigateByUrl('/');
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    return this.router.navigate([this.router.url]);
  }

  checkSession(params: any) {
    return this.http.post<any>(`${environment.apiUrl}/authentication/checkSession`, params);
  }

  checkToken(params: any) {
    return this.http.post<any>(`${environment.apiUrl}/authentication/checkToken`, params);
  }

}
