export class RoomModel {
    id!: string;
    offer!: any;
    answer!: any;
    callerCandidates!: RTCIceCandidateInit[];
    calleeCandidates!: RTCIceCandidateInit[];
}
