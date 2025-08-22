"use client"

import {ScrollArea} from "@/components/ui/scroll-area"
import {cn} from "@/lib/utils"
import type {Conversation} from "./data"


interface ConversationListProps {
  conversations: Conversation[]
  selectedConversationId: string | null
  onSelectConversation: (id: string) => void
}

export function ConversationList({
  conversations,
  selectedConversationId,
  onSelectConversation,
}: ConversationListProps) {
  return (
    <div className="flex flex-col h-full border-r">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Conversations</h2>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={cn(
                "flex flex-col gap-1 p-3 rounded-lg cursor-pointer transition-colors",
                selectedConversationId === conversation.id ? "bg-accent text-accent-foreground" : "hover:bg-muted",
              )}
              onClick={() => onSelectConversation(conversation.id)}
              role="button"
              aria-pressed={selectedConversationId === conversation.id}
              tabIndex={0}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-sm">{conversation.name}</h3>
                <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
              </div>
              <p className="text-xs text-muted-foreground truncate">{conversation.lastMessage}</p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
