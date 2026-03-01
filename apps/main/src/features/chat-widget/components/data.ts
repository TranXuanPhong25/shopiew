// Backend API types
export interface ApiConversation {
	id: string;
	type: "customer_shop" | "customer_bot" | "customer_system";
	status: "open" | "resolved" | "pending";
	createdAt: string;
	updatedAt: string;
}

export interface ApiMessage {
	id: string;
	conversationId: string;
	senderId: string;
	senderType: string;
	content: string;
	messageType: "text" | "image" | "file" | "system_event";
	isBotMessage: boolean;
	createdAt: string;
	deletedAt?: string | null;
}

// Display types for ConversationList component
export interface Conversation {
	id: string;
	name: string;
	lastMessage: string;
	timestamp: string;
	type?: string;
	status?: string;
}

export interface Message {
	id: string;
	conversationId: string;
	sender: "user" | "agent";
	text: string;
	timestamp: string;
}

const CONVERSATION_TYPE_LABELS: Record<string, string> = {
	customer_shop: "Shop Chat",
	customer_bot: "AI Assistant",
	customer_system: "System",
};

export function toDisplayConversation(conv: ApiConversation): Conversation {
	return {
		id: conv.id,
		name: `${CONVERSATION_TYPE_LABELS[conv.type] || "Chat"} #${conv.id.slice(0, 6)}`,
		lastMessage:
			conv.status === "resolved"
				? "Resolved"
				: conv.status === "pending"
					? "Pending"
					: "Open",
		timestamp: new Date(conv.createdAt).toLocaleDateString(),
		type: conv.type,
		status: conv.status,
	};
}
