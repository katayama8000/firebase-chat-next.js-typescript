import type { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { action, autorun, computed, makeObservable, observable } from 'mobx';
import router from 'next/router';

import { auth } from '../lib/firebase/firebase';

class AuthStore {
  @observable
  user: { currentUser: User | null } = { currentUser: null };

  constructor() {
    makeObservable(this);
    autorun(() => {
      console.log(this.user);
    });
  }

  @action
  setUser(user: User) {
    this.user.currentUser = user;
  }

  @computed
  get getUser() {
    onAuthStateChanged(auth, (user) => {
      console.log(user, 'ここが見たい2');
      if (user) {
        this.setUser(user);
      } else {
        if (router.pathname !== '/Login' && router.pathname !== '/Register') {
          router.push('/Login');
        }
      }
    });
    return this.user;
  }
}

export const authStore = new AuthStore();
