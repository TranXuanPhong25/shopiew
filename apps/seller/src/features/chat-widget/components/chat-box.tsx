"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { ConversationList } from "./conversation-list"
import { MessageDisplay } from "./messages-display"
import { AIChatInterface } from "./ai-chat-interface"
import { toDisplayConversation } from "./data"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { ChatApiService } from "../service"
import { useAuth } from "@/features/auth"

interface ChatBoxProps {
  onClose: () => void
}

type ChatView = 'list' | 'ai-chat' | 'conversation'

export function ChatBox({ onClose }: ChatBoxProps) {
  const [currentView, setCurrentView] = useState<ChatView>('list')
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null)
  const { user, shop } = useAuth()

  const { data: apiConversations = [], isLoading } = useQuery({
    queryKey: ['chat-conversations'],
    queryFn: () => ChatApiService.listConversations(),
    refetchInterval: 30000,
  })

  const conversations = apiConversations.map(toDisplayConversation)
  const selectedConversation = conversations.find((conv) => conv.id === selectedConversationId)

  const handleSelectConversation = (id: string) => {
    setSelectedConversationId(id)
    setCurrentView('conversation')
  }

  const handleStartNewAIChat = () => {
    setCurrentView('ai-chat')
  }

  // Seller replies as the shop
  const senderId = shop?.id || user?.userId || ''

  return (
    <Card className="relative w-[80vw] max-w-3xl h-[70vh] max-h-[600px] flex flex-col shadow-lg rounded-lg overflow-hidden">
      <div className="absolute top-2 right-2 z-10">
        <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close chat">
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex flex-1 min-h-0">
        <div className="w-1/3 min-w-[200px] max-w-[300px] border-r">
          <ConversationList
            conversations={conversations}
            selectedConversationId={selectedConversationId}
            onSelectConversation={handleSelectConversation}
            onStartNewAIChat={handleStartNewAIChat}
            isLoading={isLoading}
          />
        </div>
        <div className="flex-1">
          {currentView === 'conversation' && selectedConversationId ? (
            <MessageDisplay
              conversationId={selectedConversationId}
              conversationName={selectedConversation?.name || 'Chat'}
              currentUserId={senderId}
              currentUserType="shop"
            />
          ) : (
            <AIChatInterface />
          )}
        </div>
      </div>

    </Card>
  )
}
