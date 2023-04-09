import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import 'chartjs-adapter-date-fns';
import { Chart, registerables } from 'chart.js'
import { ChartConfiguration } from "chart.js/dist/types";
import { HttpClient } from "@angular/common/http";
import { GetWaterLevelResponse, WaterEvent } from "@ericaskari/shared/model";
import { enUS } from 'date-fns/locale';

Chart.register(...registerables);

const COLORS = [ '#4dc9f6', '#f67019', '#f53794', '#537bc4', '#acc236', '#166a8f', '#00a950', '#58595b', '#8549ba' ];

export function color(index: any) {
    return COLORS[index % COLORS.length];
}

export const CHART_COLORS = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};

@Component({
    selector: 'app-plants-page',
    templateUrl: './plants-page.component.html',
    styleUrls: [ './plants-page.component.scss' ],
    standalone: true
})
export class PlantsPageComponent implements OnInit {

    @ViewChild('allTime', { static: true }) allTime!: ElementRef<HTMLCanvasElement>;
    @ViewChild('last30Days', { static: true }) last30Days!: ElementRef<HTMLCanvasElement>;
    @ViewChild('last7Days', { static: true }) last7Days!: ElementRef<HTMLCanvasElement>;
    @ViewChild('last24Hours', { static: true }) last24Hours!: ElementRef<HTMLCanvasElement>;


    constructor(private httpClient: HttpClient) {
    }

    private config(waterEvents: WaterEvent[] = [], name: string): ChartConfiguration<any, any, any> {
        const data = {
            labels: [
                ...waterEvents.map(({ time }) => new Date(time).toISOString())
            ],
            datasets: [
                {
                    label: name,
                    borderColor: CHART_COLORS.green,
                    fill: false,
                    data: waterEvents.map(({ value, time }) => ({
                        x: new Date(time),
                        y: value
                    }))
                }
            ]
        };
        return {
            type: 'line',
            data: data,
            options: {
                plugins: {
                    title: {
                        text: name,
                        display: true
                    }
                },
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day'
                        },
                        title: {
                            display: true,
                            text: 'Date'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'value'
                        },
                        reverse: false
                    }
                }
            }
        };
    }

    ngOnInit(): void {
        this.httpClient.get<GetWaterLevelResponse>('/api/water-events').subscribe(response => {
            const { last24Hours, last30Days, last7Days, allTime } = response;
            new Chart(this.allTime.nativeElement, this.config(allTime, 'allTime'));
            new Chart(this.last30Days.nativeElement, this.config(last30Days, 'last30Days'));
            new Chart(this.last7Days.nativeElement, this.config(last7Days, 'last7Days'));
            new Chart(this.last24Hours.nativeElement, this.config(last24Hours, 'last24Hours'));
        });


    }

}
