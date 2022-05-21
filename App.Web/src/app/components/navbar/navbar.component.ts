import { Component, HostBinding } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { BreakpointService } from '../../services/breakpoint.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
    @HostBinding('class.left-0') leftZero = false;
    faBars = faBars;
    expanded: boolean = false;

    constructor(public breakpointService: BreakpointService) {}
}
