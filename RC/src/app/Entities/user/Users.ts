export class Users {

    id: number;
    nome: string;
    cognome: string;
    dataNascita: string;
    codiceFiscale: string;
    email: string;
    username: string;
    password: string;
    role: string;

   constructor(id: number, nome: string, cognome: string, dataNascita: string,
    codiceFiscale: string, email: string, username: string, password: string, role: string){
        this.id = id;
        this.nome = nome; 
        this.cognome = cognome;
        this.dataNascita = dataNascita;
        this.codiceFiscale = codiceFiscale;
        this.email = email;
        this.username = username; 
        this.password = password;
        this.role = role;
    }
}