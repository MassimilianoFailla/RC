import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { exit } from 'process';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  // serve per l'autorizzazione
  token: string = '';
  role: string[];

  constructor(private auth: AuthenticationService, private route: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // debugger
    this.token = this.auth.getAuthToken();

    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(this.token);
    this.role = decodedToken['authorities'];

    if(this.role === null){
      console.log("Errore role null!");
    }
    else 
    if (!this.auth.isLogged()) {
      this.route.navigate(['login']);
      return false;
    }
    else {
      if (route.data.roles == null || route.data.roles.length === 0)
        return true;
      else if (this.role.some(r => route.data.roles.includes(r)))
        return true;
      else {
        this.route.navigate(['forbidden']);
        return false;
      }
    }
  }
}
