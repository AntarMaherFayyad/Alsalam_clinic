import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { GetDoctor, UpdateDoctor, type Doctor } from '@/lib/admin/doctor'

export function useDoctor() {
    return useQuery({
        queryKey: ['doctor'],
        queryFn: GetDoctor,
    })
}

export function useUpdateDoctor() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: UpdateDoctor,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['doctor'] })
        },
    })
}