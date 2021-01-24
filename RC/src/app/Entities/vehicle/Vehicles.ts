export class Vehicles {

    id: number;
    casaCostruttrice: string;
    annoImmatricolazione: Date;
    modello: string;
    targa: string;
    tipologia: string;

   constructor(id: number, casaCostruttrice: string, annoImmatricolazione: Date, modello: string, targa: string, tipologia: string){
        this.id = id;
        this.casaCostruttrice = casaCostruttrice; 
        this.annoImmatricolazione = annoImmatricolazione;
        this.modello = modello;
        this.targa = targa;
        this.tipologia = tipologia;
    }

}
