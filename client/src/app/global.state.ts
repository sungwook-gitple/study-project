import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GlobalState } from './types';

@Injectable()
export class GlobalStateReducer {

  static SET_CURRENT_ROOM_ID_ACTION = 'SET_CURRENT_ROOM_ID';
  subject: BehaviorSubject<GlobalState>;
  // model: Observable<any>;
  model: GlobalState;

  constructor(@Inject('initState') initState?: GlobalState) {

    const defaultInitState = {};
    this.model = initState || defaultInitState;

    this.subject = new BehaviorSubject({ currentRoomId: null });
    // this.model = this.subject.asObservable();
  }

  setCurrentRoomId(id: string) {
    this.dispatchAction(GlobalStateReducer.SET_CURRENT_ROOM_ID_ACTION, id);
  }
  getCurrentRoomId() {

  }

  dispatchAction(action: string, value) {

    switch (action) {
      case GlobalStateReducer.SET_CURRENT_ROOM_ID_ACTION:
        this.subject.next({
          ...this.model,
          currentRoomId: value
        });
    }

    console.log('== this.model', this.model);
  }

  subscribe(cb) {
    return this.subject.subscribe(cb);
  }
}
