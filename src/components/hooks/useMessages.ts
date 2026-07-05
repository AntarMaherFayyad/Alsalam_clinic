import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  GetMessages,
  MarkAsRead,
  DeleteMessage,
  SendMessage,
  type Message
} from '@/lib/admin/messages'

export function useMessages() {
  return useQuery({
    queryKey: ['messages'],
    queryFn: GetMessages,
  })
}

export function useMarkAsRead() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => MarkAsRead({ id, status: 'read' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] })
    },
  })
}

export function useDeleteMessage() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: DeleteMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] })
    },
  })
}


export function useSendMessage() {
  return useMutation({
    mutationFn: SendMessage,
  })
}