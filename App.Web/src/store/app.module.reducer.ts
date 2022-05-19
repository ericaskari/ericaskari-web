import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { frontendEnvironment } from '../environments/frontend-environment';

export interface AppModuleState {}

export const rootActionReducerMap: ActionReducerMap<AppModuleState> = {};

export const rootMetaReducers: MetaReducer<AppModuleState>[] = !frontendEnvironment.production ? [] : [];
