import { createAction, props } from '@ngrx/store';

export abstract class BootstrapStoreActions {
    public static AppStarted = /*                             */ createAction('[Bootstrap][AppService] AppStarted');
    public static BootstrapSucceededAndFinished = /*          */ createAction(
        '[Bootstrap][BootstrapEffect] BootstrapSucceededAndFinished',
        props<{ appVersion: string; apiVersion: string }>()
    );
}
