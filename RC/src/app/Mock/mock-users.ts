import { Users } from "../Entities/user/Users";

export const listaUtenti: Users[] = [
    {
        id: 1, nome: 'Massimiliano', cognome: 'Failla', dataNascita: '06/09/1992', codiceFiscale: 'FLLMLNP06ZQ192P',
        email: 'madalinvalentin.failla@gmail.com', username: 'max', password: 'ciao', role: 'Super'
    },
    {
        id: 2, nome: 'Eren', cognome: 'Yager', dataNascita: '04/12/2006', codiceFiscale: 'RNYGH897UJKI0',
        email: 'ttnttck@gmail.com', username: 'titan', password: 'attack', role: 'User'
    },
    {
        id: 3, nome: 'Francesca', cognome: 'Rumore', dataNascita: '04/01/1994', codiceFiscale: 'FRNRMR077Y551T',
        email: 'fra@gmail.com', username: 'fra', password: 'fra94', role: 'Super'
    },
    {
        id: 4, nome: 'Ina', cognome: 'Gisiano', dataNascita: '13/05/1957', codiceFiscale: 'GNMMRFLLP77661K',
        email: 'ina@gmail.com', username: 'ina', password: 'ina', role: 'Super'
    },
    {
        id: 5, nome: 'Giuseppe', cognome: 'Failla', dataNascita: '06/10/1952', codiceFiscale: 'FLLMLNP08IIUJJL',
        email: 'beppe@gmail.com', username: 'beppe', password: 'beppe', role: 'User'
    },
    {
        id: 6, nome: 'Francesco', cognome: 'Baldini', dataNascita: '30/11/2007', codiceFiscale: 'FRNCLLQK77187J',
        email: 'francesco@gmail.com', username: 'bex', password: 'bex', role: 'User'
    },

];

export function add(listaUtenti, Users): Users[] {
    let id = Users.id;
    let nome = Users.nome;
    let cognome = Users.cognome;
    let dataNascita = Users.dataNascita;
    let codiceFiscale = Users.codiceFiscale;
    let email = Users.email;
    let username = Users.username;
    let password = Users.password;
    let role = Users.role;

    let v = {
        id: id,
        nome: nome,
        cognome: cognome,
        dataNascita: dataNascita,
        codiceFiscale: codiceFiscale,
        email: email,
        username: username,
        password: password,
        role: role,
      };
      listaUtenti.push(v);

      console.log(listaUtenti);
      return listaUtenti;
    }

    export function onUpdate(v): Users[] {
      console.log('aggiornato', v);
      return listaUtenti;
    }

    export function deleteUser(v): Users[] {
      console.log('eliminato', v);
      return listaUtenti;
    }
