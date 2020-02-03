import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import {HttpClient, HttpHeaders} from "@angular/common/http"

import { API } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { tap, map, } from 'rxjs/operators';
import { Wallet } from '../models/wallet';

@Injectable({
  providedIn: 'root'
})
export class ExtratoService {


  constructor(private http:HttpClient) { }


  getExtratoById(id: any): Observable<Wallet[]> {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', }), responseType: 'text' as 'json' };
    return this.http.get<Wallet[]>(`${API}/investors/wallet?usuarios_id=${id}`, httpOptions)
  }

  // getUser(): Observable<User[]> {
  //   return this.http.get<User[]>(this.serviceUrl);
  // }



}
