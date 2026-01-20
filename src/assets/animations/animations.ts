import { animate, group, query, style, transition, trigger } from "@angular/animations";

export const colorPikerAnimation = trigger('toggleColor' ,[
      transition(':enter', [
        style({ opacity: 0, transform: ' scaleY(0)' }),
        query('.colors', [style({ translate: '0 -19%' })]),
        group([
          animate('0.2s', style({ opacity: 1, transform: ' scaleY(1)' })),
          query('.colors', [animate('0.2s', style({ translate: '0 0%' }))])
        ])
      ]),
      transition(':leave', [
        group([
          animate('0.2s', style({ opacity: 0, transform: 'scaleY(0)' })),
          query('.colors', [animate('0.2s', style({ translate: '0 -10%' }))])

        ])
      ]),
])