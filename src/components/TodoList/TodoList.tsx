"use client";
import React, { FormEvent, useRef } from "react";
import TodoCard from "../TodoCard/TodoCard";
import { useStore } from "../../store/todoStore";
import useSWR from "swr";
import { getTodos, removeTodo, updateTodo } from "@/app/api/todosApi";
import {
  addMutation as addTodo,
  addTodoMutationOptions,
} from "@/swrMutations/todosMutations";
import toast from "react-hot-toast";

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

const cacheKey = "/todos";

const TodoList: React.FC = () => {
  const notificateSuccess = () =>
    toast.success("Successfully added a new todo!", { duration: 4000 });

  const notificateError = (err: string) =>
    toast.error("error on creating todo:\n" + err, { duration: 4000 });

  const formRef = useRef<HTMLFormElement>(null);

  const { setTodos, todos } = useStore();

  const { isLoading, error, data, mutate } = useSWR(cacheKey, getTodos, {
    refreshInterval: 0,
    revalidate: false,
    rollbackOnError: true,
    onSuccess: (data) => {
      const sortedTodos = data.sort(
        (a: Todo, b: Todo) => Number(b.id) - Number(a.id),
      );
      setTodos(sortedTodos);
    },
  });

  const handleAddNewTodo = async (e: FormEvent) => {
    const tempId = Date.now();
    e.preventDefault();
    const todoText: string = formRef?.current?.newTodoText?.value;
    const postData: Todo = {
      text: todoText,
      completed: false,
      id: Number(tempId),
    };
    try {
      await mutate(
        addTodo(postData, todos),
        addTodoMutationOptions(postData, todos),
      );
      notificateSuccess();
    } catch (err: string | any) {
      notificateError(err);
    }
    if (formRef.current !== null) {
      formRef.current.newTodoText.value = "";
    }
  };

  const handleRemoveTodo = (id: number): void => {
    removeTodo(id)
      .then((res) => {
        mutate(todos);
      })
      .catch((err) => err);
  };

  const handleUpdateTodo = (todo: Todo): void => {
    updateTodo(todo)
      .then((res) => {
        mutate(todos, { optimisticData: true });
      })
      .catch((err) => err);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6">Todo List</h1>
      <form className="mb-4" ref={formRef}>
        <div className="inline-flex">
          <input
            type="text"
            name="newTodoText"
            placeholder="Add a new todo..."
            className="input input-bordered w-full max-w-xs mr-2 inline-block"
          />
          <button
            onClick={handleAddNewTodo}
            className="btn btn-success inline-block"
          >
            Add
          </button>
        </div>
      </form>
      <div>
        <ul>
          {isLoading ? (
            "...Loading"
          ) : error ? (
            <div>ERROR: {error}</div>
          ) : (
            todos?.map((todo: Todo) => (
              <TodoCard
                key={todo.id}
                todo={todo}
                onRemove={handleRemoveTodo}
                onUpdate={handleUpdateTodo}
                mutate={mutate}
              />
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
