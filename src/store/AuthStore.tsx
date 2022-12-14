import type { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { action, computed, makeObservable, observable } from 'mobx';
import Router from 'next/router';

import { auth } from '../lib/firebase/firebase';

class AuthStore {
  @observable
  user: { currentUser: User | null } = { currentUser: null };

  constructor() {
    makeObservable(this);
  }

  @action
  setUser(user: User) {
    this.user.currentUser = user;
  }

  @computed
  get getUser() {
    onAuthStateChanged(auth, (user) => {
      if (user?.displayName) {
        this.setUser(user);
      } else {
        if (Router.pathname !== '/Login' && Router.pathname !== '/Register') {
          Router.push('/Login');
        }
      }
    });
    return this.user;
  }
}

export const authStore = new AuthStore();
