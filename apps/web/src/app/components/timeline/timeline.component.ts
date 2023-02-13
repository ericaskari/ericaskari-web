import { Component, ElementRef, HostBinding, Input, ViewChild } from '@angular/core';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { BreakpointService } from '../../services/breakpoint.service';

export interface Timeline {
    startDate: Date;
    endDate: Date | null;
    endDateStr: string;
    rightHeader: string;
    leftHeader: string;
    leftSub: string;
    rightDescription: string[];
}
@Component({
    selector: 'app-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.scss'],
    animations: []
})
export class TimelineComponent {
    faCircle = faCircle;
    @Input() timelines: Timeline[] = [];

    constructor(public breakpointService: BreakpointService) {}
}
