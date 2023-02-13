import { Pipe, PipeTransform } from '@angular/core';
import { Timeline } from '../components/timeline/timeline.component';
import { Education } from '../pages/cv-page/cv-page.component';

@Pipe({ name: 'educationListToTimelineList' })
export class EducationListToTimelineListPipe implements PipeTransform {
    transform(value: Education[]): Timeline[] {
        return value.map((item) => {
            return {
                startDate: item.startDate,
                endDate: item.endDate,
                endDateStr: item.endDateStr,
                leftHeader: item.location,
                leftSub: item.city,
                rightDescription: item.description,
                rightHeader: item.degree
            };
        });
    }
}
