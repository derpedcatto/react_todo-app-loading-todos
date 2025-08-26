import React from 'react';
import classNames from 'classnames';
import { NewTodoForm } from './NewTodoForm';

type Props = {
  isTodosListEmpty: boolean;
  isAllTodosCompleted: boolean;
};

export const TodoHeader: React.FC<Props> = ({
  isTodosListEmpty,
  isAllTodosCompleted,
}) => {
  return (
    <header className="todoapp__header">
      {!isTodosListEmpty && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: isAllTodosCompleted,
          })}
          data-cy="ToggleAllButton"
        />
      )}

      <NewTodoForm />
    </header>
  );
};
