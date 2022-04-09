import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Subject } from "rxjs";
import { map, startWith } from "rxjs/operators";

@Component({
    selector: 'app-scroll-indicator',
    templateUrl: './scroll-indicator.component.html',
    styleUrls: [ './scroll-indicator.component.scss' ]
})
export class ScrollIndicatorComponent implements OnInit {
    @Input() pages: number = 0;
    $scrollPosition: Subject<number> = new Subject();
    data$ = this.$scrollPosition
        .pipe(
            startWith(window.pageYOffset),
            map(pageYOffset => {
                return {
                    pageYOffset,
                    pages: this.pages,
                    innerHeight: window.innerHeight
                }
            }),
            map(({ pageYOffset, innerHeight, pages }) => {
                const start: boolean[] = new Array(pages)
                    .fill(false);

                const pagesOver = Math.trunc(window.pageYOffset / window.innerHeight);

                for (let i = 0; i <= pagesOver; i++) {
                    start[i] = true;
                }

                return start;
            }));

    constructor() {
    }

    @HostListener('window:scroll', [ '$event' ])
    doSomething() {
        this.$scrollPosition.next(window.pageYOffset)
    }

    ngOnInit(): void {
    }

}
