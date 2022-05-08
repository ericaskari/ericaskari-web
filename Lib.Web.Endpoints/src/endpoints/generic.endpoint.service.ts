import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BootstrapResponseModel } from "@ericaskari/model";
import { Observable } from "rxjs";
import { environmentInjectionToken } from "../../../App.Web/src/environments/environment.prod";

@Injectable({
    providedIn: 'root'
})
export class GenericEndpointService {
    constructor(
        private httpClient: HttpClient,
        @Inject(environmentInjectionToken) private environment: any
    ) {
        console.log(environment)
    }

    AppVersion(): Observable<{ version: string }> {
        return this.httpClient
            .get<{ version: string }>('/assets/app-version.json')
    }

    ApiVersion(): Observable<{ version: string }> {
        if (this.environment.production) {
            return this.httpClient
                .get<{ version: string }>('/api/version');
        } else {
            return this.httpClient
                .get<{ version: string }>('http://localhost:8000/api/version');
        }
    }
}
