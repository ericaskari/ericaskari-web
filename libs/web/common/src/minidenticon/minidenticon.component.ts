import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdenticonsPipe } from './minidenticons.pipe';

@Component({
    selector: 'app-minidenticon',
    templateUrl: './minidenticon.component.html',
    styleUrls: ['./minidenticon.component.scss'],
    imports: [CommonModule, IdenticonsPipe],
    standalone: true
})
export class MinidenticonComponent {
    @Input() username: string | null = null;
}
