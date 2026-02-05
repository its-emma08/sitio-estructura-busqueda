import { trigger, transition, style, query, animate } from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
    transition('* => *', [
        // Initial state of new route
        query(':enter', [
            style({ opacity: 0, transform: 'translateY(20px)' })
        ], { optional: true }),

        // Animate old route out (optional, can be skipped for snappiness)
        query(':leave', [
            animate('200ms ease-out', style({ opacity: 0 }))
        ], { optional: true }),

        // Animate new route in
        query(':enter', [
            animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
        ], { optional: true })
    ])
]);
