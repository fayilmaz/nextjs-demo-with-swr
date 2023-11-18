"use client";
import Image from "next/image";
import { SWRConfig } from "swr";
import TodoList from "@/components/TodoList/TodoList";
import { useStore } from "zustand";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    // <SWRConfig value={{}}>
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
    // </SWRConfig>
  );
}
