import { Component } from '@angular/core';
import { GenericEndpointService } from "@ericaskari/endpoints";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.scss' ],
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
