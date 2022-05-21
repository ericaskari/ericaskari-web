import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CvPageComponent } from './pages/cv-page/cv-page.component';

@NgModule({
    exports: [RouterModule],
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: '',
                    component: HomePageComponent,
                },
                {
                    path: 'contact',
                    component: ContactPageComponent,
                },
                {
                    path: 'cv',
                    component: CvPageComponent,
                },
                {
                    path: '**',
                    redirectTo: '',
                },
            ],
            { initialNavigation: 'enabledBlocking' }
        ),
    ],
})
export class AppRoutingModule {}
