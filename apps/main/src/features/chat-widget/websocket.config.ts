/**
 * WebSocket Configuration for Chat Service
 *
 * This file provides utilities and types for managing WebSocket connections
 * to the backend chat service.
 *
 * WebSocket Endpoint: ws://[API_URL]/ws/chats?convID=[conversationId]
 * Required Header: X-User-Id (sent as message auth on first connection)
 */

export const WEBSOCKET_CONFIG = {
	// Heartbeat interval to keep connection alive (in milliseconds)
	HEARTBEAT_INTERVAL: 30000,

	// Maximum reconnection attempts before giving up
	MAX_RECONNECT_ATTEMPTS: 5,

	// Delay between reconnection attempts (in milliseconds)
	RECONNECT_INTERVAL: 3000,

	// Message types supported by the backend
	MESSAGE_TYPES: {
		TEXT: "text",
		IMAGE: "image",
		FILE: "file",
		SYSTEM_EVENT: "system_event",
		AUTH: "auth",
		PING: "ping",
		PONG: "pong",
	} as const,
};

/**
 * WebSocket message format for sending to backend
 */
export interface WSOutgoingMessage {
	content: string;
	messageType: "text" | "image" | "file" | "system_event";
	senderId: string;
	senderType: string;
}

/**
 * WebSocket message format for receiving from backend
 */
export interface WSIncomingMessage {
	id: string;
	conversationId: string;
	senderId: string;
	senderType: string;
	content: string;
	messageType: "text" | "image" | "file" | "system_event";
	createdAt: string;
	updatedAt: string;
}

/**
 * Build WebSocket URL for connecting to the chat service
 *
 * @param conversationId - The conversation ID to connect to
 * @returns Full WebSocket URL
 *
 * @example
 * const url = buildWebSocketUrl('conv-123')
 * // Returns: ws://localhost:3000/ws/chats?convID=conv-123
 */
export function buildWebSocketUrl(conversationId: string): string {
	const protocol =
		typeof window !== "undefined" &&
		window.location.protocol === "https:" &&
		false
			? "wss:"
			: "ws:";
	const host =
		process.env.NEXT_PUBLIC_WEBSOCKET_URL ||
		(typeof window !== "undefined" ? window.location.host : "localhost:8000");
	// Remove http:// or https:// from host if present
	const cleanHost = host.replace(/^https?:\/\//, "");
	return `${protocol}//${cleanHost}/chats?convID=${conversationId}`;
}

/**
 * Parse API error response to WebSocket message format
 * Used when converting REST API messages to WebSocket format
 */
export function convertAPIMessageToWSFormat(
	apiMessage: any,
): WSIncomingMessage {
	return {
		id: apiMessage.id,
		conversationId: apiMessage.conversationId,
		senderId: apiMessage.senderId,
		senderType: apiMessage.senderType,
		content: apiMessage.content,
		messageType: apiMessage.messageType,
		createdAt: apiMessage.createdAt,
		updatedAt: apiMessage.updatedAt,
	};
}
