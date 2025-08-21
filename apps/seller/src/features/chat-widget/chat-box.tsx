"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { ConversationList } from "./conversation-list"
import { MessageDisplay } from "./messages-display"
import { dummyConversations, dummyMessages } from "./data"

interface ChatBoxProps {
  onClose: () => void
}

export function ChatBox({ onClose }: ChatBoxProps) {
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(dummyConversations[0]?.id || null)

  const selectedConversation = dummyConversations.find((conv) => conv.id === selectedConversationId)

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
            conversations={dummyConversations}
            selectedConversationId={selectedConversationId}
            onSelectConversation={setSelectedConversationId}
          />
        </div>
        <div className="flex-1">
          <MessageDisplay messages={dummyMessages} selectedConversation={selectedConversation || null} />
        </div>
      </div>
    </Card>
  )
}
