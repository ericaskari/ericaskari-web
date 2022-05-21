import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ContactRequest, ContactResponse, GetVersionRequest, GetVersionResponse } from '@ericaskari/model';
import { FrontendEnvironment, frontendEnvironmentInterfaceInjectionToken } from '@ericaskari/web-common';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

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

    AppVersion(request: GetVersionRequest = new GetVersionRequest()): Observable<GetVersionResponse> {
        return this.httpClient.get<GetVersionResponse>('/assets/app-version.json').pipe(
            map((x) => GetVersionResponse.fromJson(x)),
            catchError(() => of(new GetVersionResponse()))
        );
    }

    ApiVersion(request: GetVersionRequest = new GetVersionRequest()): Observable<GetVersionResponse> {
        const source: Observable<GetVersionResponse> = this.environment.production
            ? this.httpClient.get<GetVersionResponse>('/api/version')
            : this.httpClient.get<GetVersionResponse>('http://localhost:8000/api/version');

        return source.pipe(
            map((x) => GetVersionResponse.fromJson(x)),
            catchError(() => of(new GetVersionResponse()))
        );
    }
}
