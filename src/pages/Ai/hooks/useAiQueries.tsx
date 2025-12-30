import { useStreamAi } from '@/hooks/useStreamAi'
import { MessageHistory } from '@/types/index.types'
import {
  deleteConversationById,
  fetchAllConversationsHistory,
  fetchCurrentConversation,
} from '@/utils/api/queries'
import { isNotNullOrUndefined } from '@/utils/assertion.util'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useConversationsHistoryQuery = () =>
  useQuery({
    queryKey: ['conversationsHistory'],
    queryFn: () => fetchAllConversationsHistory(),
  })

export const useCurrentConversationQuery = (
  currentConversationId: string | undefined,
) =>
  useQuery({
    queryKey: ['conversation', currentConversationId],
    queryFn: () => fetchCurrentConversation(currentConversationId!),
    enabled: isNotNullOrUndefined(currentConversationId),
  })

export const useAiConversationStream = (
  currentConversationId: string | undefined,
) =>
  useStreamAi({
    url: '/v1/chat/conversation/{conversationId}',
    parameters: {
      pathVariable: {
        conversationId: isNotNullOrUndefined(currentConversationId)
          ? currentConversationId
          : 'new', // 'new' is special case for creating a new conversation (backend handles it)
      },
    },
  })

type DeleteConversationMutationParams = {
  currentConversationId: string | undefined
  setCurrentConversationId: (conversationId: string | undefined) => void
  setCurrentConversation: (
    conversation: Array<MessageHistory> | undefined,
  ) => void
  conversationHistoryData:
    | Array<{
        conversationId: string
      }>
    | undefined
}

export const useDeleteConversationMutation = ({
  conversationHistoryData,
  currentConversationId,
  setCurrentConversation,
  setCurrentConversationId,
}: DeleteConversationMutationParams) =>
  useMutation({
    mutationFn: (conversationId: string) =>
      deleteConversationById({ conversationId }),
    onSuccess: (_, conversationId) => {
      // If the deleted conversation is the current one, reset the current conversation
      if (conversationId === currentConversationId) {
        setCurrentConversationId(undefined)
        setCurrentConversation(undefined)
        window.history.replaceState(null, '', window.location.pathname)
      }

      // Remove the conversation from the history
      if (conversationHistoryData) {
        const updatedConversations = conversationHistoryData.filter(
          (conv) => conv.conversationId !== conversationId,
        )
        conversationHistoryData.length = 0
        conversationHistoryData.push(...updatedConversations)
      }
    },
  })
