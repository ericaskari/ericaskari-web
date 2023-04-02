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

    @ViewChild('chart', { static: true }) chart!: ElementRef<HTMLCanvasElement>;


    constructor(private httpClient: HttpClient) {
    }

    private config(waterEvents: WaterEvent[] = []): ChartConfiguration<any, any, any> {
        const data = {
            labels: [
                ...waterEvents.map(({ time }) => new Date(time).toISOString())
            ],
            datasets: [
                {
                    label: 'Plant watering data',
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
                        text: 'Chart.js Time Scale',
                        display: true
                    }
                },
                scales: {
                    x: {
                        type: 'time',
                        adapters: {
                            date: {
                                locale: enUS,
                            },
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
                        reverse: true
                    }
                }
            }
        };
    }

    ngOnInit(): void {
        this.httpClient.get<GetWaterLevelResponse>('/api/water-events').subscribe(response => {
            const { items } = response;
            console.log(items)
            const myChart = new Chart(this.chart.nativeElement, this.config(items));
        });


    }

}
