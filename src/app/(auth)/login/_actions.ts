"use server";

import { AuthError } from "next-auth";

import { signIn } from "auth";

export async function loginWithGoogle() {
  await signIn("google", { redirectTo: "/" });
}

export type LoginState = {
  error?: string;
  values?: {
    identifier: string;
  };
};

export async function loginWithCredentials(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const identifier = String(formData.get("identifier") ?? "");

  try {
    await signIn("credentials", {
      identifier,
      password: formData.get("password"),
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        error: "Invalid email/username or password.",
        values: { identifier },
      };
    }

    throw error;
  }

  return {};
}
