import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BootstrapStoreState } from "./bootstrap-store.reducer";
import { BootstrapStoreConfig } from "./bootstrap-store.config";

export abstract class BootstrapStoreSelectors {
    public static getState = createFeatureSelector<BootstrapStoreState>(BootstrapStoreConfig.name);

    public static bootstrapData = createSelector(BootstrapStoreSelectors.getState, (state) => state.bootstrapData);

    public static finished = createSelector(BootstrapStoreSelectors.getState, (state) => state.finished);
}

