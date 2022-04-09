import { ModuleWithProviders, NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { BootstrapStoreReducer } from "./bootstrap-store.reducer";
import { BootstrapStoreEffects } from "./bootstrap-store.effects";
import { BootstrapStoreConfig } from "./bootstrap-store.config";

@NgModule({
    providers: [],
    imports: [
        StoreModule.forFeature(BootstrapStoreConfig.name, BootstrapStoreReducer),
        EffectsModule.forFeature([ BootstrapStoreEffects ])
    ]
})
export class BootstrapStoreModule {
    static forRoot(): ModuleWithProviders<BootstrapStoreModule> {
        return {
            ngModule: BootstrapStoreModule,
            providers: []
        };
    }
}
