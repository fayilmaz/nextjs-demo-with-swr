import { Todo } from "@/components/TodoList/TodoList";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface TodoStore {
  todos: Todo[];
  setTodos: (todos: Todo[]) => Promise<void>;
  addTodo: (text: string) => Promise<Todo>;
  deleteTodo: (id: number) => Promise<void>;
  updateTodo: (id: number, updates: { completed: boolean }) => Promise<void>;
}

export const useStore = create(
  devtools<TodoStore>((set) => ({
    todos: [],
    setTodos: async (todos: Todo[]) => {
      set({ todos: todos });
    },
    addTodo: async (text: string) => {
      const newTodo: Todo = {
        id: Date.now(),
        text,
        completed: false,
      };
      set((state) => ({ todos: [...state.todos, newTodo] }));
      return newTodo;
    },
    deleteTodo: async (id: number) => {
      set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) }));
    },
    updateTodo: async (id: number, updates: { completed: boolean }) => {
      set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === id ? { ...todo, ...updates } : todo,
        ),
      }));
    },
  })),
);
