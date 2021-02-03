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
  ruoli: string[];

  constructor(private auth: AuthenticationService, private route: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    this.token = this.auth.getAuthToken();

    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(this.token);
    if(decodedToken === null){
      alert("Si prega di fare il login in quanto non si hanno i permessi necessari")
      this.route.navigate(['login']);
    }
    
    this.ruoli = decodedToken['authorities'];

    console.log("decoded token ", decodedToken);
    console.log("Ruoli token decoded", this.ruoli);

    if (!this.auth.isLogged()) {
      this.route.navigate(['login']);
      return false;
    }
    else {
      if (route.data.roles == null || route.data.roles.length === 0){
      
        return true;
    }
      else if (this.ruoli.some(r => route.data.roles.includes(r)))
        return true;
      else {
        this.route.navigate(['forbidden']);
        // rimuovo token e username
        this.auth.clearAll();
        return false;
      }
    }
  }


}
