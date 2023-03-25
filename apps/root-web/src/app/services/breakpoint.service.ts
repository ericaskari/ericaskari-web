import { Injectable } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class BreakpointService {
    isMobile$ = this.breakpointObserver.observe(['(min-width: 600px)']).pipe(map((d) => !d.matches));
    isDesktop$ = this.isMobile$.pipe(map((x) => !x));

    constructor(public breakpointObserver: BreakpointObserver) {}
}
