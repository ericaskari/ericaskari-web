import { plainToClass } from 'class-transformer';

export class CreateRoomRequest {
    offer!: any;

    public static fromRequest(model: Partial<CreateRoomRequest>): CreateRoomRequest {
        return plainToClass(CreateRoomRequest, model);
    }
}
