import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { SvgFirmwareComponent } from "./svgs/svg-firmware.component";
import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app.routing-module";
import { EffectsModule } from "@ngrx/effects";
import { appModuleEffects } from "../store/app.module.effect";
import { StoreModule } from "@ngrx/store";
import { rootActionReducerMap, rootMetaReducers } from "../store/app.module.reducer";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { CustomRouterStateSerializer } from "../store/router.serializer";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { BootstrapStoreModule } from "@ericaskari/state";
import { BootstrapService } from "./services/bootstrap.service";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { AboutPageComponent } from "./pages/about-page/about-page.component";
import { ScrollIndicatorComponent } from './scroll-indicator/scroll-indicator.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { LoadingComponent } from "./components/loading/loading.component";

@NgModule({
    declarations: [ AppComponent, SvgFirmwareComponent, HomePageComponent, AboutPageComponent, LoadingComponent, ScrollIndicatorComponent, FooterComponent, HeaderComponent ],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        EffectsModule.forRoot(appModuleEffects),
        StoreModule.forRoot(rootActionReducerMap, {
            metaReducers: rootMetaReducers,
            runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true
            }
        }),
        StoreRouterConnectingModule.forRoot({ serializer: CustomRouterStateSerializer }),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production, serialize: false }),
        BootstrapStoreModule.forRoot()
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: (appService: BootstrapService) => {
                return () => appService.initializeApp();
            },
            deps: [ BootstrapService ],
            multi: true
        }
    ],
    bootstrap: [ AppComponent ],
})
export class AppModule {
}
