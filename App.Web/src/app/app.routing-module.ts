import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { ContactPageComponent } from "./pages/contact-page/contact-page.component";

@NgModule({
    exports: [ RouterModule ],
    imports: [
        RouterModule.forRoot([
            {
                path: 'home',
                component: HomePageComponent
            },
            {
                path: 'contact',
                component: ContactPageComponent
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
