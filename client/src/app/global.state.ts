import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GlobalState } from './types';

@Injectable()
export class GlobalStateService {

  static SET_CURRENT_ROOM_ID_ACTION = 'SET_CURRENT_ROOM_ID';
  subject: BehaviorSubject<GlobalState>;

  constructor(@Inject('initState') initState?: GlobalState) {

    this.subject = new BehaviorSubject({
      ...initState
    });
  }

  setCurrentRoomId(id: string) {
    this.dispatchAction(GlobalStateService.SET_CURRENT_ROOM_ID_ACTION, id);
  }

  dispatchAction(action: string, value) {

    switch (action) {
      case GlobalStateService.SET_CURRENT_ROOM_ID_ACTION:
        this.subject.next({
          ...this.subject.value,
          currentRoomId: value
        });
    }

  }

  subscribe(cb: (state: GlobalState) => void) {
    return this.subject.subscribe(cb);
  }

  setUnAuthorized() {
    this.subject.next({
      ...this.subject.value,
      isUnauthorized: true,
    });
  }
}
