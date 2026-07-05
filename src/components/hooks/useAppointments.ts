import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  GetAppointments,
  UpdateAppointmentStatus,
  DeleteAppointment,
  CreateAppointment,
  type Appointment
} from '@/lib/admin/appointments'

// جلب المواعيد
export function useAppointments() {
  return useQuery({
    queryKey: ['appointments'],
    queryFn: GetAppointments,
  })
}

// تغيير حالة الموعد
export function useUpdateAppointmentStatus() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: UpdateAppointmentStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] })
    },
  })
}

// حذف موعد
export function useDeleteAppointment() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: DeleteAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] })
    },
  })
}

// إضافة موعد من صفحة الـ booking
export function useCreateAppointment() {
  return useMutation({
    mutationFn: CreateAppointment,
  })
}