import { Component, OnInit } from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils';
import { getAuthorizationToken, getUser } from './authenticated/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client';

  currentRoomId;

  constructor() {
    setTheme('bs4');
  }

  ngOnInit(): void {
    const token = getAuthorizationToken();
    const user = getUser();

  }

  setCurrentRoomId(event: { roomId: string }) {
    console.log('== testEvent', event);
    this.currentRoomId = event.roomId;
  }


}
