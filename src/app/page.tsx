import { ILogin } from "@/shared/types";
import { redirect } from "next/navigation";
import { logins } from "@/shared/actions/login-action";
import { revalidatePath } from "next/cache";

const label: ILogin = {
  username: "Username",
  password: "Password",
};

const key: ILogin = {
  username: "username",
  password: "password",
};

export default function Home() {
  async function loginUser(value: any) {
    "use server";
    const token = await logins(value);
    revalidatePath('/')
    if (token?.message) {
      redirect("/")
    } else {
      redirect("/todo");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-black ">
      <div className="bg-white w-full md:w-1/2 h-1/2 flex">
        <form action={loginUser} className="grid w-1/2 m-auto">
          <div className="text-3xl mb-5">Login</div>
          <label htmlFor={key.username}>{label.username} : </label>
          <input name={key.username} type="text" />
          <label htmlFor={key.password} className="mt-5">
            {label.password} :
          </label>
          <input name={key.password} type="password" />
          <button
            type="submit"
            className="mt-10 border-2 border-emerald-400 px-10 mx-20 py-2 rounded-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
