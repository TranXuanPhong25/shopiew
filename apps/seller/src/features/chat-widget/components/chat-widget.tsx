"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, MessageSquareX } from "lucide-react";
import dynamic from "next/dynamic";
const ChatBox = dynamic(
	() =>
		import("@/features/chat-widget/components/chat-box").then((mod) => ({
			default: mod.ChatBox,
		})),
	{
		ssr: false, // Không render server-side
	}
);
export function ChatWidget() {
	const [isOpen, setIsOpen] = useState(false);

	const toggleChat = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="fixed bottom-4 right-4 z-50">
			{isOpen && (
				<div className="mb-4 origin-bottom-right animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-2">
					<ChatBox onClose={toggleChat} />
				</div>
			)}
			<Button
				className="rounded-full w-14 h-14 shadow-lg float-right   "
				onClick={toggleChat}
				aria-label={isOpen ? "Close chat" : "Open chat"}
			>
				{isOpen ? (
					<MessageSquareX className="h-6 w-6" />
				) : (
					<MessageSquare className="h-6 w-6" />
				)}
			</Button>
		</div>
	);
}
