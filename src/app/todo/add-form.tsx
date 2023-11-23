"use client";

import { ITodo, ITodoDetail } from "@/shared/types";
import { use, useEffect, useState, useTransition } from "react";
// import { useRouter } from "next/navigation";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const label: ITodo = {
  title: "Title",
  description: "Description",
};

const key: ITodo = {
  title: "title",
  description: "description",
};
const initialValue = {
  title: "",
  description: "",
};
export const AddTodoForm = ({
  param_id,
  addNewTodo,
  editTodo,
  todoDetails,
}: {
  param_id: string | undefined;
  addNewTodo: any;
  editTodo: any;
  todoDetails: ITodoDetail;
}) => {
  const router = useRouter();
  const [todo, setTodo] = useState(initialValue);
  const searchParams = useSearchParams();
  useEffect(() => {
    if (searchParams.get("id") !== null) {
      setTodo({
        title: todoDetails?.title,
        description: todoDetails?.description,
      });
    } else {
      setTodo(initialValue);
    }
  }, [todoDetails, searchParams]);
  return (
    <div className="bg-white w-full h-full flex">
      <form
        action={
          !param_id
            ? async (formData: FormData) => {
                await addNewTodo(formData);
                setTodo(initialValue);
              }
            : async (formData: FormData) => {
                await editTodo(formData, param_id);
              }
        }
        className="grid w-1/2 m-auto"
      >
        <div className="text-3xl mb-5">
          {searchParams.get("id") ? "Edit" : "New"} Todo{" "}
          <label
            className="text-sm cursor-pointer text-blue-700 "
            onClick={() => {
              setTodo(initialValue);
              router.push(`/todo`);
            }}
          >
            {"( create todo )"}
          </label>
        </div>
        <label htmlFor={key.title}>{label.title} : </label>
        <input
          name={key.title}
          type="text"
          required
          value={todo.title}
          onChange={(e) =>
            setTodo({
              ...todo,
              title: e.target.value,
            })
          }
        />
        <label htmlFor={key.description} className="mt-5">
          {label.description} :
        </label>
        <textarea
          name={key.description}
          rows={5}
          required
          value={todo.description}
          onChange={(e) =>
            setTodo({
              ...todo,
              description: e.target.value,
            })
          }
        />
        <button
          type="submit"
          className="mt-10 border-2 border-emerald-400 px-10 mx-20 py-2 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
