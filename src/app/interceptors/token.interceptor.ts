import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';
import {  API } from 'src/environments/environment';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const reqURl: Array<any> = req.url.split('/')
    // const apiUrl: Array<any> = API.split('/')
    // && (reqURl[2] === apiUrl[2])
    let token = localStorage.getItem('token')

    if(token ) {
      const newReq = req.clone({setHeaders: {'Authorization': `bearer ${token}`} })
      return next.handle(newReq)
    } else {
      return next.handle(req);
    }

  }
}
