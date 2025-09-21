'use client';

import { useState, useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { MemoizedMarkdown } from './memozied-markdown';
import { ChatInput } from './chat-input';


export function AIChatInterface() {
   const scrollAreaRef = useRef<HTMLDivElement>(null);
   const messagesEndRef = useRef<HTMLDivElement>(null);
   
   const { messages, sendMessage, status } = useChat({
      transport: new DefaultChatTransport({
         api: 'http://localhost:8080/api/chats',

      }),
      experimental_throttle: 50,
   });
   
   const starting = messages.slice(-1)[0]?.parts.length ==1 || (
      messages.slice(-1)[0]?.parts.length ==2 && 
      messages.slice(-1)[0]?.parts[1]?.type === "text" && 
      (messages.slice(-1)[0]?.parts[1] as { type: "text"; text?: string })?.text === ""
   );
   
   // Auto-scroll to bottom when messages change
   useEffect(() => {
      scrollToBottom();
   }, [messages, starting]);

   const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ 
         behavior: 'smooth',
         block: 'end'
      });
   };
   
   console.log("Messages:", messages, "Starting:", starting);
   const handleSendMessage = async (message: string) => {
      
      await sendMessage({
         parts: [{ type: 'text', text: message }]
      });

   };
   return (
      <div className="flex flex-col h-full">
         {/* Header */}
         <div className="flex items-center gap-3 p-4 border-b">
            <div>
               <h2 className="text-lg font-semibold">AI Assistant</h2>
               <p className="text-xs text-muted-foreground">Ask me anything about your store</p>
            </div>
         </div>

         {/* Messages */}
         <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
            <div className="space-y-4">
               {messages.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">
                     <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                        <svg
                           className="w-8 h-8 text-primary"
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                           />
                        </svg>
                     </div>
                     <h3 className="font-medium mb-2">Start a conversation</h3>
                     <p className="text-sm">Ask me about products, orders, analytics, or anything else!</p>
                  </div>
               )}

               { messages.map((message, index) => {
                  return !(starting && messages.length - 1 == index && message.role == 'assistant') &&  (
                     <div key={index} className="space-y-2">
                        <Card
                           className={`max-w-[80%] w-fit ${message.role === 'user'
                              ? 'ml-auto bg-primary text-primary-foreground'  
                              : 'mr-auto bg-muted'
                              }`}
                        >
                           <CardContent className="p-3">
                              <div className="text-sm whitespace-pre-wrap max-w-md">
                                 {message.parts.map(part => {
                                    if (part.type === "text" && message.role === "assistant") {
                                       return (
                                          <MemoizedMarkdown
                                             key={`${message.id}-text`}
                                             id={message.id}
                                             content={part.text}
                                          />
                                       );
                                    } else if (part.type === "text") {
                                       return <div key={`${message.id}-text`}>{part.text}</div>;
                                    }
                                 })}
                              </div>
                              <div className="text-xs opacity-70 mt-1">
                                 {/* {message.timestamp.toLocaleTimeString()} */}
                              </div>
                           </CardContent>
                        </Card>
                     </div>
                  )
               })}

               {starting&& (
                  <Card className="max-w-[80%] mr-auto">
                     <CardContent className="p-3">
                        <div className="flex items-center space-x-2">
                           <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                           </div>
                        </div>
                     </CardContent>
                  </Card>
               )}
               
               {/* Invisible element to scroll to */}
               <div ref={messagesEndRef} />
            </div>
         </ScrollArea>

         <ChatInput 
            onSendMessage={handleSendMessage}
            isLoading={status === "submitted"}
            placeholder="Ask me anything about your store..."
         />
      </div>

   );
}