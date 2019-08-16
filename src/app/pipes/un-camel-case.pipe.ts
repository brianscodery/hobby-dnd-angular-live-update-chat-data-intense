import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uncamelcase'
})
export class UnCamelCasePipe implements PipeTransform {

  transform(value: string): string {
    let tempString = value;
    var positions = [];
    for (var i = 0; i < value.length; i++)
    {
      if (tempString[ i ].match(/[A-Z]/) !== null)
      {
        positions.push(i);
      }
    }
    positions.reverse();
    positions.forEach((index: number) => {
      tempString = tempString.slice(0, index) + ' ' + tempString.slice(index);
    })
    
    return tempString.toLowerCase();
  }


}
