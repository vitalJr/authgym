import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/Button/Button";

import { registerWithCredentials } from "./_actions";
import { PasswordMatchFields } from "./_components/PasswordMatchFields";
import formStyles from "../auth-form.module.css";

export const metadata: Metadata = {
  title: "Create account",
  description: "Sign up to create a new account.",
};

type RegisterPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const { error } = await searchParams;

  return (
    <>
      <h1 className={formStyles.title}>Create account</h1>
      <p className={formStyles.subtitle}>Sign up to get started.</p>

      {error && (
        <p role="alert" className={formStyles.error}>
          {error === "password-mismatch"
            ? "Passwords do not match."
            : "Could not create your account. Please try again later."}
        </p>
      )}

      <form action={registerWithCredentials} className={formStyles.form}>
        <label className={formStyles.field} htmlFor="username">
          <span className={formStyles.label}>Username</span>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            required
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
            className={formStyles.input}
          />
        </label>

        <PasswordMatchFields />

        <label className={formStyles.field} htmlFor="birthDate">
          <span className={formStyles.label}>Date of birth</span>
          <input
            id="birthDate"
            name="birthDate"
            type="date"
            required
            className={formStyles.input}
          />
        </label>

        <label className={formStyles.field} htmlFor="gender">
          <span className={formStyles.label}>Gender</span>
          <select
            id="gender"
            name="gender"
            required
            defaultValue=""
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

        <Button type="submit" variant="primary" className={formStyles.submit}>
          Create account
        </Button>
      </form>

      <p className={formStyles.footerLink}>
        Already have an account? <Link href="/login">Sign in</Link>
      </p>
    </>
  );
}
