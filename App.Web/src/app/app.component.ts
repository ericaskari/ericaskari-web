import { Component } from '@angular/core';
import { GenericEndpointService } from "@ericaskari/endpoints";
import { animate, state, style, transition, trigger } from "@angular/animations";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.scss' ],
    animations: [
    trigger('darkenBg', [
        transition('* => visible', [
            animate('4s')
        ]),
        state('visible', style({
            filter: 'brightness(50%)'
        }))
    ]),
]
})
export class AppComponent {
    appVersion$ = this.genericEndpointService.AppVersion();
    apiVersion$ = this.genericEndpointService.ApiVersion();
    constructor(private genericEndpointService: GenericEndpointService) {
        this.genericEndpointService.AppVersion().subscribe((data) => {
            console.log(`Web version: ${ data.version }`);
        });
        this.genericEndpointService.ApiVersion().subscribe((data) => {
            console.log(`Api version: ${ data.version }`);
        });
    }
}
