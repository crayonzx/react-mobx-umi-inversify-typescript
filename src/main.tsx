import * as React from 'react';
import { configure } from 'mobx';
import { History } from 'history';
import { TodoModel } from '~/models';
import { container, TYPES } from '~/stores';
import { Root } from '~/containers/Root';

// enable MobX strict mode
configure({
  // 'observed' or true is recommanded in mobx docs
  // see https://github.com/mobxjs/mobx/blob/gh-pages/docs/refguide/api.md#enforceactions
  enforceActions: 'always' // = 'strict'
});

// default fixtures for TodoStore
container
  .bind<any>(TYPES.DefaultTodos)
  .toConstantValue([
    new TodoModel('Use Mobx'),
    new TodoModel('Use React', true)
  ]);

// global history for RouterStore
container.bind<History>(TYPES.History).toConstantValue(window.g_history);

// render react DOM
export default (({ children }) => {
  return <Root>{children}</Root>;
}) as React.SFC;

declare global {
  interface Window {
    g_history: History;
  }
}
