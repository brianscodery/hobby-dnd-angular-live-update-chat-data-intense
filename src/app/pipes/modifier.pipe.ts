import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'modifier'
})
export class ModifierPipe implements PipeTransform {

  transform(modifier: number): string {
    return modifier >= 0 ? `+${modifier}` : `${modifier}`;
  }

}
