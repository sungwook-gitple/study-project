import { AfterViewChecked, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MyMqttClientImpl } from 'src/mqtt/mqtt';
import { CHATTING_TOPIC } from './constants';
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
      id: '1',
      roomId: '1234',
      name: '디카프리오',
      message: '안녕하세요.adajfaldsjfalsjfadajfaldsjfalsjfadajfaldsjfalsjfadajfaldsjfalsjfadajfaldsjfalsjfadajfaldsjfalsjfadajfaldsjfalsjf',
      createdAt: new Date(),
      createdBy: '1234',
      isTransferred: true,
    },
    {
      id: '2',
      roomId: '1234',
      name: '김성욱',
      message: '안녕하세요.',
      createdAt: new Date(),
      createdBy: '9',
      isTransferred: true,
    },
    {
      id: '3',
      roomId: '1234',
      name: '디카프리오',
      message: '날씨가 좋네요.',
      createdAt: new Date(),
      createdBy: '1234',
      isTransferred: true,
    },
    {
      id: '4',
      roomId: '1234',
      name: '김성욱',
      message: '점심 잘 드렸나요?',
      createdAt: new Date(),
      createdBy: '9',
      isTransferred: true,
    },
    {
      id: '5',
      roomId: '1234',
      name: '도배꾼',
      message: '사라져라',
      createdAt: new Date(),
      createdBy: '1234',
      isTransferred: true,
    },
    {
      id: '6',
      roomId: '1234',
      name: '도배꾼',
      message: '사라져라',
      createdAt: new Date(),
      createdBy: '1234',
      isTransferred: true,
    },
    {
      id: '7',
      roomId: '1234',
      name: '도배꾼',
      message: '사라져라',
      createdAt: new Date(),
      createdBy: '1234',
      isTransferred: true,
    },
    {
      id: '8',
      roomId: '1234',
      name: '도배꾼',
      message: '사라져라',
      createdAt: new Date(),
      createdBy: '1234',
      isTransferred: true,
    },
    {
      id: '9',
      roomId: '1234',
      name: '도배꾼',
      message: '사라져라',
      createdAt: new Date(),
      createdBy: '1234',
      isTransferred: true,
    },
  ];

  @ViewChild('message', {
    static: true
  })
  messageRef: ElementRef;

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
    elementRef: ElementRef
  ) {
    this.messageRef = elementRef;
  }

  leaveRoom(): void {
    throw new Error('Method not implemented.');
  }

  isMe(createdBy: string): boolean {
    return this.userId === createdBy;
  }

  ngAfterViewChecked(): void {
    this.chatElement = document.querySelector('.chat-container__chat');
    this.chatElement.scrollTop = this.chatElement.scrollHeight;
  }

  ngOnChanges(changes: SimpleChanges): void {

    const currentRoomId = changes.currentRoomId.currentValue;
    if (currentRoomId !== changes.currentRoomId.previousValue) {

      this.chattingMqttClient.subscribeRoom(currentRoomId, payload => {
        this.setChat(payload);
      });
    }
  }

  ngOnInit() { }

  setChat(chat: Chat) {

    if (this.isMe(chat.createdBy)) {
      this.updateTransferred();
      return;
    }
    this.chats.push(chat);
    console.log('chats', this.chats);

    this.chatElement.scrollTop = this.chatElement.scrollHeight;
  }

  updateTransferred() {
    console.log('updateMyMessage');
  }

  sendMessage(message) {
    const chat: Chat = {
      name: this.userId,
      createdBy: this.userId,
      createdAt: new Date(),
      message,
      roomId: this.currentRoomId,
      isTransferred: false,
    };
    this.chats.push(chat);

    this.chattingMqttClient.publish(`${CHATTING_TOPIC}/${this.currentRoomId}`, chat);
  }

  onKeypress(key) {
    if (key.code === 'Enter') {
      this.sendMessage(this.messageRef.nativeElement.value);
    }
  }

}
