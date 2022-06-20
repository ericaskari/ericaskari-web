import { animate, animateChild, query, stagger, state, style, transition, trigger } from '@angular/animations';

export const dropDownAnimation = trigger('dropDownAnimation', [
    state(
        'open',
        style({
            opacity: 1,
            transform: `scale(1)`
        })
    ),
    state(
        'closed',
        style({
            opacity: 0,
            transform: `scale(0)`
        })
    ),
    transition('open => closed', [
        query(':self', [
            stagger(100, [animate('0.06s', style({ opacity: 0 }))]),
            stagger(50, [animate('0.06s', style({ transform: `scale(0)` }))])
        ])
    ]),
    transition('closed => open', [
        query(':self', [
            stagger(50, [animate('0.06s', style({ transform: `scale(1)` }))]),
            stagger(100, [animate('0.06s', style({ opacity: 1 }))])
        ])
    ])
]);
