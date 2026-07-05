import { useQuery } from '@tanstack/react-query'
import { GetPatients } from '@/lib/admin/patients'

export function usePatients() {
  return useQuery({
    queryKey: ['patients'],
    queryFn: GetPatients,
  })
}