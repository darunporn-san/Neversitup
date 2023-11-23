"use server";

import { cookies } from "next/headers";

const urlEndpoint = "https://candidate.neversitup.com/todo";

export async function logins(formData: FormData) {
  try {
    const user = {
      username: formData.get("username"),
      password: formData.get("password"),
    };
    return await fetch(`${urlEndpoint}/users/auth`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((res) => {
        cookies().set("token", res.token);
        if (res?.token) {
          
          return res.token;
        }else{
          return res
        }
      });
  } catch (e) {
    return { message: "Failed to Login" };
  }
}
