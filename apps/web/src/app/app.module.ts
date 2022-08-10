import { LayoutModule } from '@angular/cdk/layout';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { frontendEnvironmentInterfaceInjectionToken } from '@ericaskari/web/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { frontendEnvironment } from '../environments/frontend-environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing-module';
import { ButtonDirective } from './components/button/button.directive';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { BootstrapService } from './services/bootstrap.service';
import { CommonModule } from '@angular/common';
import { InputDirective } from './components/button/input.directive';
import { FormDirective } from './components/button/form.directive';
import { FormHeaderDirective } from './components/button/form-header.directive';
import { FormActionDirective } from './components/button/form-action.directive';
import { FormRowDirective } from './components/button/form-row.directive';
import { CvPageComponent } from './pages/cv-page/cv-page.component';
import { NotificationComponent } from './components/notification/notification.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { appModuleEffects, CustomRouterStateSerializer, rootActionReducerMap, rootMetaReducers } from '@ericaskari/web/state';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LangSelectorComponent } from './components/lang-selector/lang-selector.component';
import { LocalizedDatePipe } from './components/localized-date.pipe';
import { TextAnimationDirective } from './components/text-animation.directive';
import { GoogleTagManagerModule } from 'angular-google-tag-manager';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

const AnalyticsModules: any[] = [
    GoogleTagManagerModule.forRoot({
        id: frontendEnvironment.production ? 'GTM-MXC7C6F' : 'GTM-0000000'
    })
];

const store = [
    EffectsModule.forRoot(appModuleEffects),
    StoreModule.forRoot(rootActionReducerMap, {
        metaReducers: rootMetaReducers,
        runtimeChecks: {
            strictStateImmutability: true,
            strictActionImmutability: true
        }
    }),
    StoreRouterConnectingModule.forRoot({
        serializer: CustomRouterStateSerializer
    }),
    StoreDevtoolsModule.instrument({
        maxAge: 25,
        logOnly: frontendEnvironment.production,
        serialize: false
    })
];

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
        CvPageComponent,
        LangSelectorComponent,
        LocalizedDatePipe,
        TextAnimationDirective
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        LayoutModule,
        CommonModule,
        AnalyticsModules,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            },
            defaultLanguage: 'en'
        }),
        ...store
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: BootstrapService.useFactory,
            deps: [BootstrapService],
            multi: true
        },
        {
            provide: frontendEnvironmentInterfaceInjectionToken,
            useValue: frontendEnvironment
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
