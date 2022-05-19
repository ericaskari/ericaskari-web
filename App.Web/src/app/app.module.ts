import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routing-module';
import { EffectsModule } from '@ngrx/effects';
import { appModuleEffects } from '../store/app.module.effect';
import { StoreModule } from '@ngrx/store';
import { rootActionReducerMap, rootMetaReducers } from '../store/app.module.reducer';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomRouterStateSerializer } from '../store/router.serializer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { BootstrapStoreModule } from '@ericaskari/web-state';
import { BootstrapService } from './services/bootstrap.service';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environmentInjectionToken } from '../environments/environment.prod';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { NotificationComponent } from './notification/notification.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LayoutModule } from '@angular/cdk/layout';
import { ButtonDirective } from './components/button/button.directive';

@NgModule({
    declarations: [AppComponent, HomePageComponent, ContactPageComponent, NotificationComponent, ButtonDirective],
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
                strictActionImmutability: true,
            },
        }),
        StoreRouterConnectingModule.forRoot({
            serializer: CustomRouterStateSerializer,
        }),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production,
            serialize: false,
        }),
        BootstrapStoreModule.forRoot(),
        FontAwesomeModule,
        LayoutModule,
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: BootstrapService.useFactory,
            deps: [BootstrapService],
            multi: true,
        },
        {
            provide: environmentInjectionToken,
            useValue: environment,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
