import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { environmentInjectionToken } from "../../../App.Web/src/environments/environment.prod";
import { catchError, map } from "rxjs/operators";

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

    AppVersion(): Observable<string> {
        return this.httpClient
            .get<{ version: string }>('/assets/app-version.json').pipe(map(x => x.version), catchError(err => of('')))
    }

    ApiVersion(): Observable<string> {
        if (this.environment.production) {
            return this.httpClient
                .get<{ version: string }>('/api/version').pipe(map(x => x.version), catchError(err => of('')))
        } else {
            return this.httpClient
                .get<{ version: string }>('http://localhost:8000/api/version').pipe(map(x => x.version), catchError(err => of('')))
        }
    }
}
