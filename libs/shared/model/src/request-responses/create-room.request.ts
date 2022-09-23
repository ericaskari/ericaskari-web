import { plainToClass } from 'class-transformer';

export class CreateRoomRequest {
    name!: string;

    offer!: any;

    public static fromRequest(model: Partial<CreateRoomRequest>): CreateRoomRequest {
        return plainToClass(CreateRoomRequest, model);
    }
}
