import { Observable } from 'rxjs';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()

export class BasicAuthHttpInterceptorService implements HttpInterceptor {


  private defaultApplicationHeaders = {
    'Content-Type': 'application/json'
  }

  buildRequestHeaders(): HttpHeaders {

    let headers = this.defaultApplicationHeaders;
    const token = sessionStorage.getItem('token');
    // set API-Token if available
    headers['Authorization'] = token;
    
    return new HttpHeaders(headers);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // debugger;
    console.log("sono dentro l'interceptor");
    if (sessionStorage.getItem('username') && sessionStorage.getItem('token')) {

      // console.log("Sono dentro l'if sessionStorage e questo il mio token: " + sessionStorage.getItem('token'));
      // const token = sessionStorage.getItem('token');

      let headers = this.buildRequestHeaders();

      console.log(req);
      req = req.clone({
        headers: req.headers.set('Authorization', sessionStorage.getItem('token'))
      });
    }
    console.log(req);
    // console.log(req.headers);
    return next.handle(req);
  }
  constructor() { }
}


 // setHeaders: {
        //   'Authorization': sessionStorage.getItem('token'),
        //   'Access-Control-Allow-Origin': 'http://localhost:4200'
        // }