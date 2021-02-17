import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { connect, ConnectedProps, Provider, useSelector } from 'react-redux';

import { store, TState } from './redux';

const Item = React.memo(({ id }: { id: string }) => {
  console.log(`<Item id=${id}/> renders`);

  const name = useSelector((st: TState): string => {
    console.log(`Item's selector for ${id}, st=%o`, st.data);
    return st.data[id].name;
  });

  useEffect(() => () => console.log(`Unmount item id=${id}`), []);

  return React.createElement('div', {}, `Name: ${name}`);
});

type TProps = ConnectedProps<typeof withRedux>;
function App({ keys, remove }: TProps) {
  console.log('<App/> render %o', keys);

  return React.createElement('div', { className: 'App' }, [
    keys.map(key => React.createElement(Item, { key: key, id: key })),
    React.createElement('div'),
    React.createElement('button', { onClick: remove }, 'delete B'),
  ]);
}

const withRedux = connect(
  // state
  (st: TState) => ({ keys: Object.keys(st.data) }),
  // actions
  { remove: () => ({ type: 'RM', key: 'b' }) }
);
const AppWithRedux = withRedux(App);

document.body.appendChild(
  Object.assign(document.createElement('div'), { id: 'root' })
);
const rootElement = document.getElementById('root');
ReactDOM.render(
  React.createElement(Provider, { store }, React.createElement(AppWithRedux)),
  rootElement
);
