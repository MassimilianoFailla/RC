import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthappService {

  constructor() { }

  autentica2

  autentica = (Username: string, Password: string): boolean => {

    if (Username === 'Massimiliano' && Password === 'cioo92') {
      sessionStorage.setItem("Utente", Username);
      return true;
    }
    else {
      return false;
    }
  }

  loggedUser = () => {
    let utente = sessionStorage.getItem("Utente");
    return (sessionStorage.getItem("Utente") != null) ? utente : "";
  }
  isLogged = () => (sessionStorage.getItem("Utente") != null) ? true : false;

  clearAll = () => sessionStorage.removeItem("Utente");



}
