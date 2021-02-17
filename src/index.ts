import React, { useLayoutEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { connect, ConnectedProps, Provider, useSelector } from 'react-redux';

import { store, TState } from './redux';

const Item = React.memo(({ id }: { id: string }) => {
  console.log(`<Item id=${id}/> renders`);

  useLayoutEffect(() => () => {
    console.log(`Unmount item id=${id}`);
    setTimeout(() => console.log('TIMEOUT'), 0);
  }, []);

  const name = useSelector((st: TState): string => {
    console.log(`Item's selector for ${id}, st=%o`, st.data);
    try {
      return st.data[id].name;
    }
    catch(err) {
      console.error('got an error in the selector');
      throw err;
    }
  });

  return React.createElement('div', {}, `Name: ${name}`);
});

type TProps = ConnectedProps<typeof withRedux>;
function App({ remove }: TProps) {
  const keys = useSelector((st: TState) => Object.keys(st.data));
  console.log('<App/> render %o', keys);

  return React.createElement('div', { className: 'App' }, [
    keys.map(key => React.createElement(Item, { key: key, id: key })),
    React.createElement('div'),
    React.createElement('button', { onClick: remove }, 'delete B'),
  ]);
}

const withRedux = connect(
  null,
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
