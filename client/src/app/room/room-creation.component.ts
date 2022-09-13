import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../authenticated/types';
import { getUser } from '../authenticated/util';
import { requestCreateRoom } from '../room-list/request';
import { RoomRequest } from '../room-list/types';

@Component({
  selector: 'app-room-creation',
  templateUrl: './room-creation.component.html',
  styleUrls: ['./room-creation.component.scss']
})
export class RoomCreationComponent implements OnInit {

  constructor(private readonly router: Router) { }

  @ViewChild('title', { static: false })
  title: ElementRef;

  user: User;

  handleCloseClick() {
    this.router.navigateByUrl('/rooms');
  }

  async handleRoomNameEnter(event: KeyboardEvent) {

    if (event.code === 'Enter') {
      if (!this.title) {
        console.error('no title', this.title);
        return;
      }

      await this.createRoom({
        title: this.title.nativeElement.value,
        createdBy: this.user.id,

      });

      this.router.navigateByUrl('/rooms');
    }
  }

  async createRoom(room: RoomRequest) {

    const result = await requestCreateRoom(room);

    if (result.result !== 'success') {
      console.error('방생성에 실패했습니다.');
      return;
    }

    return result;
  }

  ngOnInit() {
    this.user = getUser();
  }

}
