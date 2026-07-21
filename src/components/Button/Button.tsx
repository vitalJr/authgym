import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "outline" | "danger";

type ButtonAsButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  href?: never;
};

type ButtonAsLink = LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    variant?: Variant;
    href: LinkProps["href"];
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export const Button = ({ variant = "primary", className, ...props }: ButtonProps) => {
  const classes = [styles.button, styles[variant], className].filter(Boolean).join(" ");

  if (props.href) {
    return <Link {...(props as ButtonAsLink)} className={classes} />;
  }

  return <button {...(props as ButtonAsButton)} className={classes} />;
};
