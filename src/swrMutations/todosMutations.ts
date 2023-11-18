import { addNewTodo, deleteTodo, updateTodo } from "@/app/api/todosApi";
import { Todo } from "@/components/TodoList/TodoList";
import { useTodosStore } from "@/store/todoStore";

const { setTodos } = useTodosStore.getState();
export const addMutation = async (newTodo: Todo, todos: Todo[]) => {
  const sortedNewTodosArr = [...todos, newTodo].sort(
    (a: Todo, b: Todo) => Number(b.id) - Number(a.id),
  );
  setTodos(sortedNewTodosArr);
  const added = await addNewTodo(newTodo);
  const sortedTodosWithSavedResponse = [...todos, added].sort(
    (a: Todo, b: Todo) => Number(b.id) - Number(a.id),
  );
  return sortedTodosWithSavedResponse;
};

const sortByDescending = (todos: Todo[]) => {
  return todos.sort((a, b) => {
    return Number(b.id) - Number(a.id);
  });
};

export const addTodoMutationOptions = (newTodo: Todo, todos: Todo[]) => {
  return {
    optimisticData: () => {
      setTodos(sortByDescending([...todos, newTodo]));
      return sortByDescending([...todos, newTodo]);
    },
    rollbackOnError: true,
    populateCache: () => {
      setTodos(sortByDescending([...todos, newTodo]));
      return sortByDescending([...todos, newTodo]);
    },
    revalidate: true,
  };
};

export const deleteMutation = async (deletedTodo: Todo, todos: Todo[]) => {
  const todosArrAfterDeletion = sortByDescending(
    todos.filter((todo) => todo.id !== deletedTodo.id),
  );
  setTodos(todosArrAfterDeletion);
  const deleteTodoRes = await deleteTodo(deletedTodo);
  if (deleteTodoRes.status === 200) {
  }
  return deleteTodoRes;
};

export const deleteTodoMutationOptions = (deletedTodo: Todo, todos: Todo[]) => {
  const todosArrAfterDeletion = sortByDescending(
    todos.filter((todo) => todo.id !== deletedTodo.id),
  );
  return {
    optimisticData: () => {
      setTodos([...todosArrAfterDeletion]);
      return [...todosArrAfterDeletion];
    },
    rollbackOnError: true,
    populateCache: () => {
      setTodos([...todosArrAfterDeletion]);
      return [...todosArrAfterDeletion];
    },
    revalidate: true,
  };
};

export const updateMutation = async (updatedTodo: Todo, todos: Todo[]) => {
  const todosExceptUpdated = todos.filter((todo) => todo.id !== updatedTodo.id);
  const todosWithUpdated = sortByDescending([
    ...todosExceptUpdated,
    updatedTodo,
  ]);
  setTodos(todosWithUpdated);
  return await updateTodo(updatedTodo);
};

export const updateTodoMutationOptions = (updatedTodo: Todo, todos: Todo[]) => {
  const todosExceptUpdated = todos.filter((todo) => todo.id !== updatedTodo.id);
  const todosWithUpdated = sortByDescending([
    ...todosExceptUpdated,
    updatedTodo,
  ]);
  setTodos(todosWithUpdated);
  return {
    optimisticData: () => {
      setTodos([...todosWithUpdated]);
      return [...todosWithUpdated];
    },
    rollbackOnError: true,
    populateCache: () => {
      setTodos([...todosWithUpdated]);
      return [...todosWithUpdated];
    },
    revalidate: true,
  };
};
