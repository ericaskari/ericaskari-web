import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { frontendEnvironment } from '../environments/frontend-environment';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { CustomRouterStateSerializer } from '@ericaskari/web/state';

@NgModule({
    declarations: [AppComponent],
    imports: [
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        LayoutModule,
        CommonModule,
        EffectsModule.forRoot([]),
        StoreModule.forRoot(
            {
                router: routerReducer
            },
            {
                metaReducers: [],
                runtimeChecks: {
                    strictStateImmutability: true,
                    strictActionImmutability: true
                }
            }
        ),

        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: frontendEnvironment.production,
            serialize: false
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
