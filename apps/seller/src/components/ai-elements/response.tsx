"use client";

// import { cn } from "@/lib/utils";
// import { type ComponentProps, memo } from "react";
// import { Streamdown } from "streamdown";

// type ResponseProps = ComponentProps<typeof Streamdown>;

// export const Response = memo(
//   ({ className, ...props }: ResponseProps) => (
//     <Streamdown
//       className={cn(
//         "size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
//         className
//       )}
//       {...props}
//     />
//   ),
//   (prevProps, nextProps) => prevProps.children === nextProps.children
// );

import { marked } from "marked";
import { memo, useMemo } from "react";
import ReactMarkdown from "react-markdown";

function parseMarkdownIntoBlocks(markdown: string): string[] {
	const tokens = marked.lexer(markdown);
	return tokens.map((token) => token.raw);
}

const MemoizedMarkdownBlock = memo(
	({ content }: { content: string }) => {
		return <ReactMarkdown>{content}</ReactMarkdown>;
	},
	(prevProps, nextProps) => {
		if (prevProps.content !== nextProps.content) return false;
		return true;
	}
);

MemoizedMarkdownBlock.displayName = "MemoizedMarkdownBlock";

export const MemoizedMarkdown = memo(
	({ content, id }: { content: string; id: string }) => {
		const blocks = useMemo(() => parseMarkdownIntoBlocks(content), [content]);

		return blocks.map((block, index) => (
			<MemoizedMarkdownBlock content={block} key={`${id}-block_${index}`} />
		));
	}
);

MemoizedMarkdown.displayName = "MemoizedMarkdown";
// export const Response = ({ className, ...props }: ComponentProps<"div">) => {
// 	return (
// 		<div
// 			className={cn(
// 				"size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
// 				className
// 			)}
// 			{...props}
// 		/>
// 	);
// };
// Response.displayName = "Response";
