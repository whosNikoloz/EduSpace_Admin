"use server";

import { cookies } from "next/headers";

export const createAuthCookie = async (token: string) => {
  cookies().set("userAuth", token, { secure: true });
};

export const createCustomCookie = async (name: string, value: string) => {
  cookies().set(name, value, { secure: true });
};

export const deleteCustomCookie = async (name: string) => {
  cookies().delete(name);
};

export const deleteAuthCookie = async () => {
  cookies().delete("userAuth");
};

export const getAuthCookie = async () => {
  const cookie = cookies().get("userAuth");
  return cookie?.value || null;
};
