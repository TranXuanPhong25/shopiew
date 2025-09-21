'use client';

import { ChatWidget } from '@/features/chat-widget/components';

export default function ChatDemoPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Chat Widget Demo</h1>
      <div className="border rounded-lg overflow-hidden" style={{ height: '600px', width: '400px' }}>
        <ChatWidget />
      </div>
      
      <div className="mt-6 space-y-4">
        <h2 className="text-lg font-semibold">Features:</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Switch between Conversations and AI Assistant tabs</li>
          <li>Click "New Conversation" in AI Assistant tab to start AI chat</li>
          <li>AI chat connects to localhost:8080/api/chat</li>
          <li>Real-time message interface with loading states</li>
          <li>Back navigation from AI chat to main view</li>
        </ul>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-800 mb-2">Setup Notes:</h3>
          <p className="text-sm text-yellow-700">
            Make sure your AI service is running on localhost:8080 and has a POST endpoint at /api/chat 
            that accepts JSON with `message` and `messages` fields and returns JSON with a `response` field.
          </p>
        </div>
      </div>
    </div>
  );
}