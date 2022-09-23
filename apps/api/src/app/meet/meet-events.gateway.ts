import { OnGatewayConnection, OnGatewayInit, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { first, map, Observable } from 'rxjs';
import { MeetService } from './meet.service';
import { SocketEvents } from '@ericaskari/shared/model';

@WebSocketGateway({
    path: '/wss'
})
export class MeetEventsGateway implements OnGatewayConnection, OnGatewayInit {
    @WebSocketServer()
    server!: Server;

    dataSources: Observable<{ event: string; data: any }>[] = [
        this.meetService.rooms.pipe(
            map((data) => ({
                event: SocketEvents.RoomsUpdated,
                data
            }))
        )
    ];

    constructor(private meetService: MeetService) {}

    /**
     * It should skip first emit of the observables otherwise if client has connected then they will get the data twice because of onConnect initial request.
     * But every update after is fine.
     * @param server
     */
    afterInit(server: Server): void {
        this.dataSources.map((source$) => source$.subscribe(({ event, data }) => server.emit(String(event), data)));
    }

    /**
     * @deprecated Move initial value request to user side.
     * @param client
     */
    async handleConnection(client: any) {
        this.dataSources.map((source$) => {
            source$.pipe(first()).subscribe(({ event, data }) => client.emit(String(event), data));
        });
    }
}
