import type { User } from 'firebase/auth';
import type { FC } from 'react';
import { createContext, useContext, useReducer } from 'react';

import { AuthContext } from './AuthContext';

type Action = {
  payload: Pick<User, 'displayName' | 'photoURL' | 'uid'>;
  type: 'CHANGE_USER' | string;
};

type ChatContextProps = {
  data: {
    chatId: string | null;
    user: Pick<User, 'displayName' | 'photoURL' | 'uid'> | null;
  };
  dispatch: React.Dispatch<Action>;
};

export const ChatContext = createContext<ChatContextProps>({
  data: {
    chatId: '',
    user: {
      displayName: '',
      photoURL: '',
      uid: '',
    },
  },
  dispatch: () => {
    return null;
  },
});

type ProviderProps = {
  children: React.ReactNode;
};

export const ChatContextProvider: FC<ProviderProps> = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser, 'currentUser333');
  const INITIAL_STATE = {
    chatId: 'null',
    user: null,
  };

  type State = {
    chatId: string | null;
    user: Pick<User, 'displayName' | 'photoURL' | 'uid'> | null;
  };

  const chatReducer = (state: State, action: Action) => {
    console.log(action, 'action', state, 'state', 'こここここここここ');

    switch (action.type) {
      case 'CHANGE_USER':
        return {
          chatId:
            currentUser!.uid > action.payload.uid
              ? currentUser!.uid + action.payload.uid
              : action.payload.uid + currentUser!.uid,
          user: action.payload,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
  console.log(state, 'stateaaaaaaaaaaaaaaaaaaaaaaaaaaa');

  return <ChatContext.Provider value={{ data: state, dispatch }}>{children}</ChatContext.Provider>;
};
