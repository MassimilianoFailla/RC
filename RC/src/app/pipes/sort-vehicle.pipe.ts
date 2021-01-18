import { Pipe, PipeTransform } from '@angular/core';
import { Vehicles } from '../Entities/vehicle/Vehicles';

@Pipe({
  name: 'sortVehicle'
})

export class SortVehiclesPipe implements PipeTransform {

  transform(dati: Array<Vehicles>, colonna?: string, reverse?: boolean): Array<Vehicles> {

    if (colonna === undefined || colonna === 'id') {
       dati.sort((e1, e2) => e1.id - e2.id);
    }
    else if (colonna === 'casaCostruttrice') {
      dati.sort((e1, e2) => e1.casaCostruttrice.localeCompare(e2.casaCostruttrice));
    }
    else if (colonna === 'modello') {
      dati.sort((e1, e2) => e1.modello.localeCompare(e2.modello));
    }
    // else if (colonna === 'annoImmatricolazione') {
    //   dati.sort((e1, e2) => e1.annoImmatricolazione.localeCompare(e2.annoImmatricolazione));
    // }
    else if (colonna === 'targa') {
      dati.sort((e1, e2) => e1.targa.localeCompare(e2.targa));
    }
    if (reverse) {
      dati.reverse();
    }
    return dati;
  }
}
