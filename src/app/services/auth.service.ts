import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import {HttpClient} from "@angular/common/http"

import { API } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { tap, map, } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User
  router: any;

  constructor(private http:HttpClient) { }


  isLoggeIn(): boolean {
    return localStorage.getItem('user') ? true : false

  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<any>(`${API}/auth/login`,
      {email: email, password: password})
      .pipe(tap(data => {
        localStorage.setItem('token', data.token)
      }))
  }

  logout(): void {
    this.http.get(`${API}/auth/logout`).subscribe(resp => {
      console.log(resp);
      localStorage.clear();
      this.router.navigate(['login']);
    });
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public decodePayloadJWT(): any {
    try {
      this.user =jwt_decode(this.getToken());
      localStorage.setItem('user',  JSON.stringify(this.user))
      return this.user
    } catch (Error) {
      return null;
    }
  }

}
