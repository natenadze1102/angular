import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const spinnerAnimation = trigger('triggerLoader', [
  state(
    'disable',
    style({
      transform: 'rotate(0)',
    })
  ),
  state(
    'enable',
    style({
      transform: 'rotate(360deg)',
    })
  ),
  transition('enable <=> disable', [animate('1s')]),
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
