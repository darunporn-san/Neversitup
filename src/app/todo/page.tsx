import { ITodoDetail } from "@/shared/types";
import { revalidatePath, revalidateTag } from "next/cache";
import { TodoItem } from "./list-todo";
import { AddTodoForm } from "./add-form";

import {
  createItem,
  deleteTodos,
  getTodoById,
  getTodoLists,
  updateTodo,
} from "@/shared/actions/todo-action";

export default async function TodoList({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const todos: ITodoDetail[] = await getTodoLists(searchParams?.id);
  const todosdetail: ITodoDetail = await getTodoById(searchParams?.id);
  const addNewTodo = async (form: any) => {
    "use server";
    await createItem(form);
    revalidatePath(
      searchParams?.id ? `/todo?id=${searchParams?.id}` : "/todo"
    );
  };

  const deleteTodo = async (id: string | number) => {
    "use server";
    await deleteTodos(id);
    revalidateTag("todobyid");
    revalidatePath("/todo");
  };

  const editTodo = async (form: any, id: string | number) => {
    "use server";
    await updateTodo(form, id);
    revalidatePath(
      searchParams?.id ? `/todo?id=${searchParams?.id}` : "/todo"
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-fit md:h-screen gap-10 p-10 bg-black w-screen  ">
      <div className="bg-white">
        <AddTodoForm
          param_id={searchParams?.id}
          addNewTodo={addNewTodo}
          editTodo={editTodo}
          todoDetails={todosdetail}
        />
      </div>
      <div className="bg-white overflow-y-auto">
        <div className="flex justify-center">
          <div className="my-10 w-screen flex-col justify-around flex items-center">
            <div className="text-2xl font-bold">List</div>
            {(todos || []).map((todo) => (
              <TodoItem key={todo._id} todo={todo} deleteTodo={deleteTodo} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
