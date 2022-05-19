import { createReducer, on } from '@ngrx/store';
import { BootstrapStoreActions } from './bootstrap-store.actions';

export interface BootstrapStoreState {
    finished: boolean;
    appVersion: string;
    apiVersion: string;
}

export const BootstrapStoreReducer = createReducer<BootstrapStoreState>(
    {
        finished: false,
        appVersion: '',
        apiVersion: '',
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
