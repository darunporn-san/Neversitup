import { GetServerSidePropsContext } from "next";
import { cookies } from "next/headers";

export function getCookie(cname: string) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export const getAuthHeader = (context?: GetServerSidePropsContext) => {
  const token = context ? context.req.cookies.token : getCookie("token");
  return { Authorization: `Bearer ${token}` };
};

export const getServerAuthHeader = async () => {
  const token = cookies().get("token");
  return { Authorization: `Bearer ${token}` };
};
