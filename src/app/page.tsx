"use client";
import TodoList from "@/components/TodoList/TodoList";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <>
      <div>
        <Toaster />
      </div>
      <main className="flex min-h-screen flex-col items-center justify-start p-24">
        <div className="p-8">
          <TodoList />
        </div>
      </main>
    </>
  );
}
