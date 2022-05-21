import { createAction, props } from '@ngrx/store';
import { GetVersionResponse } from '@ericaskari/model';

export abstract class BootstrapStoreActions {
    public static AppStarted = /*                             */ createAction('[Bootstrap][AppService] AppStarted');
    public static BootstrapSucceededAndFinished = /*          */ createAction(
        '[Bootstrap][BootstrapEffect] BootstrapSucceededAndFinished',
        props<{ appVersion: GetVersionResponse; apiVersion: GetVersionResponse }>()
    );
}
