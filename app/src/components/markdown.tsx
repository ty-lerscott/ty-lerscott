"use client";

import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";

import CodeBlock from "./code-markdown";

const Markdown = ({
	children,
	className,
}: { className?: string; children: string }) => (
	<ReactMarkdown
		className={className}
		remarkPlugins={[remarkGfm]}
		components={{
			code: CodeBlock,
		}}
	>
		{children}
	</ReactMarkdown>
);

export default Markdown;
