import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { fromEvent, shareReplay } from 'rxjs';
import { CallerModel, RoomModel, SocketEvents } from '@ericaskari/shared/model';

@Injectable({
    providedIn: 'root'
})
export class SocketService {
    socket = io({
        path: '/wss'
    });

    // Connect data source to ngrx

    rooms$ = fromEvent<Record<string, RoomModel>>(this.socket, SocketEvents.RoomsUpdated).pipe(shareReplay(1));

    constructor() {
        this.socket.on('connect', () => this.onConnect(this.socket));
        // this.socket.onAny((args) => {
        //     console.log('Any: ', args);
        // });
        this.rooms$.subscribe();
    }
    /**
     * Get initial values needed from server
     * @param client
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async onConnect(client: any) {}
}
