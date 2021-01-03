import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'pagination'
})

export class PaginationPipe implements PipeTransform {

  transform(dati: any[], itemPerPage: number, itemPerPageOption: number): any {

    const data: any[] = [];
    let index = 0;
    // tslint:disable-next-line:variable-name
    const per_page = itemPerPage;
    console.log(dati);

    for (const elm of dati){
      console.log(index);
      if (index >= (itemPerPageOption * per_page) && index < (itemPerPageOption + 1) * per_page) {
       console.log(index);
       data.push(elm);
      }
      index++;
    }
    console.log(data);
    return data;
  }

}