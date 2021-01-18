import { Pipe, PipeTransform } from '@angular/core';
import { Users } from '../Entities/user/Users';

@Pipe({
  name: 'sortUser'
})

export class SortUsersPipe implements PipeTransform {

  transform(dati: Array<Users>, colonna?: string, reverse?: boolean): Array<Users> {

    if (colonna === undefined || colonna === 'id') {
      dati.sort((e1, e2) => e1.id - e2.id);
    }
    else if (colonna === 'nome') {
      dati.sort((e1, e2) => e1.nome.localeCompare(e2.nome));
    }
    else if (colonna === 'cognome') {
      dati.sort((e1, e2) => e1.cognome.localeCompare(e2.cognome));
    }
    // else if (colonna === 'dataNascita') {
    //   dati.sort((e1, e2) => e1.getTime() === (e2.getTime()));
    // }
    else if (colonna === 'codiceFiscale') {
      dati.sort((e1, e2) => e1.codiceFiscale.localeCompare(e2.codiceFiscale));
    }
    else if (colonna === 'email') {
      dati.sort((e1, e2) => e1.email.localeCompare(e2.email));
    }
    else if (colonna === 'username') {
      dati.sort((e1, e2) => e1.username.localeCompare(e2.username));
    }
    else if (colonna === 'password') {
      dati.sort((e1, e2) => e1.password.localeCompare(e2.password));
    }
    else if (colonna === 'role') {
      dati.sort((e1, e2) => e1.role.localeCompare(e2.role));
    }
    if (reverse) {
      dati.reverse();
    }
    return dati;
  }
}
