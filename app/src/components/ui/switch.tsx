"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
	React.ElementRef<typeof SwitchPrimitives.Root>,
	React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
	<SwitchPrimitives.Root
		className={cn(
			"disabled:cursor-not-allowed disabled:border-[--background-secondary] disabled:data-[state=checked]:bg-[--ghost]",
			"border-[--ghost] focus-visible:ring-[--primary-action] data-[state=checked]:border-[--primary-action] data-[state=unchecked]:bg-[--background]",
			"peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
			className,
		)}
		{...props}
		ref={ref}
	>
		<SwitchPrimitives.Thumb
			className={cn(
				"bg-[--ghost] data-[disabled]:bg-[--background-secondary] data-[state=checked]:bg-[--primary-action] transition-all",
				"pointer-events-none block h-4 w-4 rounded-full ring-0 data-[state=checked]:translate-x-[1.35rem] data-[state=unchecked]:translate-x-0.5",
			)}
		/>
	</SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
