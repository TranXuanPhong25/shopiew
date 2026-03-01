"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bot, Send, User, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ChatApiService } from "../service";
import type { ApiMessage } from "./data";

interface MessageDisplayProps {
	conversationId: string;
	conversationName: string;
	currentUserId: string;
	currentUserType: string;
}

export function MessageDisplay({
	conversationId,
	conversationName,
	currentUserId,
	currentUserType,
}: MessageDisplayProps) {
	const [newMessage, setNewMessage] = useState("");
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const queryClient = useQueryClient();

	const { data: messages = [], isLoading } = useQuery({
		queryKey: ["chat-messages", conversationId],
		queryFn: () => ChatApiService.listMessages(conversationId),
		refetchInterval: 5000,
		enabled: !!conversationId,
	});

	const { mutate: sendMsg, isPending } = useMutation({
		mutationFn: (content: string) =>
			ChatApiService.sendMessage(conversationId, {
				senderId: currentUserId,
				senderType: currentUserType,
				content,
				messageType: "text",
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["chat-messages", conversationId],
			});
			setNewMessage("");
		},
	});

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const handleSendMessage = () => {
		if (newMessage.trim() && !isPending) {
			sendMsg(newMessage.trim());
		}
	};

	if (isLoading) {
		return (
			<div className="flex flex-col items-center justify-center h-full text-muted-foreground">
				<Loader2 className="w-6 h-6 animate-spin" />
			</div>
		);
	}

	return (
		<div className="flex flex-col h-full">
			<div className="p-4 border-b">
				<h2 className="text-lg font-semibold">{conversationName}</h2>
			</div>
			<ScrollArea className="flex-1 p-4">
				<div className="space-y-4">
					{messages.length === 0 ? (
						<div className="text-center text-muted-foreground">
							No messages yet. Start the conversation!
						</div>
					) : (
						messages.map((message: ApiMessage) => {
							const isMe = message.senderId === currentUserId;
							return (
								<div
									key={message.id}
									className={`flex items-start gap-3 ${isMe ? "justify-end" : "justify-start"}`}
								>
									{!isMe && (
										<Avatar className="w-8 h-8">
											<AvatarFallback>
												<Bot className="w-4 h-4" />
											</AvatarFallback>
										</Avatar>
									)}
									<div
										className={`max-w-[70%] p-3 rounded-lg ${
											isMe
												? "bg-primary text-primary-foreground rounded-br-none"
												: "bg-muted rounded-bl-none"
										}`}
									>
										<p className="text-sm">{message.content}</p>
										<span className="block text-xs text-muted-foreground mt-1">
											{new Date(
												message.createdAt,
											).toLocaleTimeString()}
										</span>
									</div>
									{isMe && (
										<Avatar className="w-8 h-8">
											<AvatarFallback>
												<User className="w-4 h-4" />
											</AvatarFallback>
										</Avatar>
									)}
								</div>
							);
						})
					)}
					<div ref={messagesEndRef} />
				</div>
			</ScrollArea>
			<div className="p-4 border-t flex gap-2">
				<Input
					placeholder="Type your message..."
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter" && !e.shiftKey) {
							e.preventDefault();
							handleSendMessage();
						}
					}}
					className="flex-1"
					disabled={isPending}
					aria-label="Type your message"
				/>
				<Button
					onClick={handleSendMessage}
					disabled={!newMessage.trim() || isPending}
					aria-label="Send message"
				>
					{isPending ? (
						<Loader2 className="w-4 h-4 animate-spin" />
					) : (
						<Send className="w-4 h-4" />
					)}
				</Button>
			</div>
		</div>
	);
}
