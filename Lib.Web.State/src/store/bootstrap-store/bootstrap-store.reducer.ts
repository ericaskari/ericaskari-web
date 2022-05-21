import { createReducer, on } from '@ngrx/store';
import { BootstrapStoreActions } from './bootstrap-store.actions';
import { GetVersionResponse } from '@ericaskari/model';

export interface BootstrapStoreState {
    finished: boolean;
    appVersion: GetVersionResponse;
    apiVersion: GetVersionResponse;
}

export const BootstrapStoreReducer = createReducer<BootstrapStoreState>(
    {
        finished: false,
        appVersion: new GetVersionResponse(),
        apiVersion: new GetVersionResponse(),
    },
    on(
        BootstrapStoreActions.BootstrapSucceededAndFinished,
        (state, { appVersion, apiVersion }): BootstrapStoreState => {
            return {
                finished: true,
                appVersion,
                apiVersion,
            };
        }
    )
);
