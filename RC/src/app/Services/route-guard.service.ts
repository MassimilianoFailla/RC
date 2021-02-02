import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  // serve per l'autorizzazione
  token: string = '';
  role: string[];

  constructor(private auth: AuthenticationService, private route: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    this.token = this.auth.getAuthToken();

    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(this.token);

    this.role = decodedToken['token'];  // << quale valore mettere?

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