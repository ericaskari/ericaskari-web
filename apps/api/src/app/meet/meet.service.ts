import { Injectable } from '@nestjs/common';
import { BehaviorSubject } from 'rxjs';

import { CallerModel, RoomModel } from '@ericaskari/shared/model';

@Injectable()
export class MeetService {
    rooms = new BehaviorSubject<Record<string, RoomModel>>({});
}
