import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Rx';
import {  API } from 'src/environments/environment';
import 'rxjs/add/operator/catch'
import { request } from 'http';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

  constructor( private injector: Injector ){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      return next.handle(req).catch((errorResponse: HttpErrorResponse) =>{
        const error = (typeof errorResponse.error !== 'object') ? JSON.parse(errorResponse.error) : errorResponse
        if(errorResponse.status === 401 ) {
          const http = this.injector.get(HttpClient)

          return http.post<any>(`${API}/auth/refresh`, {}).flatMap(data => {
            localStorage.setItem('token', data.token);
            const cloneRequest = req.clone({setHeaders: {'Authorization': `bearer ${data.token}`} })
            return next.handle(cloneRequest)
          })
        }
        return Observable.throw(errorResponse)
      });

  }
}
