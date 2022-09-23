import { Body, Controller, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateRoomRequest, CreateRoomResponse, RoomModel } from '@ericaskari/shared/model';
import { v4 as uuid } from 'uuid';
import { MeetService } from './meet.service';
import { first, firstValueFrom, map, Observable } from 'rxjs';
// Auto generated file with generate:api npm command

@ApiTags('Meet')
@Controller('meet')
export class MeetController {
    constructor(private service: MeetService) {}

    @Post('room')
    async createRoom(@Body() bodyRequest: CreateRoomRequest): Promise<Observable<CreateRoomResponse>> {
        console.log('createRoom');

        const id = uuid();
        const { offer } = bodyRequest;

        const rooms = await firstValueFrom(this.service.rooms);

        rooms[id] = { id, offer, answer: null, calleeCandidates: [], callerCandidates: [] };

        this.service.rooms.next(rooms);

        return this.service.rooms.pipe(
            first(),
            map((rooms) => {
                return CreateRoomResponse.fromRequest({
                    room: rooms[id]
                });
            })
        );
    }
    @Patch(':roomId')
    async updateRoom(@Param('roomId') roomId: string, @Body() bodyRequest: RoomModel): Promise<Observable<RoomModel>> {
        console.log('updateRoom');

        const rooms = await firstValueFrom(this.service.rooms);

        let room = rooms[roomId] ?? null;
        if (!room) {
            throw new NotFoundException();
        }

        room = {
            ...room,
            ...bodyRequest
        };

        rooms[roomId] = room;
        this.service.rooms.next(rooms);

        return this.service.rooms.pipe(
            first(),
            map((rooms) => {
                return rooms[roomId];
            })
        );
    }

    @Post(':roomId/addOffer')
    async addOffer(@Param('roomId') roomId: string, @Body() bodyRequest: any): Promise<any> {
        console.log('addOffer');
        const rooms = await firstValueFrom(this.service.rooms);

        const room = rooms[roomId] ?? null;
        if (!room) {
            throw new NotFoundException();
        }

        room.offer = bodyRequest;
        rooms[roomId] = room;
        this.service.rooms.next(rooms);

        return this.service.rooms.pipe(
            first(),
            map((rooms) => {
                return rooms[roomId];
            })
        );
    }

    @Post(':roomId/addCaller')
    async addCaller(@Param('roomId') roomId: string, @Body() bodyRequest: any): Promise<any> {
        console.log('addCaller');
        const rooms = await firstValueFrom(this.service.rooms);

        const room = rooms[roomId] ?? null;
        if (!room) {
            throw new NotFoundException();
        }

        room.callerCandidates = [...(room.callerCandidates ?? []), bodyRequest];
        rooms[roomId] = room;
        this.service.rooms.next(rooms);

        return this.service.rooms.pipe(
            first(),
            map((rooms) => {
                return rooms[roomId];
            })
        );
    }

    @Post(':roomId/addCallee')
    async addCallee(@Param('roomId') roomId: string, @Body() bodyRequest: any): Promise<any> {
        console.log('addCallee');
        const rooms = await firstValueFrom(this.service.rooms);

        const room = rooms[roomId] ?? null;
        if (!room) {
            throw new NotFoundException();
        }

        room.calleeCandidates = [...(room.calleeCandidates ?? []), bodyRequest];
        rooms[roomId] = room;
        this.service.rooms.next(rooms);

        return this.service.rooms.pipe(
            first(),
            map((rooms) => {
                return rooms[roomId];
            })
        );
    }

    @Post(':roomId/addAnswer')
    async addAnswer(@Param('roomId') roomId: string, @Body() bodyRequest: any): Promise<any> {
        console.log('addAnswer');
        const rooms = await firstValueFrom(this.service.rooms);

        const room = rooms[roomId] ?? null;
        if (!room) {
            throw new NotFoundException();
        }

        room.answer = bodyRequest;
        rooms[roomId] = room;
        this.service.rooms.next(rooms);

        return this.service.rooms.pipe(
            first(),
            map((rooms) => {
                return rooms[roomId];
            })
        );
    }
}
