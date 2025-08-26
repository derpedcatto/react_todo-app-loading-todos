/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { TodoApp } from './components/TodoApp';
import { ErrorMessage } from './types/ErrorMessage';
import { FilterStatus } from './types/FilterStatus';
import { ErrorNotification } from './components/ErrorNotification';

const prepareTodos = (todos: Todo[], filterStatus: FilterStatus): Todo[] => {
  return todos.filter(todo => {
    switch (filterStatus) {
      case FilterStatus.Active:
        return !todo.completed;

      case FilterStatus.Completed:
        return todo.completed;

      case FilterStatus.All:
        return true;
    }
  });
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | null>(null);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>(
    FilterStatus.All,
  );

  const filteredTodos = useMemo(() => {
    return prepareTodos(todos, filterStatus);
  }, [todos, filterStatus]);

  const todosLeft = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  const isAllTodosCompleted = useMemo(() => {
    return todos.length > 0 && todos.every(todo => todo.completed);
  }, [todos]);

  const isHasCompletedTodos = useMemo(() => {
    return todos.some(todo => todo.completed);
  }, [todos]);

  const handleLoadTodos = async () => {
    setErrorMessage(null);

    try {
      const apiTodos = await getTodos();

      setTodos(apiTodos);
    } catch (error) {
      setErrorMessage(ErrorMessage.UnableToLoadTodos);
    }
  };

  useEffect(() => {
    handleLoadTodos();
  }, []);

  useEffect(() => {
    if (!errorMessage) {
      return;
    }

    const timer = setTimeout(() => {
      setErrorMessage(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [errorMessage]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <TodoApp
        filteredTodos={filteredTodos}
        allTodos={todos}
        todosLeft={todosLeft}
        isAllTodosCompleted={isAllTodosCompleted}
        isHasCompletedTodos={isHasCompletedTodos}
        filterStatus={filterStatus}
        onFilterChange={setFilterStatus}
      />

      <ErrorNotification
        errorMessage={errorMessage}
        onHideErrorButtonClick={() => setErrorMessage(null)}
      />
    </div>
  );
};
