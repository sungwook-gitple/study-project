import { AfterViewChecked, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MyMqttClientImpl } from 'src/mqtt/mqtt';
import { Chat, IChatComponent } from './types';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements IChatComponent, OnInit, OnChanges, AfterViewChecked {

  // tslint:disable-next-line: variable-name
  private _currentRoomId?: string;
  chats: Chat[] = [
    {
      roomId: '1234',
      name: '디카프리오',
      message: '안녕하세요.adajfaldsjfalsjfadajfaldsjfalsjfadajfaldsjfalsjfadajfaldsjfalsjfadajfaldsjfalsjfadajfaldsjfalsjfadajfaldsjfalsjf',
      createdAt: new Date(),
      createdBy: '1234'
    },
    {
      roomId: '1234',
      name: '김성욱',
      message: '안녕하세요.',
      createdAt: new Date(),
      createdBy: '9'
    },
    {
      roomId: '1234',
      name: '디카프리오',
      message: '날씨가 좋네요.',
      createdAt: new Date(),
      createdBy: '1234'
    },
    {
      roomId: '1234',
      name: '김성욱',
      message: '점심 잘 드렸나요?',
      createdAt: new Date(),
      createdBy: '9'
    },
    {
      roomId: '1234',
      name: '도배꾼',
      message: '사라져라',
      createdAt: new Date(),
      createdBy: '1234'
    },
    {
      roomId: '1234',
      name: '도배꾼',
      message: '사라져라',
      createdAt: new Date(),
      createdBy: '1234'
    },
    {
      roomId: '1234',
      name: '도배꾼',
      message: '사라져라',
      createdAt: new Date(),
      createdBy: '1234'
    },
    {
      roomId: '1234',
      name: '도배꾼',
      message: '사라져라',
      createdAt: new Date(),
      createdBy: '1234'
    },
    {
      roomId: '1234',
      name: '도배꾼',
      message: '사라져라',
      createdAt: new Date(),
      createdBy: '1234'
    },
  ];
  message: string;
  userId = '9';

  chatElement: HTMLElement;
  // chattings: Chatting[] = [];

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

  isMe(createdBy: string): boolean {
    return this.userId === createdBy;
  }

  ngAfterViewChecked(): void {
    this.chatElement = document.querySelector('.chat-container__chat');
    console.log('=== ngAfterViewChecked', this.chatElement.scrollHeight);
    this.chatElement.scrollTop = this.chatElement.scrollHeight;
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

  setChat(chat: Chat) {

    this.chats.push(chat);
    console.log('chats', this.chats);

    console.log('=== scrollHeight', this.chatElement.scrollHeight);
    this.chatElement.scrollTop = this.chatElement.scrollHeight;
  }

}
