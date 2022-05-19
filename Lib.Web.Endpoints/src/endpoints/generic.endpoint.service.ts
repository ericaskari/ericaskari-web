import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ContactRequest, ContactResponse } from '@ericaskari/model';
import { FrontendEnvironment, frontendEnvironmentInterfaceInjectionToken } from '@ericaskari/web-common';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class GenericEndpointService {
    constructor(
        private httpClient: HttpClient,
        @Inject(frontendEnvironmentInterfaceInjectionToken) private environment: FrontendEnvironment
    ) {
        console.log(environment);
    }

    contact(request: ContactRequest): Observable<ContactResponse> {
        return this.httpClient.post<ContactResponse>('/api/contact', request);
    }

    AppVersion(): Observable<string> {
        return this.httpClient.get<{ version: string }>('/assets/app-version.json').pipe(
            map((x) => x.version),
            catchError((err) => of(''))
        );
    }

    ApiVersion(): Observable<string> {
        const source: Observable<{ runtimeVersion: string; buildVersion: string }> = this.environment.production
            ? this.httpClient.get<{ runtimeVersion: string; buildVersion: string }>('/api/version')
            : this.httpClient.get<{ runtimeVersion: string; buildVersion: string }>(
                  'http://localhost:8000/api/version'
              );

        return source.pipe(
            map((x) => x.runtimeVersion),
            catchError((err) => of(''))
        );
    }
}
