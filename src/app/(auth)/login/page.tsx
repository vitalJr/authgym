import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/Button/Button";

import { loginWithGoogle } from "./_actions";
import { LoginForm } from "./_components/LoginForm";
import formStyles from "../auth-form.module.css";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to access your account.",
};

export default function LoginPage() {
  return (
    <>
      <h1 className={formStyles.title}>Login</h1>
      <p className={formStyles.subtitle}>Sign in to continue.</p>

      <LoginForm />

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
