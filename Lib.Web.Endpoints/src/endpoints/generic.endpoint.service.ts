import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BootstrapResponseModel } from "@ericaskari/model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class GenericEndpointService {
    constructor(
        private httpClient: HttpClient
    ) {
    }

    AppVersion(): Observable<BootstrapResponseModel> {
        return this.httpClient
            .get<BootstrapResponseModel>('/assets/app-version.json')
    }

    ApiVersion(): Observable<BootstrapResponseModel> {
        return this.httpClient
            .get<BootstrapResponseModel>('/api/version')
    }
}
