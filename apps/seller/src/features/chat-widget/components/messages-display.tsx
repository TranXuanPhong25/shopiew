"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bot, Send, User, Loader2, AlertCircle } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useWebSocket, type WebSocketMessage } from "../hooks/use-websocket";
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
	const [messages, setMessages] = useState<WebSocketMessage[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isSending, setIsSending] = useState(false);
	const [connectionError, setConnectionError] = useState<string | null>(null);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const handleMessageReceived = useCallback((message: WebSocketMessage) => {
		setMessages((prev) => [...prev, message]);
	}, []);

	const handleConnected = useCallback(() => {
		setConnectionError(null);
	}, []);

	const handleDisconnected = useCallback(() => {}, []);

	const handleWebSocketError = useCallback((error: Error) => {
		setConnectionError(error.message);
	}, []);

	// Load initial messages via REST API
	useEffect(() => {
		const loadInitialMessages = async () => {
			try {
				const initialMessages =
					await ChatApiService.listMessages(conversationId);
				setMessages(
					initialMessages.map((msg: ApiMessage) => ({
						id: msg.id,
						conversationId: msg.conversationId,
						senderId: msg.senderId,
						senderType: msg.senderType,
						content: msg.content,
						messageType: msg.messageType,
						type: msg.messageType,
						createdAt: msg.createdAt,
						updatedAt: msg.createdAt,
					})),
				);
				setIsLoading(false);
			} catch (error) {
				console.error("Error loading initial messages:", error);
				setIsLoading(false);
			}
		};

		if (conversationId) {
			loadInitialMessages();
		}
	}, [conversationId]);
	// WebSocket connection
	const { isConnected, isConnecting, sendMessage } = useWebSocket({
		conversationId,
		userId: currentUserId,
		userType: currentUserType,
		onMessageReceived: handleMessageReceived,
		onConnected: handleConnected,
		onDisconnected: handleDisconnected,
		onError: handleWebSocketError,
	});

	// Auto-scroll to latest message
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const handleSendMessage = () => {
		if (newMessage.trim() && !isSending && isConnected) {
			setIsSending(true);
			const success = sendMessage(newMessage.trim(), "text");
			if (success) {
				setNewMessage("");
				setMessages((prev) => [
					...prev,
					{
						id: `temp-${Date.now()}`,
						conversationId,
						senderId: currentUserId,
						senderType: currentUserType,
						content: newMessage.trim(),
						messageType: "text",
						type: "text",
						createdAt: new Date().toISOString(),
						updatedAt: new Date().toISOString(),
					},
				]);
			}
			setIsSending(false);
		}
	};

	if (isLoading) {
		return (
			<div className="flex flex-col items-center justify-center h-full text-muted-foreground">
				<Loader2 className="w-6 h-6 animate-spin" />
				<p className="mt-2 text-sm">Loading messages...</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col h-full">
			<div className="p-4 border-b flex items-center justify-between">
				<div className="flex items-center gap-2">
					<h2 className="text-lg font-semibold">{conversationName}</h2>
					<div
						className={`w-2 h-2 rounded-full ${
							isConnected
								? "bg-green-500"
								: isConnecting
									? "bg-yellow-500"
									: "bg-red-500"
						}`}
						title={
							isConnected
								? "Connected"
								: isConnecting
									? "Connecting..."
									: "Disconnected"
						}
					/>
				</div>
				{/* <span className="text-xs text-muted-foreground">
					{isConnected
						? "Connected"
						: isConnecting
							? "Connecting..."
							: "Offline"}
				</span> */}
			</div>

			{connectionError && (
				<div className="px-4 py-2 bg-red-50 border-b border-red-200 flex items-center gap-2 text-sm text-red-700">
					<AlertCircle className="w-4 h-4" />
					<span>{connectionError}</span>
				</div>
			)}

			<ScrollArea className="flex-1 p-4">
				<div className="space-y-4">
					{messages.length === 0 ? (
						<div className="text-center text-muted-foreground">
							No messages yet. Start the conversation!
						</div>
					) : (
						messages.map((message: WebSocketMessage) => {
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
					placeholder={
						isConnected
							? "Type your message..."
							: isConnecting
								? "Connecting..."
								: "Reconnecting..."
					}
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					onKeyDown={(e) => {
						if (
							e.key === "Enter" &&
							!e.shiftKey &&
							!isSending &&
							isConnected
						) {
							e.preventDefault();
							handleSendMessage();
						}
					}}
					className="flex-1"
					disabled={isSending || !isConnected}
					aria-label="Type your message"
				/>
				<Button
					onClick={handleSendMessage}
					disabled={!newMessage.trim() || isSending || !isConnected}
					aria-label="Send message"
				>
					{isSending ? (
						<Loader2 className="w-4 h-4 animate-spin" />
					) : (
						<Send className="w-4 h-4" />
					)}
				</Button>
			</div>
		</div>
	);
}
