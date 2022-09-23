import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [AppComponent, NxWelcomeComponent],
    imports: [BrowserModule, HttpClientModule, RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }), ReactiveFormsModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
