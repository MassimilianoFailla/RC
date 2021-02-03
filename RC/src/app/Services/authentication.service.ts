import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  authenticate(username: string, password: string) {
    return this.httpClient.post<any>('http://localhost:4000/authenticate', { username, password }).pipe(
      map(data => {
        sessionStorage.setItem('username', username);
        let tokenStr = "Bearer " + data.token;
        sessionStorage.setItem('token', tokenStr);
        return data;
      }
      )

    )
  }

  clearAll() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    console.log(!(user === null));
    return !(user === null);
  }

  getAuthToken() {
    if (this.isUserLoggedIn())
      return sessionStorage.getItem('token');
    else
      return "";
  }

  isLogged() {
    return (sessionStorage.getItem('username') != null) ? true : false;
  }


}

export class JwtResponse {
  constructor(public jwttoken: string) { }
}
