import { Todo } from "@/components/TodoList/TodoList";
import axios from "axios";
import { useTodosStore } from "../../store/todoStore";
import {
  ErrorMessageContentEnums,
  FetchingTypeEnums,
  NodeEnvEnums,
} from "@/enums";
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const delay = (time = 800) =>
  new Promise<void>((res) => setTimeout(() => res(), time));

const BASE_URL =
  process.env.NODE_ENV === NodeEnvEnums.Production
    ? process.env.BASE_URL
    : process.env.NEXT_PUBLIC_DEV_BASE_URL;

const axiosIstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

const { setTodoState } = useTodosStore.getState();

export async function getTodos() {
  await delay(0);
  return await axiosIstance.get("/todos").then((res) => res.data);
}

export async function setTodos() {
  await delay(0);
  return await axiosIstance.get("/todos").then((res) => res.data);
}

export async function addNewTodo({ text, completed }: Todo) {
  setTodoState({ isFetching: true, fetchingType: FetchingTypeEnums.Add });
  await delay(2000);
  if (Math.random() < 0.5) {
    setTodoState({ isFetching: false, fetchingType: null });
    throw Error(ErrorMessageContentEnums.AddTodoError);
  }
  axiosIstance
    .post(`/todos`, { text, completed })
    .then((res) => {
      setTodoState({ isFetching: false, fetchingType: null });
      return res.data;
    })
    .catch((err) => {
      setTodoState({ isFetching: false, fetchingType: null });
      return err;
    });
}

export async function updateTodo(todo: Todo) {
  setTodoState({ isFetching: true, fetchingType: FetchingTypeEnums.Update });
  await delay(1000);
  return await axiosIstance
    .put(`/todos/${todo.id}`, todo)
    .then((res) => {
      setTodoState({ isFetching: false, fetchingType: null });
      return res.data;
    })
    .catch((err) => {
      setTodoState({ isFetching: false, fetchingType: null });
      return err;
    });
}

export async function removeTodo(removedTodo: Todo) {
  setTodoState({ isFetching: true, fetchingType: FetchingTypeEnums.Delete });
  await delay(2000);
  if (Math.random() < 0.5) {
    setTodoState({ isFetching: false, fetchingType: null });
    throw Error(ErrorMessageContentEnums.DeleteError);
  }
  return await axiosIstance
    .delete(`/todos/${removedTodo.id}`)
    .then((res) => {
      setTodoState({ isFetching: false, fetchingType: null });
      if (res.statusText === "OK") {
        return removedTodo;
      }
    })
    .catch((err) => {
      setTodoState({ isFetching: false, fetchingType: null });
      return err;
    });
}
