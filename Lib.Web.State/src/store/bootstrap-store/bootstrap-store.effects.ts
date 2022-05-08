import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { BootstrapStoreActions } from "./bootstrap-store.actions";
import { GenericEndpointService } from "@ericaskari/endpoints";
import { combineLatest, zip } from "rxjs";

@Injectable()
export class BootstrapStoreEffects {

    CheckServerHealthActions = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(BootstrapStoreActions.AppStarted),
                concatMap(() => {
                    return combineLatest([this.genericEndpointService.AppVersion(), this.genericEndpointService.ApiVersion()])
                }),
                map(([appVersion, apiVersion]) =>
                    BootstrapStoreActions
                        .BootstrapSucceededAndFinished({ appVersion, apiVersion })
                ));
    });

    constructor(
        private actions$: Actions,
        private httpClient: HttpClient,
        private genericEndpointService: GenericEndpointService
    ) {
    }
}

