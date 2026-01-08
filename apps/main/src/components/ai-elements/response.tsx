"use client";

import { cn } from "@/lib/utils";
import { type ComponentProps, memo } from "react";
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
export const Response = ({ className, ...props }: ComponentProps<"div">) => {
	return (
		<div
			className={cn(
				"size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
				className
			)}
			{...props}
		/>
	);
};
Response.displayName = "Response";
