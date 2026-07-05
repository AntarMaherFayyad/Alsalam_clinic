import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  GetArticles,
  CreateArticle,
  UpdateArticle,
  DeleteArticle,
  type Article
} from '@/lib/admin/articles'

export function useArticles() {
  return useQuery({
    queryKey: ['articles'],
    queryFn: GetArticles,
  })
}

export function useCreateArticle() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: CreateArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] })
    },
  })
}

export function useUpdateArticle() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: UpdateArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] })
    },
  })
}

export function useDeleteArticle() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: DeleteArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] })
    },
  })
}