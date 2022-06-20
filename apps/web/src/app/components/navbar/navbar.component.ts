import { Component, ElementRef, HostBinding, ViewChild } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { BreakpointService } from '../../services/breakpoint.service';
import { dropDownAnimation } from './dropdown.animation';
import { tap } from 'rxjs/operators';
import { ClickService } from '../../services/click.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    animations: [dropDownAnimation]
})
export class NavbarComponent {
    @ViewChild('dropdown', { read: ElementRef, static: false }) dropdown: ElementRef | undefined = undefined;

    @HostBinding('class.left-0') leftZero = false;
    faBars = faBars;
    expanded = false;
    hideProfilePopupOnCLickOutside$ = this.clickService.documentClickedTarget.pipe(
        tap((x) => {
            if (this.dropdown?.nativeElement.contains(x)) return;
            this.expanded = false;
        })
    );
    constructor(public breakpointService: BreakpointService, private clickService: ClickService) {}
}
