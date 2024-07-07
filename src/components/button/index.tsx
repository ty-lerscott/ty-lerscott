import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { ImSpinner } from "react-icons/im";
import type { ButtonProps } from "./types";
import { Slot } from "@radix-ui/react-slot";

export const ButtonName = {
  ghost: "Button-Ghost",
  primary: "Button-Primary",
  secondary: "Button-Secondary",
} as Record<ButtonProps["variant"], string>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      asChild = false,
      loading,
      className,
      loadingText,
      variant = "primary",
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

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
        {loading ? (
          <>
            <ImSpinner className="animate-spin" />
            {loadingText || children}
          </>
        ) : (
          children
        )}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export default Button;
