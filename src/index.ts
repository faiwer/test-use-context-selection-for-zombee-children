import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { createContext, useContextSelection } from './lib';

type TState = Record<string, { name: string }>;
const context = createContext<TState>({});

const Item = React.memo(({ id }: { id: string }) => {
  console.log(`<Item id=${id}/> renders`);

  const name = useContextSelection(context, (st): string => {
    console.log(`Item's selector for ${id}, st=%o`, st);
    return st[id].name;
    // return st[id]?.name || 'it will work with this workaround';
  });

  useEffect(() => () => console.log(`Unmount item id=${id}`), []);

  return React.createElement('div', {}, `Name: ${name}`);
});

function App() {
  const [items, setItems] = useState<TState>({
    a: { name: 'A' },
    b: { name: 'B' },
    c: { name: 'C' },
  });

  const onDelete = () =>
    setItems(({ b, ...prev }) => {
      console.log('delete B');
      return prev;
    });

  console.log('<App/> render %o', items);

  return React.createElement('div', { className: 'App' }, [
    React.createElement(
      context.Provider,
      { value: items },
      Object.keys(items).map(key =>
        React.createElement(Item, { key: key, id: key })
      )
    ),
    React.createElement('div'),
    React.createElement('button', { onClick: onDelete }, 'delete B'),
  ]);
}

document.body.appendChild(
  Object.assign(document.createElement('div'), { id: 'root' })
);
const rootElement = document.getElementById('root');
ReactDOM.render(React.createElement(App), rootElement);
