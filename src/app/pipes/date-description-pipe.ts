import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateDescription',
  standalone: false
})
export class DateDescriptionPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
