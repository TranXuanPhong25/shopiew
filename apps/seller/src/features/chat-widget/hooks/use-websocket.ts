import { useCallback, useEffect, useRef, useState } from "react";
import { WEBSOCKET_CONFIG, buildWebSocketUrl } from "../websocket.config";

export type MessageType =
	| "text"
	| "image"
	| "file"
	| "system_event"
	| "ping"
	| "pong";
export interface WebSocketMessage {
	id: string;
	conversationId: string;
	senderId: string;
	senderType: string;
	content: string;
	type: MessageType;
	createdAt: string;
	updatedAt: string;
}

export interface UseWebSocketOptions {
	conversationId: string;
	userId: string;
	userType: string;
	onMessageReceived?: (message: WebSocketMessage) => void;
	onConnected?: () => void;
	onDisconnected?: () => void;
	onError?: (error: Error) => void;
	autoReconnect?: boolean;
	reconnectInterval?: number;
	reconnectMaxAttempts?: number;
}

export function useWebSocket({
	conversationId,
	userId,
	userType,
	onMessageReceived,
	onConnected,
	onDisconnected,
	onError,
	autoReconnect = true,
	reconnectInterval = WEBSOCKET_CONFIG.RECONNECT_INTERVAL,
	reconnectMaxAttempts = WEBSOCKET_CONFIG.MAX_RECONNECT_ATTEMPTS,
}: UseWebSocketOptions) {
	const isConnectingRef = useRef(false);
	const [isConnected, setIsConnected] = useState(false);
	const [isConnecting, setIsConnecting] = useState(false);
	const wsRef = useRef<WebSocket | null>(null);
	const reconnectAttemptsRef = useRef(0);
	const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const heartbeatIntervalRef = useRef<NodeJS.Timeout | null>(null);
	const getWebSocketUrl = useCallback(() => {
		return buildWebSocketUrl(conversationId);
	}, [conversationId]);
	const sendMessage = useCallback(
		(content: string, messageType: MessageType = "text") => {
			if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
				console.warn("WebSocket is not connected");
				return false;
			}

			try {
				const message = {
					content,
					type: messageType,
					senderId: userId,
					senderType: userType,
				};
				wsRef.current.send(JSON.stringify(message));
				return true;
			} catch (error) {
				console.error("Error sending message:", error);
				onError?.(
					error instanceof Error ? error : new Error(String(error)),
				);
				return false;
			}
		},
		[userId, userType, onError],
	);

	const disconnect = useCallback(() => {
		if (reconnectTimeoutRef.current) {
			clearTimeout(reconnectTimeoutRef.current);
		}
		if (heartbeatIntervalRef.current) {
			clearInterval(heartbeatIntervalRef.current);
		}
		if (wsRef.current) {
			wsRef.current.close();
		}
		// setIsConnected(false);
		isConnectingRef.current = false;
	}, []);

	const connect = useCallback(() => {
		if (wsRef.current?.readyState === WebSocket.OPEN) {
			return;
		}
		// setIsConnecting(true);
		isConnectingRef.current = true;
		try {
			const ws = new WebSocket(getWebSocketUrl());
			ws.onopen = () => {
				console.log("WebSocket connected", getWebSocketUrl());
				setIsConnected(true);
				setIsConnecting(false);
				isConnectingRef.current = false;
				reconnectAttemptsRef.current = 0;

				// Send auth header via message or initial connection message
				ws.send(
					JSON.stringify({
						typegetWebSocketUrl: "auth",
						userId,
						userType,
					}),
				);

				// Start heartbeat to keep connection alive
				heartbeatIntervalRef.current = setInterval(() => {
					if (ws.readyState === WebSocket.OPEN) {
						ws.send(JSON.stringify({ type: "ping" }));
					}
				}, WEBSOCKET_CONFIG.HEARTBEAT_INTERVAL);

				onConnected?.();
			};

			ws.onmessage = (event) => {
				try {
					const message = JSON.parse(event.data) as WebSocketMessage;
					console.log(message);
					if (message.type !== "ping" && message.type !== "pong") {
						onMessageReceived?.(message);
					}
				} catch (error) {
					console.error("Error parsing message:", error);
				}
			};

			ws.onerror = (event) => {
				console.error("WebSocket error:", event);
				const error = new Error("WebSocket error occurred");
				onError?.(error);
			};

			ws.onclose = () => {
				console.log("WebSocket disconnected");
				setIsConnected(false);
				setIsConnecting(false);
				isConnectingRef.current = false;
				if (heartbeatIntervalRef.current) {
					clearInterval(heartbeatIntervalRef.current);
				}

				onDisconnected?.();

				// Auto-reconnect logic
				if (
					autoReconnect &&
					reconnectAttemptsRef.current < reconnectMaxAttempts
				) {
					reconnectAttemptsRef.current += 1;
					console.log(
						`Attempting to reconnect (${reconnectAttemptsRef.current}/${reconnectMaxAttempts})...`,
					);

					reconnectTimeoutRef.current = setTimeout(() => {
						// connect();
					}, reconnectInterval);
				} else if (reconnectAttemptsRef.current >= reconnectMaxAttempts) {
					const error = new Error(
						"Failed to reconnect after maximum attempts",
					);
					onError?.(error);
				}
			};

			wsRef.current = ws;
		} catch (error) {
			console.error("Error creating WebSocket:", error);
			// setIsConnecting(false);
			isConnectingRef.current = false;
			const err = error instanceof Error ? error : new Error(String(error));
			onError?.(err);
		}
	}, [
		getWebSocketUrl,
		userId,
		userType,
		onConnected,
		onMessageReceived,
		onError,
		onDisconnected,
		autoReconnect,
		reconnectMaxAttempts,
		reconnectInterval,
	]);

	useEffect(() => {
		if (conversationId && userId && !isConnectingRef.current) {
			// console.log("connecting");
			connect();
		}

		return () => {
			if (!isConnectingRef.current) {
				// console.log("disconnecting");
				disconnect();
			}
		};
	}, [conversationId, userId, connect, disconnect]);

	return {
		isConnected,
		isConnecting,
		sendMessage,
		disconnect,
		reconnect: connect,
	};
}
