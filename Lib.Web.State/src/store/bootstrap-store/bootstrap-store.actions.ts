import { createAction, props } from "@ngrx/store";
import { BootstrapResponseModel } from "@ericaskari/model";

export abstract class BootstrapStoreActions {
    public static AppStarted = /*                             */ createAction('[Bootstrap][AppService] AppStarted');
    public static BootstrapSucceededAndFinished = /*          */ createAction('[Bootstrap][BootstrapEffect] BootstrapSucceededAndFinished', props<{ bootstrapData: BootstrapResponseModel }>());
}
