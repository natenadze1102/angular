import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const spinnerAnimation = trigger('triggerLoader', [
  transition(':enter', [
    style({ opacity: '1' }),
    animate(
      '3s',
      keyframes([
        style({ backgroundColor: 'silver', offset: 0 }),
        style({ backgroundColor: 'lightGreen', offset: 0.5 }),
        style({ backgroundColor: 'red', offset: 0.75 }),
        style({ offset: 1 }),
      ])
    ),
  ]),
  transition(':leave', [
    animate(
      '100ms',
      keyframes([
        style({
          backgroundColor: 'lightGreen',
          offset: 1,
        }),
      ])
    ),
  ]),
]);

export const questioningUserAnimation = trigger('questionToDeleteUser', [
  transition(':enter', [
    style({ transform: 'translateY(-30%)', opacity: '0' }),
    animate('500ms', style({ transform: 'translateY(0)', opacity: 1 })),
  ]),
  transition(':leave', [
    animate('500ms', style({ transform: 'translateX(100%)', opacity: 0 })),
  ]),
]);

export const onCreateEditDelUserAnimation = trigger('userRegDelEdit', [
  transition(':enter', [
    style({ opacity: '0' }),
    animate('500ms', style({ opacity: 1 })),
  ]),
  transition(':leave', [animate('1000ms', style({ opacity: 0 }))]),
]);
