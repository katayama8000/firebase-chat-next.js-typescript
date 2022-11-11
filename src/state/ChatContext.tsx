import type { User } from 'firebase/auth';
import type { FC } from 'react';
import { createContext, useContext, useReducer } from 'react';

import { AuthContext } from './AuthContext';

export type PickedUserType = Pick<User, 'displayName' | 'photoURL' | 'uid'>;

type Action = {
  payload: PickedUserType;
  type: 'CHANGE_USER' | string;
};

type ChatContextProps = {
  data: {
    chatId: string | null;
    user: PickedUserType | null;
  };
  dispatch: React.Dispatch<Action>;
};

type ProviderProps = {
  children: React.ReactNode;
};

export type State = {
  chatId: string | null;
  user: PickedUserType | null;
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

export const ChatContextProvider: FC<ProviderProps> = ({ children }) => {
  const { currentUser } = useContext(AuthContext) as { currentUser: User };

  const INITIAL_STATE = {
    chatId: 'null',
    user: null,
  };

  const chatReducer = (state: State, action: Action) => {
    switch (action.type) {
      case 'CHANGE_USER':
        return {
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
          user: action.payload,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return <ChatContext.Provider value={{ data: state, dispatch }}>{children}</ChatContext.Provider>;
};
