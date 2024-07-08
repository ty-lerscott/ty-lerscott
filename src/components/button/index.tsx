import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { ImSpinner } from "react-icons/im";
import type { ButtonProps } from "./types";
import { Slot } from "@radix-ui/react-slot";
import { PiSealWarningBold } from "react-icons/pi";

export const ButtonName = {
  ghost: "Button-Ghost",
  primary: "Button-Primary",
  secondary: "Button-Secondary",
} as Record<ButtonProps["variant"], string>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      error,
      children,
      asChild = false,
      errorText,
      loading,
      className,
      loadingText,
      variant = "primary",
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const buttonText = loading
      ? loadingText || children
      : error
        ? errorText || children
        : children;

    return (
      <Comp
        className={cn(
          "Button",
          ButtonName[variant],
          className,
          loading && "Button-Pending",
        )}
        ref={ref}
        {...props}
      >
        {loading && !error ? <ImSpinner className="animate-spin" /> : null}
        {error && !loading ? <PiSealWarningBold /> : null}
        {buttonText}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export default Button;
