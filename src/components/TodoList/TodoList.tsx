"use client";
import React, { FormEvent, useRef } from "react";
import TodoCard from "../TodoCard/TodoCard";
import { useTodosStore } from "../../store/todoStore";
import useSWR from "swr";
import { getTodos } from "@/app/api/todosApi";
import {
  addMutation as addTodo,
  addTodoMutationOptions,
  deleteMutation as deleteTodo,
  deleteTodoMutationOptions,
  updateMutation as updateTodo,
  updateTodoMutationOptions,
} from "@/swrMutations/todosMutations";
import { FetchingTypeEnums, ToastMessageContentEnums } from "@/enums";
import toast from "react-hot-toast";

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

const cacheKey = "/todos";

const TodoList: React.FC = () => {
  const notificateSuccess = (message = "") =>
    toast.success(message ? message : "Success!", {
      duration: 2000,
    });

  const notificateError = (err: Error | "" = "") => {
    const errorMessage = err ? err.message : "";
    toast.error(err ? err.message : "Error!", { duration: 2000 });
  };

  const formRef = useRef<HTMLFormElement>(null);

  const { setTodos, todoState } = useTodosStore();

  const { isLoading, error, data, mutate, isValidating } = useSWR(
    cacheKey,
    getTodos,
    {
      refreshInterval: 0,
      revalidate: false,
      rollbackOnError: true,
      onSuccess: (data) => {
        const sortedTodos = data.sort(
          (a: Todo, b: Todo) => Number(b.id) - Number(a.id),
        );
        setTodos(sortedTodos);
      },
    },
  );

  const handleAddNewTodo = async (e: FormEvent) => {
    const tempId = Date.now();
    let errorResponse = false;
    e.preventDefault();
    const todoText: string = formRef?.current?.newTodoText?.value;
    const postData: Todo = {
      text: todoText,
      completed: false,
      id: Number(tempId),
    };
    try {
      await mutate(
        addTodo(postData, todoState.todos),
        addTodoMutationOptions(postData, todoState.todos),
      );
      notificateSuccess(ToastMessageContentEnums.AddTodoSuccess);
    } catch (err: any) {
      errorResponse = true;
      notificateError(err);
    }
    if (formRef.current !== null && !errorResponse) {
      formRef.current.newTodoText.value = "";
    }
  };

  const handleDeleteTodo = async (todo: Todo) => {
    try {
      await mutate(
        deleteTodo(todo, todoState.todos),
        deleteTodoMutationOptions(todo, todoState.todos),
      );
      notificateSuccess(ToastMessageContentEnums.DeleteTodoSuccess);
    } catch (err: Error | any) {
      notificateError(err);
    }
  };

  const handleUpdateTodo = async (todo: Todo) => {
    try {
      await mutate(
        updateTodo(todo, todoState.todos),
        updateTodoMutationOptions(todo, todoState.todos),
      );
      notificateSuccess(ToastMessageContentEnums.UpdateTodoSuccess);
    } catch (err: Error | any) {
      notificateError(err);
    }
  };

  const isAddButtonDisabled =
    isLoading ||
    isValidating ||
    (todoState.isFetching && todoState.fetchingType === FetchingTypeEnums.Add);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6">Todo List</h1>
      <form className="mb-4" ref={formRef}>
        <div className="inline-flex">
          <input
            type="text"
            name="newTodoText"
            placeholder="Add a new todo..."
            disabled={isLoading || isValidating || todoState.isFetching}
            className="input input-bordered w-full max-w-xs mr-2 inline-block"
          />
          <button
            onClick={handleAddNewTodo}
            className="btn btn-success inline-block disabled:bg-slate-400"
            disabled={isAddButtonDisabled}
          >
            {todoState.isFetching ? (
              <span className="loading loading-spinner text-white"></span>
            ) : (
              "Add"
            )}
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
            todoState.todos?.map((todo: Todo) => (
              <TodoCard
                key={todo.id}
                todo={todo}
                handleDelete={handleDeleteTodo}
                handleUpdate={handleUpdateTodo}
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
