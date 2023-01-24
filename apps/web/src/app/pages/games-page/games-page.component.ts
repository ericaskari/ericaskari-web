import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { TextAnimationDirective } from '../../components/text-animation.directive';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-games-page',
    templateUrl: './games-page.component.html',
    styleUrls: ['./games-page.component.scss'],
    animations: [
        TextAnimationDirective.getTextChangeAnimation(),
        trigger('landingText', [
            transition('* => visible', [animate('1s')]),
            state(
                'visible',
                style({
                    opacity: 1
                })
            )
        ])
    ]
})
export class GamesPageComponent implements AfterViewInit {
    @ViewChild('myCanvas') myCanvas: ElementRef<HTMLCanvasElement> | undefined;
    public context: CanvasRenderingContext2D | null = null;

    constructor(public translate: TranslateService) {}

    get canvas() {
        return this.myCanvas?.nativeElement;
    }
    ngAfterViewInit(): void {
        console.log(this.myCanvas);
        this.context = this.myCanvas?.nativeElement.getContext('2d') ?? null;
        if (this.context) {
            this.context.font = '30px Arial';
            this.context.textBaseline = 'middle';
            this.context.textAlign = 'center';
            // const x = (this.myCanvas!.nativeElement as HTMLCanvasElement).width / 2;
            // const y = (this.myCanvas!.nativeElement as HTMLCanvasElement).height / 2;
            // this.context.fillText('@realappie', x, y);
        }
    }
}
