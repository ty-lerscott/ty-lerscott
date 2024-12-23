import merge from "lodash.mergewith";
import NextLink, { type LinkProps } from "next/link";

import { cn } from "@/lib/utils";
import { ButtonName, type ButtonProps } from "./button";

const Link = ({
	text,
	href,
	variant,
	external,
	className,
	...rest
}: LinkProps & {
	text: string;
	external?: boolean;
	className?: string;
	variant?: ButtonProps["variant"];
}) => {
	const props = merge(rest, {
		...(external && {
			target: "__blank",
			rel: "noopener noreferrer",
		}),
	});

	return (
		<NextLink href={href} data-testid="Link" passHref legacyBehavior>
			<a
				{...props}
				className={cn(
					variant ? `Button ${ButtonName[variant]}` : "",
					className,
				)}
			>
				{text}
			</a>
		</NextLink>
	);
};

export default Link;
