import { FilterStatus } from '../types/FilterStatus';
import { TodoFilter } from './TodoFilter';

type Props = {
  todosLeft: number;
  filterStatus: FilterStatus;
  onFilterChange: (status: FilterStatus) => void;
};

export const TodoFooter: React.FC<Props> = ({
  todosLeft,
  filterStatus,
  onFilterChange,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todosLeft} items left
      </span>

      <TodoFilter filterStatus={filterStatus} onFilterChange={onFilterChange} />

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};
