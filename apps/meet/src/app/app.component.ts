import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RoomService } from './room.service';
import { firstValueFrom } from 'rxjs';
import { SocketService } from './socket.service';
import { RoomModel } from '@ericaskari/shared/model';

@Component({
    selector: 'ericaskari-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    roomId = new FormControl<string>('');

    constructor(public roomService: RoomService, private socketService: SocketService) {}

    async openWebcam() {
        this.roomService.localStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        });
        this.roomService.remoteStream = new MediaStream();
    }

    async createRoom() {
        const { room: emptyRoom } = await firstValueFrom(this.roomService.createRoom({ offer: {} }));

        this.roomService.peerConnection = new RTCPeerConnection(this.roomService.rtcPeerConnectionConfiguration);

        this.roomService.peerConnection.addEventListener('track', (event) => {
            console.log('Got remote track:', event.streams[0]);
            event.streams[0].getTracks().forEach((track) => {
                console.log('Add a track to the remoteStream:');
                this.roomService.remoteStream.addTrack(track);
            });
        });

        // Reference Firestore collections for signaling

        this.roomService.peerConnection.addEventListener('icegatheringstatechange', () => {
            console.log(`createRoom: ICE gathering state changed: ${this.roomService.peerConnection.iceGatheringState}`);
        });

        this.roomService.peerConnection.addEventListener('connectionstatechange', () => {
            console.log(`createRoom: Connection state change: ${this.roomService.peerConnection.connectionState}`);
        });

        this.roomService.peerConnection.addEventListener('signalingstatechange', () => {
            console.log(`createRoom: Signaling state change: ${this.roomService.peerConnection.signalingState}`);
        });

        this.roomService.peerConnection.addEventListener('iceconnectionstatechange ', () => {
            console.log(`createRoom: ICE connection state change: ${this.roomService.peerConnection.iceConnectionState}`);
        });

        this.roomService.localStream.getTracks().forEach((track) => {
            this.roomService.peerConnection.addTrack(track, this.roomService.localStream);
        });

        this.roomService.peerConnection.addEventListener('icecandidate', (event) => {
            if (!event.candidate) {
                console.log('Got final candidate!');
                return;
            }
            console.log('Got candidate: ');
            firstValueFrom(this.roomService.addCaller(emptyRoom.id, event.candidate.toJSON())).then(({ id }) => {
                console.log('createCallerCandidate: ', { id });
            });
        });

        const offer = await this.roomService.peerConnection.createOffer();

        await this.roomService.peerConnection.setLocalDescription(offer);
        console.log('Created offer:', offer);

        const room = await firstValueFrom(
            this.roomService.addOffer(emptyRoom.id, {
                type: offer.type,
                sdp: offer.sdp
            })
        );

        this.roomId.setValue(room.id);

        console.log(`New room created with SDP offer. Room ID: ${room.id}`);

        this.socketService.rooms.subscribe(async (data) => {
            const currentRoom = data[room.id];
            if (!this.roomService.peerConnection.currentRemoteDescription && currentRoom && currentRoom.answer) {
                console.log('Got remote description: ', currentRoom.answer);
                const rtcSessionDescription = new RTCSessionDescription(currentRoom.answer);
                await this.roomService.peerConnection.setRemoteDescription(rtcSessionDescription);
            }
        });

        let addedIndex = -1;
        this.socketService.rooms.subscribe(async (rooms) => {
            const room = rooms[this.roomId.value ?? ''];
            const calleeCandidates = room.calleeCandidates ?? [];

            for (const item of calleeCandidates) {
                const index = calleeCandidates.indexOf(item);
                if (index > addedIndex) {
                    const data = calleeCandidates[index];
                    console.log(`Got new remote ICE candidate:`);
                    await this.roomService.peerConnection.addIceCandidate(new RTCIceCandidate(data));
                    addedIndex = index;
                }
            }
        });
    }

    async joinRoom() {
        console.log('Joining...');
        const rooms = await firstValueFrom(this.socketService.rooms);
        console.log('rooms');

        if (!rooms[this.roomId.value ?? '']) {
            console.log('Room does not exist.');
            return;
        }

        console.log('Create PeerConnection with configuration: ', this.roomService.rtcPeerConnectionConfiguration);
        this.roomService.peerConnection = new RTCPeerConnection(this.roomService.rtcPeerConnectionConfiguration);

        this.roomService.peerConnection.addEventListener('icegatheringstatechange', () => {
            console.log(`ICE gathering state changed: ${this.roomService.peerConnection.iceGatheringState}`);
        });

        this.roomService.peerConnection.addEventListener('connectionstatechange', () => {
            console.log(`Connection state change: ${this.roomService.peerConnection.connectionState}`);
        });

        this.roomService.peerConnection.addEventListener('signalingstatechange', () => {
            console.log(`Signaling state change: ${this.roomService.peerConnection.signalingState}`);
        });

        this.roomService.peerConnection.addEventListener('iceconnectionstatechange ', () => {
            console.log(`ICE connection state change: ${this.roomService.peerConnection.iceConnectionState}`);
        });

        this.roomService.localStream.getTracks().forEach((track) => {
            this.roomService.peerConnection.addTrack(track, this.roomService.localStream);
        });

        this.roomService.peerConnection.addEventListener('icecandidate', async (event) => {
            if (!event.candidate) {
                console.log('Got final candidate!');
                return;
            }
            console.log('Got candidate: ', event.candidate);

            await firstValueFrom(this.roomService.addCallee(this.roomId.value ?? '', event.candidate.toJSON()));
        });

        console.log('this.roomService.peerConnection.addEventListener');

        this.roomService.peerConnection.addEventListener('track', (event) => {
            console.log('Got remote track:');
            event.streams[0].getTracks().forEach((track) => {
                this.roomService.remoteStream.addTrack(track);
            });
        });

        {
            const room: RoomModel = rooms[this.roomId.value ?? ''];

            // Code for creating SDP answer below
            const offer = room.offer;

            console.log('Got offer:', offer);
            await this.roomService.peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
            const answer = await this.roomService.peerConnection.createAnswer();
            console.log('Created answer:', answer);
            await this.roomService.peerConnection.setLocalDescription(answer);

            await firstValueFrom(
                this.roomService.addAnswer(room.id, {
                    type: answer.type,
                    sdp: answer.sdp
                })
            );
        }

        {
            let addedIndex = -1;
            this.socketService.rooms.subscribe(async (rooms) => {
                const room = rooms[this.roomId.value ?? ''];
                const callerCandidates = room.callerCandidates ?? [];

                for (const item of callerCandidates) {
                    const index = callerCandidates.indexOf(item);
                    if (index > addedIndex) {
                        const data = callerCandidates[index];
                        console.log(`Got new remote ICE candidate ${index}/${addedIndex}`);
                        await this.roomService.peerConnection.addIceCandidate(new RTCIceCandidate(data));
                        addedIndex = index;
                    }
                }
            });
        }
    }
}
