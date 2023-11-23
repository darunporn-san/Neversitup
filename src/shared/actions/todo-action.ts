import { cookies } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";

const urlEndpoint = "https://candidate.neversitup.com/todo";
const token = cookies().get("token")?.value;
const headers = {
  Accept: "application/json, text/plain, */*",
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
  'Cache-Control': 'no-cache',
  cache: 'no-store'
};

export async function createItem(formData: FormData) {
  try {
    const todos = {
      title: formData.get("title"),
      description: formData.get("description"),
    };
    return await fetch(`${urlEndpoint}/todos`, {
      method: "POST",
      headers,
      body: JSON.stringify(todos),
    })
      .then((res) => res.json())
      .then((res) => {
        return res;
      });
  } catch (e) {
    return { message: "Failed to Create Todo" };
  }
}

export async function getTodoLists(_id:string | number | undefined) {
  revalidateTag('todolist')

  // console.log('_id', headers);
  try {
    return await fetch(`${urlEndpoint}/todos`, {
      method: "GET",
      headers,        next:{ tags: ['todolist'],revalidate: 3600  } 

    })
      .then((res) => res.json())
      .then((res) => {
        return res;
      })
  } catch (e) {
    return { message: "Failed to Get TodoList" };
  }
}

export async function deleteTodos(_id: string | number) {
  try {
    return await fetch(`${urlEndpoint}/todos/${_id}`, {
      method: "DELETE",
      headers,
    })
      .then((res) => res.json())
      .then((res) => {
        return res;
      });
  } catch (e) {
    return { message: "Failed to Update Todo" };
  }
}

export async function getTodoById(_id: string | number | undefined) {
 
  try {
    if (_id) {
      return await fetch(`${urlEndpoint}/todos/${_id}`, {
        method: "GET",
        headers,
        next:{ tags: ['todobyid'],revalidate: 3600  } 
      })
        .then((res) => res.json())
        .then((res) => {
          return res;
        })
    }

    // return ''
  } catch (e) {
    return { message: "Failed to Get Todo By ID " };
  }
}


export async function updateTodo(formData: FormData,_id:string | number) {
  try {
    const todos = {
      title: formData.get("title"),
      description: formData.get("description"),
    };
    return await fetch(`${urlEndpoint}/todos/${_id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(todos),
    })
      .then((res) => res.json())
      .then((res) => {
        return res
      }).finally(()=>revalidatePath(
        _id ? `/todo?id=${_id}` : "/todo"
      ))
  } catch (e) {
    return { message: "Failed to Update Todo" };
  }
}

