import { Component } from '@angular/core';
import { faPhone, faAt, faLocation } from '@fortawesome/free-solid-svg-icons';
import { BreakpointService } from '../../services/breakpoint.service';
import { TextAnimationDirective } from '../../components/text-animation.directive';
import { TranslateService } from '@ngx-translate/core';
enum Month {
    JAN,
    FEB,
    MAR,
    APR,
    MAY,
    JUN,
    JUL,
    AUG,
    SEP,
    OCT,
    NOV,
    DEC
}

@Component({
    selector: 'app-cv-page',
    templateUrl: './cv-page.component.html',
    styleUrls: ['./cv-page.component.scss'],
    animations: [TextAnimationDirective.getTextChangeAnimation()]
})
export class CvPageComponent {
    faPhone = faPhone;
    faAt = faAt;
    faLocation = faLocation;
    revealEmail = false;
    revealPhone = false;
    workExperiences: {
        startDate: Date;
        endDate: Date | null;
        endDateStr: string;
        position: string;
        location: string;
        description: string[];
    }[] = [];
    educations: { startDate: Date; endDate: Date | null; endDateStr: string; degree: string; location: string }[] = [];
    skills: string[] = [];
    languages: string[] = [];

    constructor(public breakpointService: BreakpointService, public translate: TranslateService) {
        this.educations = [
            {
                startDate: new Date(2021, Month.AUG),
                endDate: new Date(2025, Month.AUG),
                endDateStr: '',
                degree: `pages.cv.education-degree-2`,
                location: 'pages.cv.education-degree-2-place'
            },
            {
                startDate: new Date(2018, Month.APR),
                endDate: new Date(2020, Month.JUN),
                endDateStr: 'Now',
                degree: `pages.cv.education-degree-1`,
                location: 'pages.cv.education-degree-1-place'
            }
        ];

        this.workExperiences = [
            {
                startDate: new Date(2021, Month.AUG),
                endDate: null,
                endDateStr: 'Now',
                position: 'Web Developer  (Part-time)',
                location: 'WeAre Solutions Oy',
                description: ['pages.cv.work-experience.weare.parttime.sentence-1', 'pages.cv.work-experience.weare.parttime.sentence-2']
            },
            {
                startDate: new Date(2020, Month.AUG),
                endDate: new Date(2021, Month.AUG),
                endDateStr: '',
                position: 'Web Developer  (Full-time)',
                location: 'WeAre Solutions Oy',
                description: [
                    'pages.cv.work-experience.weare.fulltime.sentence-1',
                    'pages.cv.work-experience.weare.fulltime.sentence-2',
                    'pages.cv.work-experience.weare.fulltime.sentence-3'
                ]
            },
            {
                startDate: new Date(2019, Month.MAR),
                endDate: new Date(2020, Month.AUG),
                endDateStr: '',
                position: 'Web Developer  (Internship)',
                location: 'WeAre Solutions Oy',
                description: ['pages.cv.work-experience.weare.internship.sentence-1']
            }
        ];

        this.skills = [
            'HTML/JS/CSS/SCSS',
            'Typescript',
            'C# (Basic)',
            'React',
            'Linux/Docker',
            'Angular (Expert)',
            'RxJs',
            'Redux/NgRx',
            'ExpressJs/Nestjs',
            'DevOps/AWS (Basic)',
            'CI/CD, Github Actions, Bitbucket pipelines',
            'SQL, TypeORM and Postgress',
            'MongoDb and Mongoose'
        ];
        this.languages = ['pages.cv.languages.en', 'pages.cv.languages.fi', 'pages.cv.languages.fa'];
    }
}
