import { animate, animateChild, group, query, sequence, stagger, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { ClickService } from './services/click.service';

export const fadeAnimation = trigger('fadeAnimation', [
    transition('* => *', [
        query(':enter', [style({ opacity: 0 })], { optional: true }),

        query(':leave', [style({ opacity: 1 }), animate('0.2s', style({ opacity: 0 }))], { optional: true }),

        query(':enter', [style({ opacity: 0 }), animate('0.2s', style({ opacity: 1 }))], { optional: true })
    ])
]);

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [fadeAnimation]
})
export class AppComponent {
    constructor(private contexts: ChildrenOutletContexts, private clickService: ClickService) {}

    public getRouterOutletState(outlet: any) {
        return outlet.isActivated ? outlet.activatedRoute : '';
    }

    @HostListener('document:click', ['$event'])
    documentClick(event: any): void {
        this.clickService.documentClickedTarget.next(event.target);
    }
}
