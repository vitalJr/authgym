"use client";

import { useState } from "react";

import { PasswordInput } from "@/components/PasswordInput/PasswordInput";
import { CheckIcon, XMarkIcon } from "@/images";

import formStyles from "../../auth-form.module.css";
import styles from "./PasswordMatchFields.module.css";

interface PasswordMatchFieldsProps {
  error?: string;
}

export const PasswordMatchFields = ({ error }: PasswordMatchFieldsProps) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const hasConfirmValue = confirmPassword.length > 0;
  const passwordsMatch = hasConfirmValue && password === confirmPassword;
  const passwordsMismatch = hasConfirmValue && !passwordsMatch;

  return (
    <>
      <label className={formStyles.field} htmlFor="password">
        <span className={styles.labelRow}>
          <span className={formStyles.label}>Password</span>
          {hasConfirmValue && <MatchIcon matches={passwordsMatch} />}
        </span>
        <PasswordInput
          id="password"
          name="password"
          autoComplete="new-password"
          required
          className={formStyles.input}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>

      <label className={formStyles.field} htmlFor="confirmPassword">
        <span className={styles.labelRow}>
          <span className={formStyles.label}>Confirm password</span>
          {hasConfirmValue && <MatchIcon matches={passwordsMatch} />}
        </span>
        <PasswordInput
          id="confirmPassword"
          name="confirmPassword"
          autoComplete="new-password"
          required
          className={formStyles.input}
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
      </label>

      {(passwordsMismatch || (error && !hasConfirmValue)) && (
        <p role="alert" className={styles.mismatch}>
          Passwords do not match.
        </p>
      )}
    </>
  );
};

const MatchIcon = ({ matches }: { matches: boolean }) =>
  matches ? (
    <CheckIcon
      className={styles.matchIcon}
      role="img"
      aria-label="Passwords match"
    />
  ) : (
    <XMarkIcon
      className={styles.mismatchIcon}
      role="img"
      aria-label="Passwords do not match"
    />
  );
