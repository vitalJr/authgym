"use server";

import { redirect } from "next/navigation";

import { registerUser } from "@/services/auth.service";

export type RegisterState = {
  error?: string;
  fieldErrors?: {
    confirmPassword?: string;
  };
  values?: {
    username: string;
    email: string;
    birthDate: string;
    gender: string;
  };
};

export async function registerWithCredentials(
  _prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  const values = {
    username: String(formData.get("username") ?? ""),
    email: String(formData.get("email") ?? ""),
    birthDate: String(formData.get("birthDate") ?? ""),
    gender: String(formData.get("gender") ?? ""),
  };

  if (password !== confirmPassword) {
    return {
      fieldErrors: { confirmPassword: "Passwords do not match." },
      values,
    };
  }

  const user = await registerUser({
    username: values.username,
    email: values.email,
    password: String(password),
    birthDate: values.birthDate,
    gender: values.gender,
  });

  if (!user) {
    return {
      error: "Could not create your account. Please try again later.",
      values,
    };
  }

  redirect("/login");
}
