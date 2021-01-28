import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
export const CONST_AUTH_TOKEN = "AuthToken";
export const CONST_UTENTE = "Utente";

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  authenticate(username: string, password: string){
    return this.httpClient.post<any>('http://localhost:4000/authenticate', {username, password}).pipe(
      map(userData => {
        sessionStorage.setItem('username', username);
        let tokenStr = "Bearer " +userData.token;
        sessionStorage.setItem('token', tokenStr);
        return userData;
      }
        )
    )
  }

  isUserLoggedIn(){
    let user = sessionStorage.getItem('username')
    console.log(!(user === null));
    return !(user === null);
  }

  getAuthToken()
  {
    if (this.isUserLoggedIn())
      return sessionStorage.getItem(CONST_AUTH_TOKEN);
    else
      return "";
  }

  isLogged()
  {
    return (sessionStorage.getItem(CONST_UTENTE) != null) ? true : false;
  }

  logout(){
    sessionStorage.removeItem('username')
  }
}



export class JwtResponse{
  constructor(public jwttoken: string)
  {}
}
