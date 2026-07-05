// src/components/hooks/useServices.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  GetServices,
  CreateService,
  UpdateService,
  DeleteService,
  type Service
} from '@/lib/admin/services'

// جلب الخدمات
export function useServices() {
  return useQuery({
    queryKey: ['services'],
    queryFn: GetServices,
  })
}

// إضافة خدمة
export function useCreateService() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: CreateService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] })
    },
  })
}

// تعديل خدمة
export function useUpdateService() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: UpdateService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] })
    },
  })
}

// حذف خدمة
export function useDeleteService() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: DeleteService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] })
    },
  })
}