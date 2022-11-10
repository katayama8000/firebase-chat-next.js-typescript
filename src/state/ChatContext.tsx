import type { FC } from 'react';
import { createContext, useContext, useReducer } from 'react';

import { AuthContext } from './AuthContext';

export const ChatContext = createContext();

type Props = {
  children: React.ReactNode;
};

export const ChatContextProvider: FC<Props> = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser, 'currentUser333');
  const INITIAL_STATE = {
    chatId: 'null',
    user: {},
  };

  type Action = {
    payload: {
      uid: string;
    };
    type: 'CHANGE_USER' | string;
  };

  type State = {
    chatId: string;
    user: any;
  };

  const chatReducer = (state: State, action: Action) => {
    console.log(action, 'action', state, 'state', 'aaaaaaaaaa');

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
  console.log(state, 'state');

  return <ChatContext.Provider value={{ data: state, dispatch }}>{children}</ChatContext.Provider>;
};
