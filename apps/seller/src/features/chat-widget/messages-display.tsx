"use client"

import {useEffect, useRef, useState} from "react"
import {ScrollArea} from "@/components/ui/scroll-area"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Bot, Send, User} from "lucide-react"
import type {Conversation, Message} from "./data"
import {Avatar, AvatarFallback} from "@/components/ui/avatar"

interface MessageDisplayProps {
  messages: Message[]
  selectedConversation: Conversation | null
}

export function MessageDisplay({ messages, selectedConversation }: MessageDisplayProps) {
  const [newMessage, setNewMessage] = useState("")
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const filteredMessages = selectedConversation
    ? messages.filter((msg) => msg.conversationId === selectedConversation.id)
    : []

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [filteredMessages])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, you'd send this to a backend
      console.log("Sending message:", newMessage, "to conversation:", selectedConversation?.id)
      setNewMessage("")
      // For demonstration, you might add it to the dummyMessages array here
      // but for a persistent state, it would come from a data update.
    }
  }

  if (!selectedConversation) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
        <p>Select a conversation to view messages.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">{selectedConversation.name}</h2>
      </div>
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {filteredMessages.length === 0 ? (
            <div className="text-center text-muted-foreground">No messages yet. Start the conversation!</div>
          ) : (
            filteredMessages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.sender === "agent" && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>
                      <Bot className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-muted rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <span className="block text-xs text-muted-foreground mt-1">{message.timestamp}</span>
                </div>
                {message.sender === "user" && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>
                      <User className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))
          )}
        </div>
      </ScrollArea>
      <div className="p-4 border-t flex gap-2">
        <Input
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSendMessage()
            }
          }}
          className="flex-1"
          aria-label="Type your message"
        />
        <Button onClick={handleSendMessage} aria-label="Send message">
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
