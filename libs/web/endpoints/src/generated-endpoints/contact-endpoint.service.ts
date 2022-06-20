import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContactRequest, ContactResponse } from '@ericaskari/shared/model';

// Auto generated file with generate:api npm command

@Injectable({
    providedIn: 'root'
})
export class ContactEndpointService {

    constructor(private httpClient: HttpClient) {}

    public sendContactForm(bodyRequest: ContactRequest): Observable<ContactResponse> {
        return this.httpClient.post<ContactResponse>(`/api/contact`, bodyRequest, {  }).pipe(map((x) => ContactResponse.fromRequest(x)));
    }

}