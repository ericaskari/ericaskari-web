import { Component } from '@angular/core';
import { RoomService } from './room.service';
import { firstValueFrom, fromEvent, map, reduce, Subject, takeUntil, tap } from 'rxjs';
import { SocketService } from './socket.service';
import { RoomModel } from '@ericaskari/shared/model';

@Component({
    selector: 'ericaskari-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    rooms$ = this.socketService.rooms$.pipe(map((x) => Object.values(x)));
    createRoomLogs: string[] = [];
    joinRoomLogs: string[] = [];

    isWebcamClosed = true;
    constructor(public roomService: RoomService, private socketService: SocketService) {}

    async openWebcam() {
        this.roomService.localStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        });
        this.roomService.remoteStream = new MediaStream();
        this.isWebcamClosed = false;
    }

    async createRoom() {
        const log = (item: string) => this.createRoomLogs.push(item);
        this.createRoomLogs = [];
        log('Creating room.');
        const { room: emptyRoom } = await firstValueFrom(this.roomService.createRoom({ offer: {}, name: '' }));
        log('Room created.');

        this.roomService.peerConnection?.removeAllListeners?.('icegatheringstatechange');
        this.roomService.peerConnection?.removeAllListeners?.('connectionstatechange');
        this.roomService.peerConnection?.removeAllListeners?.('signalingstatechange');
        this.roomService.peerConnection?.removeAllListeners?.('iceconnectionstatechange');

        this.roomService.peerConnection = new RTCPeerConnection(this.roomService.rtcPeerConnectionConfiguration);
        log('new RTCPeerConnection created.');

        fromEvent<RTCTrackEvent>(this.roomService.peerConnection, 'track').subscribe((event) => {
            log('a remote track received.');
            event.streams[0].getTracks().forEach((track) => {
                this.roomService.remoteStream.addTrack(track);
            });
        });

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

        const icecandidateFinished$ = new Subject<boolean>();
        fromEvent<RTCPeerConnectionIceEvent>(this.roomService.peerConnection, 'icecandidate')
            .pipe(
                takeUntil(icecandidateFinished$),
                tap((event) => {
                    if (!event.candidate) {
                        icecandidateFinished$.next(true);
                    }
                }),
                reduce((prev, curr) => {
                    return [...prev, curr];
                }, [] as RTCPeerConnectionIceEvent[])
            )
            .subscribe({
                next: async (data) => {
                    log(`Saving RTCPeerConnectionIceEvents to db ${data.length}`);

                    console.log('RTCPeerConnectionIceEvent DATA: ', data);
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    const callers = data.map((x) => x.candidate!.toJSON());
                    await firstValueFrom(this.roomService.addCaller(emptyRoom.id, callers));
                    log('RTCPeerConnectionIceEvents saved to db.');
                },
                error: (error) => {
                    console.log('RTCPeerConnectionIceEvent ERROR: ', error);
                },
                complete: () => {
                    console.log('RTCPeerConnectionIceEvent COMPLETE: ');
                }
            });

        const offer = await this.roomService.peerConnection.createOffer();
        log('offer created.');

        await this.roomService.peerConnection.setLocalDescription(offer);
        console.log('Created offer:', offer);

        log('saving offer');
        const room = await firstValueFrom(
            this.roomService.addOffer(emptyRoom.id, {
                type: offer.type,
                sdp: offer.sdp
            })
        );
        log('offer saved.');

        const roomId = room.id;

        console.log(`New room created with SDP offer. Room ID: ${room.id}`);

        this.socketService.rooms$.subscribe(async (data) => {
            const currentRoom = data[room.id];
            if (!this.roomService.peerConnection.currentRemoteDescription && currentRoom && currentRoom.answer) {
                console.log('Got remote description: ', currentRoom.answer);
                const rtcSessionDescription = new RTCSessionDescription(currentRoom.answer);
                await this.roomService.peerConnection.setRemoteDescription(rtcSessionDescription);
            }
        });

        {
            this.socketService.rooms$.subscribe(async (rooms) => {
                const room = rooms[roomId];
                console.log(room.calleeCandidates);

                const calleeCandidates = room.calleeCandidates.map((item) => {
                    return this.roomService.peerConnection.addIceCandidate(new RTCIceCandidate(item));
                });

                // eslint-disable-next-line no-empty
                for await (const contents of calleeCandidates) {
                }
                log(`calleeCandidates: new IceCandidates added. (${calleeCandidates.length})`);
            });
        }
    }

    async joinRoom(roomId: string) {
        const log = (item: string) => this.joinRoomLogs.push(item);
        this.joinRoomLogs = [];

        log('Joining');
        const rooms = await firstValueFrom(this.socketService.rooms$);

        if (!rooms[roomId]) {
            console.log('Room does not exist.');
            return;
        }

        this.roomService.peerConnection?.removeAllListeners?.('icegatheringstatechange');
        this.roomService.peerConnection?.removeAllListeners?.('connectionstatechange');
        this.roomService.peerConnection?.removeAllListeners?.('signalingstatechange');
        this.roomService.peerConnection?.removeAllListeners?.('iceconnectionstatechange');

        this.roomService.peerConnection = new RTCPeerConnection(this.roomService.rtcPeerConnectionConfiguration);
        log('new RTCPeerConnection created');

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

        const icecandidateFinished$ = new Subject<boolean>();
        fromEvent<RTCPeerConnectionIceEvent>(this.roomService.peerConnection, 'icecandidate')
            .pipe(
                takeUntil(icecandidateFinished$),
                tap((event) => {
                    if (!event.candidate) {
                        icecandidateFinished$.next(true);
                    }
                }),
                reduce((prev, curr) => {
                    return [...prev, curr];
                }, [] as RTCPeerConnectionIceEvent[])
            )
            .subscribe({
                next: async (data) => {
                    log(`Saving RTCPeerConnectionIceEvents to db ${data.length}`);

                    console.log('RTCPeerConnectionIceEvent DATA: ', data);
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    const callee: RTCIceCandidateInit[] = data.map((x) => x.candidate!.toJSON());
                    await firstValueFrom(this.roomService.addCallee(roomId, callee));
                    log('RTCPeerConnectionIceEvents saved to db.');
                },
                error: (error) => {
                    log('RTCPeerConnectionIceEvent ERROR ');
                },
                complete: () => {
                    log('RTCPeerConnectionIceEvent COMPLETE: ');
                }
            });

        fromEvent<RTCTrackEvent>(this.roomService.peerConnection, 'track').subscribe((event) => {
            log('a remote track received.');
            event.streams[0].getTracks().forEach((track) => {
                this.roomService.remoteStream.addTrack(track);
            });
        });

        {
            const room: RoomModel = rooms[roomId];

            // Code for creating SDP answer below
            const offer = room.offer;

            await this.roomService.peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
            log('RTCSessionDescription is set.');

            const answer = await this.roomService.peerConnection.createAnswer();
            log('Answer is created.');
            await this.roomService.peerConnection.setLocalDescription(answer);
            log('LocalDescription is set.');

            await firstValueFrom(
                this.roomService.addAnswer(room.id, {
                    type: answer.type,
                    sdp: answer.sdp
                })
            );
            log('Answer is saved to db.');
        }

        {
            this.socketService.rooms$.subscribe(async (rooms) => {
                const room = rooms[roomId];

                const callerCandidates = room.callerCandidates.map((item) => {
                    return this.roomService.peerConnection.addIceCandidate(new RTCIceCandidate(item));
                });

                // eslint-disable-next-line no-empty
                for await (const contents of callerCandidates) {
                }
                log(`callerCandidates: new IceCandidates added. (${callerCandidates.length})`);
            });
        }
    }
}
