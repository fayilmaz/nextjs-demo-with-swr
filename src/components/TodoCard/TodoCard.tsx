"use client";
import { useState } from "react";
import { Todo } from "../TodoList/TodoList";
import { updateTodo } from "@/app/api/todosApi";
import { ModeEnums } from "@/enums";

interface TodoCardProps {
  todo: Todo;
  onRemove: (todo: Todo) => void;
  onUpdate: (updatedTodo: Todo) => void;
  mutate: () => void;
  deleteButtonDisabled?: boolean;
}

const TodoCard: React.FC<TodoCardProps> = ({
  todo,
  onRemove,
  onUpdate,
  mutate,
  deleteButtonDisabled,
}) => {
  const [mode, setMode] = useState(ModeEnums.View);

  const handleEditTodo = () => {
    setMode(ModeEnums.Edit);
  };

  const handleEditModeTodoUpdate = () => {};

  const handleBlur = () => {
    setMode(ModeEnums.View);
  };

  const handleToggleComplete = () => {
    const editedTodo = { ...todo, completed: !todo.completed };
    updateTodo(editedTodo).then((res) => mutate());
  };

  return (
    <li className="flex items-center justify-between p-2 bg-white rounded shadow mb-2">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggleComplete}
        className="checkbox mr-2"
      />
      {/* {mode === ModeEnums.Edit ? ( // TODO: add edit feature properly
        <input
          type="text"
          name="todoEditText"
          placeholder="Add a new todo..."
          className="input input-bordered w-full max-w-xs mr-2 inline-block"
        />
      ) : ( */}
      <span
        className={`text-black px-6 py-2 ${
          todo.completed ? "line-through" : ""
        }`}
        onClick={handleEditTodo}
      >
        {todo.text}
      </span>
      {/* )} */}

      <button
        className="btn btn-primary btn-sm btn-error"
        onClick={() => onRemove(todo)}
        disabled={deleteButtonDisabled}
      >
        Delete
      </button>
    </li>
  );
};

TodoCard.defaultProps = {
  deleteButtonDisabled: false,
};

export default TodoCard;
