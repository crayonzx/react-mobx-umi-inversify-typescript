import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import { createBrowserHistory } from 'history';
import { TodoModel } from '~/models';
import { createStores } from '~/stores';
import { App } from './App';

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
const history = createBrowserHistory();
const rootStore = createStores(history, defaultTodos);

// render react DOM
ReactDOM.render(
  <Provider {...rootStore}>
    <App history={history} />
  </Provider>,
  document.getElementById('root')
);
