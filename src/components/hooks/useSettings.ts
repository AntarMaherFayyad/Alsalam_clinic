import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  GetSettings,
  UpdateSettings,
  GetWorkingHours,
  UpdateWorkingHour,
  type Settings,
  type WorkingHour
} from '@/lib/admin/settings'

// جلب الإعدادات
export function useSettings() {
  return useQuery({
    queryKey: ['settings'],
    queryFn: GetSettings,
  })
}

// تحديث الإعدادات
export function useUpdateSettings() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: UpdateSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] })
    },
  })
}

// جلب أوقات العمل
export function useWorkingHours() {
  return useQuery({
    queryKey: ['working_hours'],
    queryFn: GetWorkingHours,
  })
}

// تحديث يوم معين
export function useUpdateWorkingHour() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: UpdateWorkingHour,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['working_hours'] })
    },
  })
}