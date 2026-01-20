import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateDescription',
  standalone: false
})
export class DateDescriptionPipe implements PipeTransform {

  transform(value: Date | string | number): string {
    const past = new Date(value).getTime()
    const diff = Date.now() - past
    if (diff < 1000 * 60 * 60) return 'Just now'
    if (diff < 1000 * 60 * 60 * 24 + 1000) return 'Today'
    if (diff < 1000 * 60 * 60 * 24 * 7) return 'This week'
    return 'At : ' + value
  }

}
