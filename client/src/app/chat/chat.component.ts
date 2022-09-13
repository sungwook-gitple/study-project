import { AfterViewChecked, Component, ElementRef, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MyMqttClientImplV2 } from 'src/mqtt/mqttV2';
import { getUser } from '../authenticated/util';
import { requestLeaveRoom, requestRemoveRoom, requestRoomById } from '../room-list/request';
import { CHATTING_TOPIC } from './constants';
import { Chat, IChatComponent } from './types';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements IChatComponent, OnInit, AfterViewChecked {

  currentRoomId = '';
  roomName = '';

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

  user: {
    name: string;
    username?: string;
    id: string;
  };

  chatElement: HTMLElement;
  // chattings: Chatting[] = [];

  constructor(
    private readonly chattingMqttClient: MyMqttClientImplV2,
    elementRef: ElementRef,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {
    this.messageRef = elementRef;
  }
  userId: string;

  async handleSettingClick() {

  }

  async handleLeaveClick() {
    const result = await this.leaveRoom();
    if (result.result !== 'success') {
      console.error('cannot leave room');
      return;
    }

    this.router.navigateByUrl('/rooms');
  }

  async handleExplosionClick() {

    const result = await this.removeRoom();
    console.log('=== result', result);
    if (result.result !== 'success') {
      console.error('방 삭제에 실패했습니다.');
      return;
    }

    this.router.navigateByUrl('/rooms');
  }

  async handleGoToRoomListClick() {

    this.router.navigateByUrl('/rooms');
  }

  async leaveRoom() {
    if (!this.currentRoomId) {
      console.error('room id가 없습니다.');
      return {
        result: 'fail',
        message: 'room id가 없습니다.'
      };
    }
    return requestLeaveRoom(this.currentRoomId);
  }

  async removeRoom() {
    if (!this.currentRoomId) {
      console.error('room id가 없습니다.');
      return {
        result: 'fail',
        message: 'room id가 없습니다.'
      };
    }
    return requestRemoveRoom(this.currentRoomId);
  }

  isMe(createdBy: string): boolean {
    return this.user.id === createdBy;
  }

  ngAfterViewChecked(): void {
    this.chatElement = document.querySelector('.chat-container__chat');
    this.chatElement.scrollTop = this.chatElement.scrollHeight;
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit() {

    // this.user.id = getUserId();
    this.user = getUser();
    if (!this.user.id) {
      throw new Error('userId does not exist');
    }

    this.route.params.subscribe(async params => {

      this.currentRoomId = params.id;
      const result = await requestRoomById(this.currentRoomId);

      if (result.result !== 'success') {
        console.error(result.message);
        return;
      }

      this.roomName = result.data.title;

      const roomTopic = `${CHATTING_TOPIC}/${this.currentRoomId}`;
      this.chattingMqttClient.topic(roomTopic)
        .subscribe(data => {
          const payloadStr = data.payload.toString();
          this.setChat(JSON.parse(payloadStr));
        });
    });
  }

  setChat(chat: Chat) {

    if (this.isMe(chat.createdBy)) {
      this.updateTransferred();
      return;
    }

    this.chats.push(chat);

    this.chatElement.scrollTop = this.chatElement.scrollHeight;
  }

  updateTransferred() {
    console.log('updateMyMessage');
  }

  sendMessage(message) {
    const chat: Chat = {
      name: this.user.name,
      createdBy: this.user.id,
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
      this.messageRef.nativeElement.value = '';
    }
  }

}
