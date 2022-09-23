import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
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

    public app = firebase.initializeApp({
        apiKey: 'AIzaSyDrPF-xbFIFUM1uvDjYQt7P2L_duhVhEII',
        authDomain: 'aska-meet.firebaseapp.com',
        projectId: 'aska-meet',
        storageBucket: 'aska-meet.appspot.com',
        messagingSenderId: '448085315306',
        appId: '1:448085315306:web:d506b94794425643cb5193',
        measurementId: 'G-G9R45B1NTR'
    });
    public db = getFirestore(this.app);

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

    public addCaller(roomId: string, body: any) {
        return this.httpClient.post<any>(`/api/meet/${roomId}/addCaller`, body);
    }

    public addCallee(roomId: string, body: any) {
        return this.httpClient.post<any>(`/api/meet/${roomId}/addCallee`, body);
    }

    public addOffer(roomId: string, body: any) {
        return this.httpClient.post<any>(`/api/meet/${roomId}/addOffer`, body);
    }

    public addAnswer(roomId: string, body: any) {
        return this.httpClient.post<any>(`/api/meet/${roomId}/addAnswer`, body);
    }
}
