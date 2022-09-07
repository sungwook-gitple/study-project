import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class EventBus extends EventEmitter<{ ENTER_ROOM: any }> {
  
}