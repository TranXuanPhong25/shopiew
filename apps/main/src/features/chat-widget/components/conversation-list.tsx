"use client"

import {ScrollArea} from "@/components/ui/scroll-area"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Button} from "@/components/ui/button"
import {cn} from "@/lib/utils"
import type {Conversation} from "./data"


interface ConversationListProps {
  conversations: Conversation[]
  selectedConversationId: string | null
  onSelectConversation: (id: string) => void
  onStartNewAIChat?: () => void
}

export function ConversationList({
  conversations,
  selectedConversationId,
  onSelectConversation,
  onStartNewAIChat,
}: ConversationListProps) {
  return (
    <div className="flex flex-col h-full border-r">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Chat</h2>
      </div>
      
      <Tabs defaultValue="conversations" className="flex-1 flex flex-col ">
        <div className="px-4 py-2 border-b">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="conversations">Conversations</TabsTrigger>
            <TabsTrigger value="ai-assistance">AI Assistant</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="conversations" className="flex-1 m-0 ">
          <ScrollArea className="h-full">
            <div className="p-2">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={cn(
                    "flex flex-col gap-1 p-3 rounded-lg cursor-pointer transition-colors",
                    selectedConversationId === conversation.id 
                      ? "bg-accent text-accent-foreground" 
                      : "hover:bg-muted",
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
        </TabsContent>
        
        <TabsContent value="ai-assistance" className="flex-1 m-0">
          <ScrollArea className="h-full">
            <div className="p-4">
              <div className="space-y-4">
                <div className="text-center text-muted-foreground">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-medium mb-1">AI Assistant</h3>
                  <p className="text-xs">Get instant help with your store</p>
                </div>
                
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start h-auto p-3"
                    onClick={onStartNewAIChat}
                  >
                    <div className="text-left">
                      <div className="font-medium text-sm">New Conversation</div>
                      <div className="text-xs text-muted-foreground">Start a new AI chat session</div>
                    </div>
                  </Button>
                  
                  <button className="w-full text-left p-3 rounded-lg hover:bg-muted transition-colors">
                    <div className="font-medium text-sm">Product Questions</div>
                    <div className="text-xs text-muted-foreground">Get help with product listings</div>
                  </button>
                  
                  <button className="w-full text-left p-3 rounded-lg hover:bg-muted transition-colors">
                    <div className="font-medium text-sm">Order Management</div>
                    <div className="text-xs text-muted-foreground">Assistance with order processing</div>
                  </button>
                  
                  <button className="w-full text-left p-3 rounded-lg hover:bg-muted transition-colors">
                    <div className="font-medium text-sm">Store Analytics</div>
                    <div className="text-xs text-muted-foreground">Understanding your metrics</div>
                  </button>
                </div>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}
