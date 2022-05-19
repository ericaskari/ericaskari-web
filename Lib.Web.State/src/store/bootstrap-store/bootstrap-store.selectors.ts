import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BootstrapStoreState } from './bootstrap-store.reducer';
import { BootstrapStoreConfig } from './bootstrap-store.config';

export abstract class BootstrapStoreSelectors {
    public static getState = createFeatureSelector<BootstrapStoreState>(BootstrapStoreConfig.name);

    public static appVersion = createSelector(BootstrapStoreSelectors.getState, (state) => state.appVersion);
    public static apiVersion = createSelector(BootstrapStoreSelectors.getState, (state) => state.apiVersion);

    public static finished = createSelector(BootstrapStoreSelectors.getState, (state) => state.finished);
}
