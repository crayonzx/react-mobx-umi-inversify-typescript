import 'reflect-metadata';

import { Container, interfaces, inject } from 'inversify';
import { makeFluentProvideDecorator } from 'inversify-binding-decorators';
import { default as getDecorators } from 'inversify-inject-decorators';

const container = new Container();

/** Lazy inject */
const { lazyInject } = getDecorators(container);

const fluentProvide = makeFluentProvideDecorator(container);

/** Singleton provide */
const provide = (identifier: interfaces.ServiceIdentifier<any>) => {
  return fluentProvide(identifier)
    .inSingletonScope()
    .done();
};

const TYPES = {
  DefaultTodos: Symbol.for('DefaultTodos'),
  History: Symbol.for('History'),

  RouterStore: Symbol.for('RouterStore'),
  TodoStore: Symbol.for('TodoStore')
};

export { container, inject, lazyInject, provide, TYPES };
