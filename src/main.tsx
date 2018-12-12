import * as React from 'react';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import { History } from 'history';
import { TodoModel } from '~/models';
import { createStores } from '~/stores';
import { Root } from '~/containers/Root';

// enable MobX strict mode
configure({
  // 'observed' is recommanded in mobx docs
  // see https://github.com/mobxjs/mobx/blob/gh-pages/docs/refguide/api.md#enforceactions
  enforceActions: 'strict'
});

// default fixtures for TodoStore
const defaultTodos = [
  new TodoModel('Use Mobx'),
  new TodoModel('Use React', true)
];

// prepare MobX stores
const rootStore = createStores(window.g_history, defaultTodos);

// render react DOM
export default (({ children }) => {
  return (
    <Provider {...rootStore}>
      <Root>{children}</Root>
    </Provider>
  );
}) as React.SFC;

declare global {
  interface Window {
    g_history: History;
  }
}
