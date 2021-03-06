import * as React from 'react';
import * as style from './style.css';
import { observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import { Header } from '~/components/Header';
import { TodoList } from '~/components/TodoList';
import { Footer } from '~/components/Footer';
import { lazyInject, TYPES, TodoStore, RouterStore } from '~/stores';
import { TODO_FILTER_LOCATION_HASH, TodoFilter } from '~/constants';

export interface TodoAppProps extends RouteComponentProps<any> {}

export interface TodoAppState {
  filter: TodoFilter;
}

@observer
export class TodoApp extends React.Component<TodoAppProps, TodoAppState> {
  @lazyInject(TYPES.TodoStore) private todoStore: TodoStore;
  @lazyInject(TYPES.RouterStore) private routerStore: RouterStore;

  constructor(props: TodoAppProps, context: any) {
    super(props, context);
    this.state = { filter: TodoFilter.ALL };
  }

  componentWillMount() {
    this.checkLocationChange();
  }

  componentWillReceiveProps(nextProps: TodoAppProps, nextContext: any) {
    this.checkLocationChange();
  }

  checkLocationChange() {
    const router = this.routerStore;
    const filter = Object.keys(TODO_FILTER_LOCATION_HASH)
      .map((key) => Number(key) as TodoFilter)
      .find(
        (filter) => TODO_FILTER_LOCATION_HASH[filter] === router.location.hash
      );
    this.setState({ filter });
  }

  private handleFilter = (filter: TodoFilter) => {
    const router = this.routerStore;
    const currentHash = router.location.hash;
    const nextHash = TODO_FILTER_LOCATION_HASH[filter];
    if (currentHash !== nextHash) {
      router.replace(nextHash);
    }
  };

  getFilteredTodo(filter: TodoFilter) {
    const todoStore = this.todoStore;
    switch (filter) {
      case TodoFilter.ACTIVE:
        return todoStore.activeTodos;
      case TodoFilter.COMPLETED:
        return todoStore.completedTodos;
      default:
        return todoStore.todos;
    }
  }

  render() {
    const todoStore = this.todoStore;
    const { children } = this.props;
    const { filter } = this.state;
    const filteredTodos = this.getFilteredTodo(filter);

    const footer = todoStore.todos.length && (
      <Footer
        filter={filter}
        activeCount={todoStore.activeTodos.length}
        completedCount={todoStore.completedTodos.length}
        onClearCompleted={todoStore.clearCompleted}
        onChangeFilter={this.handleFilter}
      />
    );

    return (
      <div className={style.normal}>
        <Header addTodo={todoStore.addTodo} />
        <TodoList
          todos={filteredTodos}
          completeAll={todoStore.completeAll}
          deleteTodo={todoStore.deleteTodo}
          editTodo={todoStore.editTodo}
        />
        {footer}
        {children}
      </div>
    );
  }
}

export default TodoApp;
