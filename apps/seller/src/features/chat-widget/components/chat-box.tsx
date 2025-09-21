"use client"

<<<<<<< HEAD
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { ConversationList } from "./conversation-list"
import { MessageDisplay } from "./messages-display"
import { AIChatInterface } from "./ai-chat-interface"
import { dummyConversations, dummyMessages } from "./data"
=======
import {useState} from "react"
import {Card} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {X} from "lucide-react"
import {ConversationList} from "./conversation-list"
import {MessageDisplay} from "./messages-display"
import {AIChatInterface} from "./ai-chat-interface"
import {dummyConversations, dummyMessages} from "./data"
>>>>>>> 94f97b1 (feat: Implement product detail page with breadcrumb navigation, product images, specifications, and customer reviews)

interface ChatBoxProps {
  onClose: () => void
}

type ChatView = 'list' | 'ai-chat' | 'conversation'

export function ChatBox({ onClose }: ChatBoxProps) {
  const [currentView, setCurrentView] = useState<ChatView>('list')
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(dummyConversations[0]?.id || null)

  const selectedConversation = dummyConversations.find((conv) => conv.id === selectedConversationId)

  const handleSelectConversation = (id: string) => {
    setSelectedConversationId(id)
    setCurrentView('conversation')
  }

  const handleStartNewAIChat = () => {
    setCurrentView('ai-chat')
  }

<<<<<<< HEAD
=======
  const handleBackToList = () => {
    setCurrentView('list')
  }
>>>>>>> 94f97b1 (feat: Implement product detail page with breadcrumb navigation, product images, specifications, and customer reviews)

  return (
    <Card className="relative w-[80vw] max-w-3xl h-[70vh] max-h-[600px] flex flex-col shadow-lg rounded-lg overflow-hidden">
      <div className="absolute top-2 right-2 z-10">
        <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close chat">
          <X className="h-5 w-5" />
        </Button>
      </div>
<<<<<<< HEAD

      <div className="flex flex-1 min-h-0">
        <div className="w-1/3 min-w-[200px] max-w-[300px] border-r">
          <ConversationList
            conversations={dummyConversations}
            selectedConversationId={selectedConversationId}
            onSelectConversation={handleSelectConversation}
            onStartNewAIChat={handleStartNewAIChat}
          />
        </div>
        <div className="flex-1">
          {currentView === 'conversation' ? (
            <MessageDisplay messages={dummyMessages} selectedConversation={selectedConversation || null} />
          ) : (
            <AIChatInterface />
          )}
        </div>
      </div>

=======
      
      {currentView === 'list' && (
        <div className="flex flex-1 min-h-0">
          <div className="w-full">
            <ConversationList
              conversations={dummyConversations}
              selectedConversationId={selectedConversationId}
              onSelectConversation={handleSelectConversation}
              onStartNewAIChat={handleStartNewAIChat}
            />
          </div>
        </div>
      )}
      
      {currentView === 'conversation' && (
        <div className="flex flex-1 min-h-0">
          <div className="w-1/3 min-w-[200px] max-w-[300px] border-r">
            <ConversationList
              conversations={dummyConversations}
              selectedConversationId={selectedConversationId}
              onSelectConversation={handleSelectConversation}
              onStartNewAIChat={handleStartNewAIChat}
            />
          </div>
          <div className="flex-1">
            <MessageDisplay messages={dummyMessages} selectedConversation={selectedConversation || null} />
          </div>
        </div>
      )}
      
      {currentView === 'ai-chat' && (
        <div className="flex flex-1 min-h-0">
          <AIChatInterface onBack={handleBackToList} />
        </div>
      )}
>>>>>>> 94f97b1 (feat: Implement product detail page with breadcrumb navigation, product images, specifications, and customer reviews)
    </Card>
  )
}
