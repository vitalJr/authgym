"use client";

import { useActionState } from "react";

import { Button } from "@/components/Button/Button";

import { registerWithCredentials } from "../_actions";
import type { RegisterState } from "../_actions";
import { PasswordMatchFields } from "./PasswordMatchFields";
import formStyles from "../../auth-form.module.css";

const initialState: RegisterState = {};

export const RegisterForm = () => {
  const [state, formAction, isPending] = useActionState(
    registerWithCredentials,
    initialState,
  );

  return (
    <form action={formAction} className={formStyles.form}>
      {state.error && (
        <p role="alert" className={formStyles.error}>
          {state.error}
        </p>
      )}

      <label className={formStyles.field} htmlFor="username">
        <span className={formStyles.label}>Username</span>
        <input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          required
          defaultValue={state.values?.username}
          className={formStyles.input}
        />
      </label>

      <label className={formStyles.field} htmlFor="email">
        <span className={formStyles.label}>Email</span>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          defaultValue={state.values?.email}
          className={formStyles.input}
        />
      </label>

      <PasswordMatchFields error={state.fieldErrors?.confirmPassword} />

      <label className={formStyles.field} htmlFor="birthDate">
        <span className={formStyles.label}>Date of birth</span>
        <input
          id="birthDate"
          name="birthDate"
          type="date"
          required
          defaultValue={state.values?.birthDate}
          className={formStyles.input}
        />
      </label>

      <label className={formStyles.field} htmlFor="gender">
        <span className={formStyles.label}>Gender</span>
        <select
          id="gender"
          name="gender"
          required
          defaultValue={state.values?.gender ?? ""}
          className={formStyles.select}
        >
          <option value="" disabled>
            Select an option
          </option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="other">Other</option>
          <option value="prefer-not-to-say">Prefer not to say</option>
        </select>
      </label>

      <Button
        type="submit"
        variant="primary"
        disabled={isPending}
        className={formStyles.submit}
      >
        {isPending ? "Creating..." : "Create account"}
      </Button>
    </form>
  );
};
