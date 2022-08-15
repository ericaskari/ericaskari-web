import { Injectable } from '@angular/core';
import { NavigationEnd, QueryParamsHandling, Router } from '@angular/router';
import { filter, from, Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RouterService {
    currentRoute$ = this.router.events.pipe(filter((event) => event instanceof NavigationEnd));
    constructor(private router: Router) {}

    loginRedirect(): Observable<boolean> {
        return this.navigate(['/home'], { replaceUrl: true });
    }
    logoutRedirect(): Observable<boolean> {
        return this.navigate(['/login'], { replaceUrl: true });
    }

    get navigateHome$(): Observable<boolean> {
        return this.navigate(['/home']);
    }
    get redirectAfterSuccessfulUserRegister(): Observable<boolean> {
        return this.navigate(['/register-success']);
    }

    get navigateToLoginPage$(): Observable<boolean> {
        return this.navigate(['/login']);
    }

    get redirectBeforeLoggedOutBootstrap(): Observable<boolean> {
        if (window.location.pathname === '/bootstrap-error') {
            return this.navigate(['/login']);
        }
        if (window.location.pathname === '/login') {
            return of(true);
        }
        if (window.location.pathname === '/register') {
            return of(true);
        }
        if (window.location.pathname === '/reset-password') {
            return of(true);
        }

        return of(true);
    }

    get redirectBeforeLoggedInBootstrap(): Observable<boolean> {
        if (window.location.pathname === '/login') {
            return this.navigate(['/home']);
        }
        if (window.location.pathname === '/bootstrap-error') {
            return this.navigate(['/home']);
        }
        return of(true);
    }

    navigate(
        path: string[],
        options?: any,
        queryParams?: { [key: string]: string },
        queryParamHandling?: QueryParamsHandling
    ): Observable<boolean> {
        return from(
            this.router.navigate(path, {
                queryParams: queryParams,
                queryParamsHandling: queryParamHandling,
                relativeTo: options ? options.relativeTo : ''
            })
        );
    }
}
