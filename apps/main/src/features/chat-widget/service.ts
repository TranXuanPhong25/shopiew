import axiosClient from '@/utils/axiosClient'
import type { ApiConversation, ApiMessage } from './components/data'

export type ConversationType = 'customer_shop' | 'customer_bot' | 'customer_system'

export interface SendMessagePayload {
  senderId: string
  senderType: string
  content: string
  messageType: 'text' | 'image' | 'file' | 'system_event'
  isBotMessage?: boolean
}

export const ChatApiService = {
  listConversations: async (limit = 20, offset = 0): Promise<ApiConversation[]> => {
    const res = await axiosClient.get('/chats/conversations', { params: { limit, offset } })
    return res.data
  },

  createConversation: async (type: ConversationType): Promise<ApiConversation> => {
    const res = await axiosClient.post('/chats/conversations', { type })
    return res.data
  },

  listMessages: async (conversationId: string, limit = 50, offset = 0): Promise<ApiMessage[]> => {
    const res = await axiosClient.get(`/chats/conversations/${conversationId}/messages`, {
      params: { limit, offset },
    })
    return res.data
  },

  sendMessage: async (conversationId: string, payload: SendMessagePayload): Promise<ApiMessage> => {
    const res = await axiosClient.post(`/chats/conversations/${conversationId}/messages`, payload)
    return res.data
  },

  updateLastRead: async (conversationId: string, participantId: string): Promise<void> => {
    await axiosClient.put(`/chats/conversations/${conversationId}/read`, {
      participantId,
    })
  },
}
