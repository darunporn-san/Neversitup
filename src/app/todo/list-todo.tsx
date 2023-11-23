"use client";

import { ITodoDetail } from "@/shared/types";
import { useRouter,useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

export const TodoItem = ({
  todo,
  deleteTodo,
}: {
  todo: ITodoDetail;
  deleteTodo: (id: string | number) => Promise<void>;
}) => {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const editId = searchParams.get('id')

  const router = useRouter();
  return (
    <div className={`border-2 border-black w-3/4 my-3 px-5 py-5 rounded-md relative ${editId === todo?._id && 'bg-gray-400/20'}`}>
      <div>Title: {todo?.title}</div>
      <div>Description: {todo?.description}</div>
      <div className="absolute top-2 right-0 flex">
        <div
          className="mx-2 cursor-pointer"
          onClick={() => {
            router.push(`/todo?id=${todo._id}`);
          }}
        >
          <i className="material-icons">edit</i>
        </div>
        <div
          className="mx-2 cursor-pointer"
          onClick={() => {
            startTransition(() => {
              deleteTodo(todo._id);
              router.push('/todo')
            });
          }}
        >
          <i className="material-icons text-red-500">delete</i>
        </div>
      </div>
    </div>
  );
};
