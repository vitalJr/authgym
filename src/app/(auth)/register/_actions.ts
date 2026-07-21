"use server";

import { redirect } from "next/navigation";

import { registerUser } from "@/services/auth.service";

export async function registerWithCredentials(formData: FormData) {
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  if (password !== confirmPassword) {
    redirect("/register?error=password-mismatch");
  }

  const user = await registerUser({
    username: String(formData.get("username")),
    email: String(formData.get("email")),
    password: String(password),
    birthDate: String(formData.get("birthDate")),
    gender: String(formData.get("gender")),
  });

  if (!user) {
    redirect("/register?error=registration-unavailable");
  }

  redirect("/login");
}
