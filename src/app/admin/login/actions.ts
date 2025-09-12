"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type FormState = {
  message: string;
  success: boolean;
};

const ADMIN_COOKIE_NAME = "sitr-admin-auth";

export async function loginAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const password = formData.get("password") as string;

  if (password === process.env.ADMIN_PASSWORD) {
    const cookieStore = cookies();
    cookieStore.set(ADMIN_COOKIE_NAME, password, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24, // 1 day
    });
    redirect("/admin");
  } else {
    return {
      message: "Incorrect password. Please try again.",
      success: false,
    };
  }
}


export async function logoutAction() {
    const cookieStore = cookies();
    cookieStore.delete(ADMIN_COOKIE_NAME);
    redirect('/admin/login');
}
