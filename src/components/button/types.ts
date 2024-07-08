import type { ButtonHTMLAttributes } from "react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  error?: boolean;
  asChild?: boolean;
  loading?: boolean;
  errorText?: string;
  loadingText?: string;
  variant: "primary" | "secondary" | "ghost";
};
