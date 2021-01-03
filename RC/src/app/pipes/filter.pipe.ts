import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {

  transform(values: any[], selectedFilter: string, searched: string): any {
    let data: any[] = [];
    if (searched === '' || selectedFilter === ''){
      return  values;
    }else{
      data = values.filter((p: any) => p[selectedFilter].toString().includes(searched));
      return data;
    }

  }

}