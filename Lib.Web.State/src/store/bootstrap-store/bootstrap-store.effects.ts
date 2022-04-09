import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { BootstrapStoreActions } from "./bootstrap-store.actions";
import { GenericEndpointService } from "@ericaskari/endpoints";

@Injectable()
export class BootstrapStoreEffects {

    CheckServerHealthActions = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(BootstrapStoreActions.AppStarted),
                concatMap(() => this.genericEndpointService.AppVersion()),
                map((bootstrapData) =>
                    BootstrapStoreActions
                        .BootstrapSucceededAndFinished({ bootstrapData })
                ));
    });

    constructor(
        private actions$: Actions,
        private httpClient: HttpClient,
        private genericEndpointService: GenericEndpointService
    ) {
    }
}

