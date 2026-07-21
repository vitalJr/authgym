"use client";

import { useState } from "react";
import type { InputHTMLAttributes } from "react";

import { EyeIcon, EyeOffIcon } from "@/images";

import styles from "./PasswordInput.module.css";

type PasswordInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export const PasswordInput = ({ className, ...props }: PasswordInputProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className={styles.wrapper}>
      <input
        {...props}
        type={visible ? "text" : "password"}
        className={[className, styles.input].filter(Boolean).join(" ")}
      />
      <button
        type="button"
        className={styles.toggle}
        onClick={() => setVisible((current) => !current)}
        aria-label={visible ? "Hide password" : "Show password"}
      >
        {visible ? (
          <EyeOffIcon aria-hidden="true" />
        ) : (
          <EyeIcon aria-hidden="true" />
        )}
      </button>
    </div>
  );
};
