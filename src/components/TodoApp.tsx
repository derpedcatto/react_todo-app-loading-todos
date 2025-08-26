import React from 'react';
import { Todo } from '../types/Todo';
import { TodoHeader } from './TodoHeader';
import { TodoList } from './TodoList';
import { TodoFooter } from './TodoFooter';
import { FilterStatus } from '../types/FilterStatus';

type Props = {
  filteredTodos: Todo[];
  allTodos: Todo[];
  todosLeft: number;
  isAllTodosCompleted: boolean;
  filterStatus: FilterStatus;
  onFilterChange: (status: FilterStatus) => void;
};

export const TodoApp: React.FC<Props> = ({
  filteredTodos,
  allTodos,
  todosLeft,
  isAllTodosCompleted,
  filterStatus,
  onFilterChange,
}) => {
  return (
    <div className="todoapp__content">
      <TodoHeader
        isTodosListEmpty={filteredTodos.length === 0}
        isAllTodosCompleted={isAllTodosCompleted}
      />

      {allTodos.length > 0 && (
        <>
          <TodoList todos={filteredTodos} />

          <TodoFooter
            todosLeft={todosLeft}
            filterStatus={filterStatus}
            onFilterChange={onFilterChange}
          />
        </>
      )}
    </div>
  );
};
