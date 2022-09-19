import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MyMqttClientImplV2 } from 'src/mqtt/mqttV2';
import { getUser } from '../authenticated/util';
import { GlobalStateService } from '../global.state';
import { requestLeaveRoom, requestRemoveRoom, requestRoomById } from '../room-list/request';
import { CHATTING_TOPIC } from './constants';
import { chatDummy } from './dummy';
import { requestChats } from './request';
import { Chat, IChatComponent } from './types';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements IChatComponent, OnInit, AfterViewChecked, OnDestroy {

  currentRoomId = '';
  roomName = '';
  chats: Chat[] = chatDummy;

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
  subscription: Subscription;
  userId: string;

  globalStateSubscriber: Subscription;

  constructor(
    private readonly chattingMqttClient: MyMqttClientImplV2,
    elementRef: ElementRef,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly globalState: GlobalStateService
  ) {
    this.messageRef = elementRef;
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async ngOnInit() {

    this.user = getUser();
    if (!this.user.id) {
      throw new Error('userId does not exist');
    }

    this.globalState.subscribe(value => {
      this.initChattingRoom(value.currentRoomId);
    });

    this.route.params.subscribe(async params => {

    });
  }

  async initChattingRoom(currentRoomId: string) {

    this.currentRoomId = currentRoomId;
    await this.loadChats(currentRoomId);

    const result = await requestRoomById(currentRoomId);

    if (result.result !== 'success') {
        console.error(result.message);
        return;
      }

    this.subscription = this.chattingMqttClient
      .setRoomId(this.currentRoomId)
      .subscribe(data => {
        const payloadStr = data.payload.toString();
        this.setChat(JSON.parse(payloadStr));
      });

    this.roomName = result.data.title;
  }

  async loadChats(currentRoomId: string) {

    const chatsResult = await requestChats(currentRoomId);
    if (chatsResult.result !== 'success') {
      console.error(chatsResult);
      return;
    }

    this.chats = chatsResult.data;
  }

  setChat(chat: Chat) {

    if (this.isMe(chat.createdBy)) {
      return;
    }

    this.chats.push(chat);

    this.chatElement.scrollTop = this.chatElement.scrollHeight;
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
