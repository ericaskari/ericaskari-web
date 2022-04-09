import { createReducer, on } from "@ngrx/store";
import { BootstrapStoreActions } from "./bootstrap-store.actions";
import { BootstrapResponseModel } from "@ericaskari/model";

export interface BootstrapStoreState {
    finished: boolean;
    bootstrapData: BootstrapResponseModel | null
}

export const BootstrapStoreReducer = createReducer<BootstrapStoreState>(
    {
        finished: false,
        bootstrapData: null
    },
    on(BootstrapStoreActions.BootstrapSucceededAndFinished, (state, { bootstrapData }): BootstrapStoreState => {
        return {
            finished: true,
            bootstrapData
        };
    })
);
