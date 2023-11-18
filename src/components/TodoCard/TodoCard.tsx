"use client";
import { useState } from "react";
import { Todo } from "../TodoList/TodoList";
import { updateTodo } from "@/app/api/todosApi";

interface TodoCardProps {
  todo: Todo;
  onRemove: (id: number) => void;
  onUpdate: (updatedTodo: Todo) => void;
  mutate: () => void;
}

const modeEnums = {
  VIEW: "VIEW",
  EDIT: "EDIT",
};

const TodoCard: React.FC<TodoCardProps> = ({
  todo,
  onRemove,
  onUpdate,
  mutate,
}) => {
  const [mode, setMode] = useState(modeEnums.VIEW);

  const handleEditTodo = () => {
    setMode(modeEnums.EDIT);
  };

  const handleEditModeTodoUpdate = () => {};

  const handleBlur = () => {
    setMode(modeEnums.VIEW);
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
      {mode === modeEnums.EDIT ? (
        <input
          type="text"
          name="todoEditText"
          placeholder="Add a new todo..."
          className="input input-bordered w-full max-w-xs mr-2 inline-block"
        />
      ) : (
        <span
          className={`text-black px-6 py-2 ${
            todo.completed ? "line-through" : ""
          }`}
          onClick={handleEditTodo}
        >
          {todo.text}
        </span>
      )}

      <button
        className="btn btn-primary btn-sm btn-error"
        onClick={() => onRemove(todo.id)}
      >
        Delete
      </button>
    </li>
  );
};

export default TodoCard;
