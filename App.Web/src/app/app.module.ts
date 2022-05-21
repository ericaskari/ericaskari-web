import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { frontendEnvironmentInterfaceInjectionToken } from '@ericaskari/web-common';
import { BootstrapStoreModule } from '@ericaskari/web-state';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { frontendEnvironment } from '../environments/frontend-environment';
import { rootActionReducerMap, rootMetaReducers } from '../store/app.module.reducer';
import { CustomRouterStateSerializer } from '../store/router.serializer';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing-module';
import { ButtonDirective } from './components/button/button.directive';
import { NotificationComponent } from './notification/notification.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { BootstrapService } from './services/bootstrap.service';
import { appModuleEffects } from '../store/app.module.effect';
import { CommonModule } from '@angular/common';
import { InputDirective } from './components/button/input.directive';
import { FormDirective } from './components/button/form.directive';
import { FormHeaderDirective } from './components/button/form-header.directive';
import { FormActionDirective } from './components/button/form-action.directive';
import { FormRowDirective } from './components/button/form-row.directive';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        ContactPageComponent,
        NotificationComponent,
        ButtonDirective,
        InputDirective,
        FormDirective,
        FormHeaderDirective,
        FormRowDirective,
        FormActionDirective,
        NavbarComponent,
    ],
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
            logOnly: frontendEnvironment.production,
            serialize: false,
        }),
        BootstrapStoreModule.forRoot(),
        FontAwesomeModule,
        LayoutModule,
        CommonModule,
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: BootstrapService.useFactory,
            deps: [BootstrapService],
            multi: true,
        },
        {
            provide: frontendEnvironmentInterfaceInjectionToken,
            useValue: frontendEnvironment,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
