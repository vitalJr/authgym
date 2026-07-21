"use server";

import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

import { signIn } from "auth";

export async function loginWithGoogle() {
  await signIn("google", { redirectTo: "/" });
}

export async function loginWithCredentials(formData: FormData) {
  try {
    await signIn("credentials", {
      identifier: formData.get("identifier"),
      password: formData.get("password"),
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      redirect("/login?error=invalid-credentials");
    }

    throw error;
  }
}
