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
                    title: 'Eric Askari'
                },
                {
                    path: 'contact',
                    component: ContactPageComponent,
                    title: 'Eric Askari - Contact'
                },
                {
                    path: 'cv',
                    component: CvPageComponent,
                    title: 'Eric Askari - CV'
                },
                {
                    path: '**',
                    redirectTo: ''
                }
            ],
            { initialNavigation: 'enabledBlocking' }
        )
    ]
})
export class AppRoutingModule {}
