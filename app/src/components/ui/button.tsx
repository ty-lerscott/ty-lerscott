import { cn } from "@/lib/utils";
import { ImSpinner } from "react-icons/im";
import { Slot } from "@radix-ui/react-slot";
import { PiSealWarningBold } from "react-icons/pi";
import { forwardRef, type ButtonHTMLAttributes } from "react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	error?: boolean;
	asChild?: boolean;
	loading?: boolean;
	errorText?: string;
	loadingText?: string;
	variant: "primary" | "secondary" | "ghost";
};

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
