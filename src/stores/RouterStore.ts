import { History } from 'history';
import {
  RouterStore as BaseRouterStore,
  syncHistoryWithStore
} from 'mobx-react-router';
import { injectable } from 'inversify';
import { inject, provide, TYPES } from './ioc';

const injectableMobxRouterStore: typeof BaseRouterStore = injectable()(
  BaseRouterStore
);

@provide(TYPES.RouterStore)
export class RouterStore extends injectableMobxRouterStore {
  public history: ReturnType<typeof syncHistoryWithStore>;

  constructor(@inject(TYPES.History) history?: History) {
    super();
    if (history) {
      this.history = syncHistoryWithStore(history, this);
    }
  }
}

export default RouterStore;
