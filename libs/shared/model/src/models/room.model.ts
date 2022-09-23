export class RoomModel {
    name!: string;
    id!: string;
    offer!: any;
    answer!: any;
    callerCandidates!: RTCIceCandidateInit[];
    calleeCandidates!: RTCIceCandidateInit[];
}
