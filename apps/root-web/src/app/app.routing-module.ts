import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { CvPageComponent } from './pages/cv-page/cv-page.component';
import { PlaygroundPageComponent } from './pages/playground-page/playground-page.component';

@NgModule({
    exports: [RouterModule],
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: '',
                    component: HomePageComponent,
                    title: 'Eric Askari - Web developer'
                },
                {
                    path: 'cv',
                    component: CvPageComponent,
                    title: 'Eric Askari - CV'
                },
                {
                    path: 'playground',
                    component: PlaygroundPageComponent,
                    title: 'Eric Askari - Playground'
                },
                {
                    path: 'plants',
                    loadComponent: () => import('./pages/plants-page/plants-page.component').then((mod) => mod.PlantsPageComponent),
                    title: 'Eric Askari - Plants'
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
