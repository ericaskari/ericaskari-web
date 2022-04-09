import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { AboutPageComponent } from "./pages/about-page/about-page.component";

@NgModule({
    exports: [ RouterModule ],
    imports: [
        RouterModule.forRoot([
            {
                path: 'home',
                component: HomePageComponent
            },
            {
                path: 'about',
                component: AboutPageComponent
            },
            {
                path: '**',
                redirectTo: 'home'
            }
        ], { initialNavigation: 'enabledBlocking' }),
    ]
})
export class AppRoutingModule {
}
