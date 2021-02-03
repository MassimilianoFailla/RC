import { Observable } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()

export class BasicAuthHttpInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (sessionStorage.getItem('username') && sessionStorage.getItem('token')) {

      console.log(req);
      req = req.clone({
        setHeaders: {
            Authorization: sessionStorage.getItem('token'),
          }
      });
    }
    return next.handle(req);
  }

  
  constructor() { }
}