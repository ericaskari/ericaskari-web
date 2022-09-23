import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateRoomRequest, CreateRoomResponse, RoomModel } from '@ericaskari/shared/model';

@Injectable({
    providedIn: 'root'
})
export class RoomService {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    localStream: MediaStream = null!;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    remoteStream: MediaStream = null!;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    peerConnection: RTCPeerConnection = null!;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    peerConnection2: RTCPeerConnection = null!;

    rtcPeerConnectionConfiguration = {
        iceServers: [
            {
                urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'] // free stun server
            }
        ],
        iceCandidatePoolSize: 10
    };

    constructor(private httpClient: HttpClient) {}

    public createRoom(request: CreateRoomRequest) {
        return this.httpClient.post<CreateRoomResponse>('/api/meet/room', request);
    }
    public deleteRoom(roomId: string) {
        return this.httpClient.delete<void>(`/api/meet/${roomId}`);
    }

    public patchRoom(roomId: string, request: Partial<RoomModel>) {
        return this.httpClient.patch<RoomModel>(`/api/meet/${roomId}`, request);
    }

    public addCaller(roomId: string, body: RTCIceCandidateInit[]) {
        return this.httpClient.post<any>(`/api/meet/${roomId}/addCaller`, body);
    }

    public addCallee(roomId: string, body: RTCIceCandidateInit[]) {
        return this.httpClient.post<any>(`/api/meet/${roomId}/addCallee`, body);
    }

    public addOffer(roomId: string, body: any) {
        return this.httpClient.post<any>(`/api/meet/${roomId}/addOffer`, body);
    }

    public addAnswer(roomId: string, body: any) {
        return this.httpClient.post<any>(`/api/meet/${roomId}/addAnswer`, body);
    }
}
