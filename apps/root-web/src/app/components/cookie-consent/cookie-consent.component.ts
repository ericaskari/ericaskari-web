import { Component, OnInit } from '@angular/core';
import { CookieService } from '../../services/cookie.service';

@Component({
    selector: 'app-cookie-consent',
    templateUrl: './cookie-consent.component.html',
    styleUrls: ['./cookie-consent.component.scss']
})
export class CookieConsentComponent implements OnInit {
    constructor(public cookieService: CookieService) {}

    ngOnInit(): void {}
}
