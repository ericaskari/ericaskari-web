import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';
import { Params } from '@angular/router';

//  Things we need to export from router.snapshot
export interface RouterStateUrl {
    url: string;
    queryParams: Params;
    params: Params;
}
export type RouterStoreState = RouterReducerState<RouterStateUrl>;

const getState = createFeatureSelector<RouterStoreState>('router');

export const RouterStoreSelector = (() => {
    const navigationId = createSelector(getState, (state) => state.navigationId);
    const url = createSelector(getState, (state) => state.state.url);
    const queryParams = createSelector(getState, (state) => state.state.queryParams);
    const params = createSelector(getState, (state) => state.state.params);

    const referer = createSelector(queryParams, (state: Record<string, string>) => state['referer'] ?? null);

    return {
        navigationId,
        url,
        queryParams,
        params,
        referer
    };
})();
