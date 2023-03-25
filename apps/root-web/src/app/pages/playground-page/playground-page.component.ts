import { Component } from '@angular/core';
import { TextAnimationDirective } from '../../components/text-animation.directive';
import { CommonModule } from '@angular/common';
import { MinidenticonComponent } from '@ericaskari/web/common';
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

interface Project {
    name: string;
    environment: string;
    description: string;
    technologies: string[];
    isPublic: boolean;
    environments: { name: string; isPublic: boolean; url: string }[];
}
@Component({
    selector: 'app-playground-page',
    templateUrl: './playground-page.component.html',
    styleUrls: ['./playground-page.component.scss'],
    animations: [TextAnimationDirective.getTextChangeAnimation()],
    imports: [CommonModule, MinidenticonComponent, FontAwesomeModule],
    standalone: true
})
export class PlaygroundPageComponent {
    faLock = faLock;
    faLockOpen = faLockOpen;
    projects: Project[] = [
        {
            name: 'Eric Askari - Web developer',
            environment: 'production',
            isPublic: true,
            description: 'Portfolio website to showcase skills, work, and achievements.',
            technologies: ['Angular', 'NestJs', 'Postgres', 'Docker', 'Kubernetes', 'Amazon Elastic Container Registry', 'Tailwind CSS'],
            environments: [
                {
                    name: 'production',
                    isPublic: true,
                    url: 'https://ericaskari.com'
                },
                {
                    name: 'development',
                    isPublic: false,
                    url: 'https://test.ericaskari.com'
                }
            ]
        },
        {
            name: 'Todo App',
            environment: 'development',
            isPublic: true,
            description: 'Todo application mainly to learn C# and ASP.Net Core programming.',
            technologies: [
                'Angular',
                'ASP.NET Core',
                'Postgres',
                'Docker',
                'Kubernetes',
                'Amazon Elastic Container Registry',
                'Tailwind CSS'
            ],
            environments: [
                {
                    name: 'development',
                    isPublic: true,
                    url: 'https://todo-test.ericaskari.com'
                }
            ]
        }
    ];
}
