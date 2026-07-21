import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/Button/Button";
import { PasswordInput } from "@/components/PasswordInput/PasswordInput";

import { loginWithCredentials, loginWithGoogle } from "./_actions";
import formStyles from "../auth-form.module.css";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to access your account.",
};

type LoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { error } = await searchParams;

  return (
    <>
      <h1 className={formStyles.title}>Login</h1>
      <p className={formStyles.subtitle}>Sign in to continue.</p>

      {error && (
        <p role="alert" className={formStyles.error}>
          Invalid email/username or password.
        </p>
      )}

      <form action={loginWithCredentials} className={formStyles.form}>
        <label className={formStyles.field} htmlFor="identifier">
          <span className={formStyles.label}>Email or username</span>
          <input
            id="identifier"
            name="identifier"
            type="text"
            autoComplete="username"
            required
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

        <Button type="submit" variant="primary" className={formStyles.submit}>
          Sign in
        </Button>
      </form>

      <p className={formStyles.footerLink}>
        Don&apos;t have an account? <Link href="/register">Create one</Link>
      </p>

      <div className={formStyles.divider}>
        <span>or</span>
      </div>

      <form action={loginWithGoogle}>
        <Button type="submit" variant="secondary" className={formStyles.submit}>
          <Image src="/google.svg" alt="" width={18} height={18} />
          Continue with Google
        </Button>
      </form>
    </>
  );
}
