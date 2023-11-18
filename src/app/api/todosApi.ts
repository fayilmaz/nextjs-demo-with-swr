import { Todo } from "@/components/TodoList/TodoList";
import axios from "axios";

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
enum NodeEnv {
  Production = "production",
}

const delay = (time = 800) =>
  new Promise<void>((res) => setTimeout(() => res(), time));

const BASE_URL =
  process.env.NODE_ENV === NodeEnv.Production
    ? process.env.BASE_URL
    : process.env.NEXT_PUBLIC_DEV_BASE_URL;

const axiosIstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export async function getTodos() {
  await delay(0);
  return await axiosIstance.get("/todos").then((res) => res.data);
}

export async function setTodos() {
  await delay(0);
  return await axiosIstance.get("/todos").then((res) => res.data);
}

export async function addNewTodo({ text, completed }: Todo) {
  await delay(2000);
  if (Math.random() < 0.6) {
    throw Error("An error occured while adding new todo!");
  }
  return await axiosIstance.post(`/todos`, { text, completed }).then((res) => {
    return res.data;
  });
}

export async function updateTodo(todo: Todo) {
  await delay(0);
  return await axiosIstance
    .put(`/todos/${todo.id}`, todo)
    .then((res) => res.data);
}

export async function removeTodo(id: number) {
  await delay(0);
  return await axiosIstance.delete(`/todos/${id}`).then((res) => res.data);
}
