import { Component } from '@angular/core';
import { faPhone, faAt, faLocation } from '@fortawesome/free-solid-svg-icons';
import { BreakpointService } from '../../services/breakpoint.service';
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
    selector: 'app-contact-home-page',
    templateUrl: './cv-page.component.html',
    styleUrls: ['./cv-page.component.scss']
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
        description: string;
    }[] = [];
    educations: { startDate: Date; endDate: Date | null; endDateStr: string; degree: string; location: string }[] = [];
    skills: string[] = [];
    languages: string[] = [];
    constructor(public breakpointService: BreakpointService) {
        this.educations = [
            {
                startDate: new Date(2021, Month.AUG),
                endDate: new Date(2025, Month.AUG),
                endDateStr: '',
                degree: `Information and Communication Technology, Bachelor's Degree`,
                location: 'Metropolia University of Applied Sciences, Espoo'
            },
            {
                startDate: new Date(2018, Month.APR),
                endDate: new Date(2020, Month.JUN),
                endDateStr: 'Now',
                degree: `Vocational Qualification in Information and Telecommunications Technology`,
                location: 'Careeria, Porvoo'
            }
        ];

        this.workExperiences = [
            {
                startDate: new Date(2021, Month.AUG),
                endDate: null,
                endDateStr: 'Now',
                position: 'Web Developer  (Part-time)',
                location: 'WeAre Solutions Oy',
                description: `
                <p>I manage a React component library and update it as needed.</p>
                <p>Also, I have been working on an accounting project working with an invoicing system.</p>
                `
            },
            {
                startDate: new Date(2020, Month.AUG),
                endDate: new Date(2021, Month.AUG),
                endDateStr: '',
                position: 'Web Developer  (Full-time)',
                location: 'WeAre Solutions Oy',
                description: `
                <p>I managed the DevOps side of a few applications to make sure they deploy with correct configurations to Elastic container service (ECS) on Aws.</p>
                <p>Also, I had a few responsibilities in the productization process and made sure Docker containers' secret management was done in the best way possible.</p>
                <p>Later I joined the developer’s team to work on migrating multiple react applications’ components to their own npm packages and manage the versions of various npm packages.</p>
                `
            },
            {
                startDate: new Date(2019, Month.MAR),
                endDate: new Date(2020, Month.AUG),
                endDateStr: '',
                position: 'Web Developer  (Internship)',
                location: 'WeAre Solutions Oy',
                description: `
                <p>I refactored a quite big Express project to Typescript and at the same refactored the Angular project to have a structure for files and modules and updated it to the latest version. </p>
                `
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
        this.languages = ['English', 'Finnish (B2-C1)', 'Persian'];
    }
}
