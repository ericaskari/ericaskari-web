import { IsEmail, IsString } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { RoomModel } from '../models/room.model';

export class CreateRoomResponse {
    room!: RoomModel;

    public static fromRequest(model: Partial<CreateRoomResponse>): CreateRoomResponse {
        return plainToClass(CreateRoomResponse, model);
    }
}
