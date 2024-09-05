"use server";

import { cookies } from "next/headers";

export const createAuthCookie = async (token: string) => {
  cookies().set("userAuth", token, { secure: false });
};

export const deleteAuthCookie = async () => {
  cookies().delete("userAuth");
};

export const getAuthCookie = async () => {
  const cookie = cookies().get("userAuth");
  return cookie?.value || null;
};
