import type { User } from 'firebase/auth';
import { action, autorun, makeObservable, observable } from 'mobx';

import type { Action, State } from '../state/ChatContext';

class ChatStore {
  @observable
  state: State = {
    chatId: 'null',
    user: null,
  };

  constructor() {
    makeObservable(this);
    autorun(() => {
      console.log(this.state, 'this is autorun');
    });
  }

  @action
  dispatch(payload: Action['payload'], currentUser: User) {
    if (currentUser) {
      this.state = {
        chatId: currentUser.uid > payload.uid ? currentUser.uid + payload.uid : payload.uid + currentUser.uid,
        user: payload,
      };
    }
  }
}

export const chatStore = new ChatStore();
