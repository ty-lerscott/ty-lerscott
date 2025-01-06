import type { CSSProperties } from "react";
import { Fira_Code } from "next/font/google";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import { cn } from "@/lib/utils";

const fira = Fira_Code({
	weight: ["400"],
	style: ["normal"],
	subsets: ["latin"],
	variable: "--font-fira-code",
});

const styles = {
	'code[class*="language-"]': {
		color: "var(--foreground)",
		fontFamily: "var(--font-fira-code)",
		direction: "ltr",
		textAlign: "left",
		whiteSpace: "pre",
		wordSpacing: "normal",
		wordBreak: "normal",
		lineHeight: "1.5",
		MozTabSize: "4",
		OTabSize: "4",
		tabSize: "4",
		WebkitHyphens: "none",
		MozHyphens: "none",
		msHyphens: "none",
		hyphens: "none",
	},
	'pre[class*="language-"]': {
		color: "#a9b7c6",
		fontFamily: "var(--font-fira-code)",
		direction: "ltr",
		textAlign: "left",
		whiteSpace: "pre",
		wordSpacing: "normal",
		wordBreak: "normal",
		lineHeight: "1.5",
		MozTabSize: "4",
		OTabSize: "4",
		tabSize: "4",
		WebkitHyphens: "none",
		MozHyphens: "none",
		msHyphens: "none",
		hyphens: "none",
		padding: "1em",
		margin: ".5em 0",
		overflow: "auto",
		borderRadius: "0.25rem",
		background: "var(--sidebar)",
	},
	'pre[class*="language-"]::-moz-selection': {
		color: "inherit",
		background: "rgba(33, 66, 131, .85)",
	},
	'pre[class*="language-"] ::-moz-selection': {
		color: "inherit",
		background: "rgba(33, 66, 131, .85)",
	},
	'code[class*="language-"]::-moz-selection': {
		color: "inherit",
		background: "rgba(33, 66, 131, .85)",
	},
	'code[class*="language-"] ::-moz-selection': {
		color: "inherit",
		background: "rgba(33, 66, 131, .85)",
	},
	'pre[class*="language-"]::selection': {
		color: "inherit",
		background: "rgba(33, 66, 131, .85)",
	},
	'pre[class*="language-"] ::selection': {
		color: "inherit",
		background: "rgba(33, 66, 131, .85)",
	},
	'code[class*="language-"]::selection': {
		color: "inherit",
		background: "rgba(33, 66, 131, .85)",
	},
	'code[class*="language-"] ::selection': {
		color: "inherit",
		background: "rgba(33, 66, 131, .85)",
	},
	':not(pre) > code[class*="language-"]': {
		background: "#2b2b2b",
		padding: ".1em",
		borderRadius: ".3em",
	},
	comment: {
		color: "var(--ghost)",
	},
	prolog: {
		color: "#808080",
	},
	cdata: {
		color: "#808080",
	},
	delimiter: {
		color: "#cc7832",
	},
	boolean: {
		color: "#cc7832",
	},
	keyword: {
		color: "var(--ghost)",
	},
	selector: {
		color: "#cc7832",
	},
	important: {
		color: "#cc7832",
	},
	atrule: {
		color: "#cc7832",
	},
	operator: {
		color: "#a9b7c6",
	},
	punctuation: {
		color: "#a9b7c6",
	},
	"attr-name": {
		color: "#a9b7c6",
	},
	tag: {
		color: "#e8bf6a",
	},
	"tag.punctuation": {
		color: "#e8bf6a",
	},
	doctype: {
		color: "#e8bf6a",
	},
	builtin: {
		color: "#e8bf6a",
	},
	entity: {
		color: "#6897bb",
	},
	number: {
		color: "var(--code)",
	},
	symbol: {
		color: "#6897bb",
	},
	property: {
		color: "var(--code)",
	},
	constant: {
		color: "var(--code)",
	},
	variable: {
		color: "var(--white)",
	},
	string: {
		color: "var(--foreground)",
	},
	char: {
		color: "#6a8759",
	},
	"attr-value": {
		color: "#a5c261",
	},
	"attr-value.punctuation": {
		color: "#a5c261",
	},
	"attr-value.punctuation:first-child": {
		color: "#a9b7c6",
	},
	url: {
		color: "#287bde",
		textDecoration: "underline",
	},
	function: {
		color: "var(--code)",
	},
	regex: {
		background: "#364135",
	},
	bold: {
		fontWeight: "bold",
	},
	italic: {
		fontStyle: "italic",
	},
	inserted: {
		background: "#294436",
	},
	deleted: {
		background: "#484a4a",
	},
	"code.language-css .token.property": {
		color: "#a9b7c6",
	},
	"code.language-css .token.property + .token.punctuation": {
		color: "#a9b7c6",
	},
	"code.language-css .token.id": {
		color: "#ffc66d",
	},
	"code.language-css .token.selector > .token.class": {
		color: "#ffc66d",
	},
	"code.language-css .token.selector > .token.attribute": {
		color: "#ffc66d",
	},
	"code.language-css .token.selector > .token.pseudo-class": {
		color: "#ffc66d",
	},
	"code.language-css .token.selector > .token.pseudo-element": {
		color: "#ffc66d",
	},
} as Record<string, CSSProperties>;

const CodeBlock = ({
	inline,
	children,
	className,
	...props
}: { inline?: boolean; className?: string; children?: string }) => {
	const match = /language-(\w+)/.exec(className || "");
	return !inline && match ? (
		<SyntaxHighlighter
			style={styles}
			language={match[1]}
			PreTag="div"
			className={cn(fira.variable, className)}
			{...props}
		>
			{String(children).replace(/\n$/, "")}
		</SyntaxHighlighter>
	) : (
		<code className={cn(fira.variable, className)} {...props}>
			{children}
		</code>
	);
};

export default CodeBlock;
