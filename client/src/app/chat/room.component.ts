import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MyMqttClientImpl } from 'src/mqtt/mqtt';
import { Chatting } from './types';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit, OnChanges {

  // tslint:disable-next-line: variable-name
  private _currentRoomId?: string;
  message: string;

  chattings: Chatting[] = [];

  @Input()
  set currentRoomId(id) {
    this._currentRoomId = id;
  }

  get currentRoomId() {
    return this._currentRoomId;
  }

  constructor(
    private chattingMqttClient: MyMqttClientImpl,
  ) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    const currentRoomId = changes.currentRoomId.currentValue;
    if (currentRoomId !== changes.currentRoomId.previousValue) {
      this.chattingMqttClient.subscribeRoom(currentRoomId, message => {
        this.setChat(message);
      });
    }
  }

  ngOnInit() { }

  loadChat(id: string) {

    this.chattingMqttClient.subscribeRoom(id, this.setChat.bind(this));
  }

  setChat(chat: Chatting) {

    this.message = chat.message;
  }

}
