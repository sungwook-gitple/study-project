import { Component } from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';

  currentRoomId;

  constructor() {
    setTheme('bs4');
  }

  setCurrentRoomId(event: { roomId: string }) {
    console.log('== testEvent', event);
    this.currentRoomId = event.roomId;
  }
}
