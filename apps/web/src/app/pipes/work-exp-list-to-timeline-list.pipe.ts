import { Pipe, PipeTransform } from '@angular/core';
import { Timeline } from '../components/timeline/timeline.component';
import { Education, WorkExperience } from '../pages/cv-page/cv-page.component';

@Pipe({ name: 'workExpListToTimelineList' })
export class WorkExpListToTimelineListPipe implements PipeTransform {
    transform(value: WorkExperience[]): Timeline[] {
        return value.map((item) => {
            return {
                startDate: item.startDate,
                endDate: item.endDate,
                endDateStr: item.endDateStr,
                leftHeader: item.location,
                leftSub: item.city,
                rightDescription: item.description,
                rightHeader: item.position
            };
        });
    }
}
