import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { CvPageComponent } from './pages/cv-page/cv-page.component';
import { GamesPageComponent } from './pages/games-page/games-page.component';

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
                    path: 'cv',
                    component: CvPageComponent,
                    title: 'Eric Askari - CV'
                },
                {
                    path: 'games',
                    component: GamesPageComponent,
                    title: 'Eric Askari - Games'
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
