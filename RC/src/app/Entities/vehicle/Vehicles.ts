export class Vehicles{

    id: number;
    casaCostruttrice: string;
    annoImmatricolazione: string;
    modello: string;
    targa: string;

   constructor(id: number, casaCostruttrice: string, annoImmatricolazione: string, modello: string,
    targa: string){
        this.id = id;
        this.casaCostruttrice = casaCostruttrice; 
        this.annoImmatricolazione = annoImmatricolazione;
        this.modello = modello;
        this.targa = targa;
    }

}
