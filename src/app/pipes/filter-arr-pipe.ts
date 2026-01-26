import { Pipe, PipeTransform } from '@angular/core';

type Indexable<T = any> = {
  [key: string]: T
}

@Pipe({
  name: 'filterArr',
  standalone: true
})

export class FilterArr implements PipeTransform {

  transform<T extends Indexable>(items: T[], itemProp: string, term: string): T[] {
    const termRegExp = new RegExp(term, 'i')
    return items.filter(item => termRegExp.test(item[itemProp]))
  }

}
