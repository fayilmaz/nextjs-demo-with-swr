import { Todo } from "@/components/TodoList/TodoList";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { produce } from "immer";
import { FetchingTypeEnums } from "@/enums";

interface TodoStore {
  todoState: {
    todos: Todo[];
    isFetching: boolean;
    fetchingType: FetchingTypeEnums | null;
    error: null | string;
  };
  setTodos: (todos: Todo[]) => void;
  setTodoState: (todoState: Partial<TodoStore["todoState"]>) => void;
  addTodo: (text: string) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (id: number, updates: { completed: boolean }) => void;
}

export const useTodosStore = create(
  devtools(
    immer<TodoStore>((set) => ({
      todoState: {
        todos: [],
        isFetching: false,
        fetchingType: null,
        error: null,
      },
      setTodos: (todos: Todo[]) => {
        set(
          produce((state) => {
            state.todoState.todos = todos;
          }),
        );
      },
      setTodoState: (newTodoState) => {
        set(
          produce((state) => {
            state.todoState = { ...state.todoState, ...newTodoState };
          }),
        );
      },
      addTodo: async (text: string) => {
        const newTodo: Todo = {
          id: Date.now(),
          text,
          completed: false,
        };
        set(
          produce((state: TodoStore) => {
            state.todoState.todos.push(newTodo);
          }),
        );
      },
      deleteTodo: (id: number) => {
        set(
          produce((state: TodoStore) => ({
            todos: state.todoState.todos.filter((todo) => todo.id !== id),
          })),
        );
      },
      updateTodo: (id: number, updates: { completed: boolean }) => {
        set(
          produce((state: TodoStore) => {
            const todoToUpdate = state.todoState.todos.find(
              (todo) => todo.id === id,
            );
            if (todoToUpdate) {
              todoToUpdate.completed = updates.completed;
            }
          }),
        );
      },
    })),
  ),
);
