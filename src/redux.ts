import { createStore, Action } from 'redux';

export type TState = { data: Record<string, { name: string }> };
const defaultState = {
  data: {
    a: { name: 'a' },
    b: { name: 'b' },
    c: { name: 'c' },
  },
};

type TRmAction = { type: 'RM'; key: string };

const reducer = (st: TState = defaultState, action: Action) => {
  switch (action.type) {
    case 'RM':
      const data = { ...st.data };
      const key = (action as TRmAction).key;
      delete data[key];
      console.log(`reducer: delete ${key}`);
      return { data };
  }

  return st;
};
export const store = createStore(reducer);
