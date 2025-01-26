"use client";

import rehypeRaw from "rehype-raw";
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
		rehypePlugins={[rehypeRaw]}
		components={{
			code: CodeBlock,
		}}
	>
		{children}
	</ReactMarkdown>
);

export default Markdown;
