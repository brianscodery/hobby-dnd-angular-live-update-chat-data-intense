import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'die'
})
export class DiePipe implements PipeTransform {

  transform(die: number): string {
    return `d${die}`;
  }

}
