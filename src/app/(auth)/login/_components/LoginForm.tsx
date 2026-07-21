"use client";

import { useActionState } from "react";

import { Button } from "@/components/Button/Button";
import { PasswordInput } from "@/components/PasswordInput/PasswordInput";

import { loginWithCredentials } from "../_actions";
import type { LoginState } from "../_actions";
import formStyles from "../../auth-form.module.css";

const initialState: LoginState = {};

export const LoginForm = () => {
  const [state, formAction, isPending] = useActionState(
    loginWithCredentials,
    initialState,
  );

  return (
    <form action={formAction} className={formStyles.form}>
      {state.error && (
        <p role="alert" className={formStyles.error}>
          {state.error}
        </p>
      )}

      <label className={formStyles.field} htmlFor="identifier">
        <span className={formStyles.label}>Email or username</span>
        <input
          id="identifier"
          name="identifier"
          type="text"
          autoComplete="username"
          required
          defaultValue={state.values?.identifier}
          className={formStyles.input}
        />
      </label>

      <label className={formStyles.field} htmlFor="password">
        <span className={formStyles.label}>Password</span>
        <PasswordInput
          id="password"
          name="password"
          autoComplete="current-password"
          required
          className={formStyles.input}
        />
      </label>

      <Button
        type="submit"
        variant="primary"
        disabled={isPending}
        className={formStyles.submit}
      >
        {isPending ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
};
