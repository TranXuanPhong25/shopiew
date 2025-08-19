export interface Conversation {
  id: string
  name: string
  lastMessage: string
  timestamp: string
}

export interface Message {
  id: string
  conversationId: string
  sender: "user" | "agent"
  text: string
  timestamp: string
}

export const dummyConversations: Conversation[] = [
  {
    id: "1",
    name: "Support Chat",
    lastMessage: "How can I help you today?",
    timestamp: "10:30 AM",
  },
  {
    id: "2",
    name: "Order #12345",
    lastMessage: "Your order has been shipped.",
    timestamp: "Yesterday",
  },
  {
    id: "3",
    name: "Product Inquiry",
    lastMessage: "I have a question about the new laptop.",
    timestamp: "Mon",
  },
  {
    id: "4",
    name: "Billing Issue",
    lastMessage: "Please check my last invoice.",
    timestamp: "Last Week",
  },
  {
    id: "5",
    name: "Feedback",
    lastMessage: "Thanks for your valuable feedback!",
    timestamp: "2 weeks ago",
  },
]

export const dummyMessages: Message[] = [
  {
    id: "m1",
    conversationId: "1",
    sender: "agent",
    text: "Hello! How can I assist you today?",
    timestamp: "10:30 AM",
  },
  {
    id: "m2",
    conversationId: "1",
    sender: "user",
    text: "Hi, I need help with my recent purchase.",
    timestamp: "10:31 AM",
  },
  {
    id: "m3",
    conversationId: "1",
    sender: "agent",
    text: "Certainly, could you please provide your order number?",
    timestamp: "10:32 AM",
  },
  {
    id: "m4",
    conversationId: "2",
    sender: "agent",
    text: "Your order #12345 has been shipped and is expected to arrive by Friday.",
    timestamp: "Yesterday",
  },
  {
    id: "m5",
    conversationId: "2",
    sender: "user",
    text: "Great, thank you for the update!",
    timestamp: "Yesterday",
  },
  {
    id: "m6",
    conversationId: "3",
    sender: "user",
    text: "I saw your new laptop model. What are its key specifications?",
    timestamp: "Mon",
  },
  {
    id: "m7",
    conversationId: "3",
    sender: "agent",
    text: "The new laptop features an Intel i7 processor, 16GB RAM, and a 512GB SSD. It also has a 14-inch Full HD display.",
    timestamp: "Mon",
  },
]
