import type { Metadata } from "next";
import Link from "next/link";

import { RegisterForm } from "./_components/RegisterForm";
import formStyles from "../auth-form.module.css";

export const metadata: Metadata = {
  title: "Create account",
  description: "Sign up to create a new account.",
};

export default function RegisterPage() {
  return (
    <>
      <h1 className={formStyles.title}>Create account</h1>
      <p className={formStyles.subtitle}>Sign up to get started.</p>

      <RegisterForm />

      <p className={formStyles.footerLink}>
        Already have an account? <Link href="/login">Sign in</Link>
      </p>
    </>
  );
}
