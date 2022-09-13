import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { updateHttpAuthorization } from 'src/http/configOption';
import { getAuthorizationToken } from '../authenticated/util';
import { requestCreateRoom, requestEnterRoom, requestLeaveRoom, requestRoomList } from './request';
import { Room } from './types';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {

  rooms: Room[];
  currentRoomId: number;
  @Output()
  currentRoomEmitter = new EventEmitter<{ roomId: string }>();

  constructor(
    private router: Router
  ) { }

  async ngOnInit() {
    const token = await getAuthorizationToken();
    await updateHttpAuthorization(token);
    await this.loadRooms();
  }

  async handleCreateRoomClick() {
    const result = await requestCreateRoom('hahah');

    console.log('create room', result);
  }

  async loadRooms() {
    const result = await requestRoomList();

    if (!result) {
      return;
    }

    this.rooms = result;
  }

  async enterRoom(id) {
    if (this.currentRoomId !== id) {
      const result = await requestEnterRoom(id);

      if (!result) {
        return;
      }
    }

    this.currentRoomEmitter.emit({ roomId: id });

    this.router.navigateByUrl(`/chat/${id}`);
  }

  async leaveRoom(id) {

    const result = await requestLeaveRoom(id);

    if (result.result !== 'success') {
      console.error(result);
      return;
    }

    return result;
  }
}
