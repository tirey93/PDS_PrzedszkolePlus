import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ThreadsService } from "@/features/threads/api/threadsService";
import { THREADS_QUERY_KEY } from "@/features/threads/constants/queryKeys";

export const useMarkThreadAsSeen = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ThreadsService.markAsSeen,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [THREADS_QUERY_KEY] }),
    });
};
