import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';

  currentRoomId;

  setCurrentRoomId(event: { roomId: string }) {
    console.log('== testEvent', event);
    this.currentRoomId = event.roomId;
  }
}
