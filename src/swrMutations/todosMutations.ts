import { addNewTodo } from "@/app/api/todosApi";
import { Todo } from "@/components/TodoList/TodoList";
import { useStore } from "@/store/todoStore";

const { setTodos } = useStore.getState();
export const addMutation = async (newTodo: Todo, todos: Todo[]) => {
  const sortedNewTodosArr = [...todos, newTodo].sort(
    (a: Todo, b: Todo) => Number(b.id) - Number(b.id),
  );
  await setTodos(sortedNewTodosArr);
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
